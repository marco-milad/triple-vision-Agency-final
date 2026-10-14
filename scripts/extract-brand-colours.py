"""Give every case study its client's own colour.

Each page picks up the accent of the client it is about, so the page feels like
the brand rather than like the agency's template. The colour is read from the
client's logo where we have one, and from the cover artwork otherwise.

Two things it has to survive:

  * The site's own background is a very dark purple, so an accent that is itself
    nearly black - PRAXIS is #0D1A3A - would be invisible as text on it. Such a
    colour is lifted until it reads, keeping its hue.
  * Text that sits on top of a filled accent needs the opposite treatment: white
    on a red, near-black on a yellow.

Run from the project root:  python scripts/extract-brand-colours.py
"""
import colorsys
import io
import os
import re
from collections import Counter

from PIL import Image

PORTFOLIO = "src/data/portfolio.ts"
# the page's own ground, from --background in src/index.css: hsl(280 100% 12%)
PAGE_LUMINANCE = 0.02
MIN_ON_DARK = 0.26        # an accent dimmer than this disappears on that ground


def luminance(rgb):
    def channel(v):
        v = v / 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (channel(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def hexed(rgb):
    return "#%02X%02X%02X" % tuple(round(c) for c in rgb)


def un_hex(value):
    return tuple(int(value[i:i + 2], 16) for i in (1, 3, 5))


def lift(rgb, target=MIN_ON_DARK):
    """Raise lightness, keeping hue and saturation, until it reads on the dark."""
    h, l, s = colorsys.rgb_to_hls(*(c / 255 for c in rgb))
    while luminance(rgb) < target and l < 0.95:
        l = min(l + 0.02, 0.95)
        rgb = tuple(c * 255 for c in colorsys.hls_to_rgb(h, l, s))
    return rgb


def on(rgb):
    """What reads on top of this colour once it is a filled background."""
    return "#FFFFFF" if luminance(rgb) < 0.45 else "#15151B"


def dominant(path):
    """The colour that carries the mark, ignoring the paper and the greys."""
    image = Image.open(path).convert("RGB")
    image.thumbnail((240, 240))
    image = image.quantize(colors=64, method=Image.MEDIANCUT).convert("RGB")

    tally = Counter()
    for pixel in image.getdata():
        h, l, s = colorsys.rgb_to_hls(*(c / 255 for c in pixel))
        # A brand colour is neither the paper nor the ink the page is printed
        # on. Washed-out tints are the background of a screenshot, not an
        # identity, and greys carry none at all.
        if not 0.10 < l < 0.82 or s < 0.22:
            continue
        # weight by how much of the mark it covers, nudged towards saturation
        tally[pixel] += 1 + s * 2
    if not tally:
        return None
    return max(tally.items(), key=lambda kv: kv[1])[0]


def generated_accents():
    """
    The palettes our own generators drew with.

    Where a project's cover is artwork we produced, sampling it is guesswork
    about our own decision: the dark ground covers more of the board than the
    accent does, so the sampler returns the ground. The generator already holds
    the answer, so it is read from there instead.
    """
    accents = {}
    pattern = re.compile(
        r'"([a-z0-9-]+)", "\w+", "[^"]*", "[^"]*",\s*\n\s*"(#[0-9A-Fa-f]{6})", "(#[0-9A-Fa-f]{6})"')
    path = "scripts/generate-social-campaigns.py"
    if os.path.exists(path):
        for m in pattern.finditer(io.open(path, encoding="utf-8").read()):
            accents[m.group(1)] = m.group(3)
    # the two branding generators name their own
    accents.setdefault("branding-food-group", "#E8A020")
    accents.setdefault("branding-landscape-company", "#2F6B46")
    accents.setdefault("branding-spend-platform", "#2F5BFF")
    return accents


GENERATED = generated_accents()


def source_for(slug, block):
    """The logo if the project has one, otherwise its cover."""
    card = "public/work/%s/card.webp" % slug
    if os.path.exists(card):
        return card, "logo"
    cover = re.search(r"cover: '(/work/[^']+)'", block)
    if cover and os.path.exists("public" + cover.group(1)):
        return "public" + cover.group(1), "cover"
    return None, None


def run():
    source = io.open(PORTFOLIO, encoding="utf-8", newline="").read()
    rows = []

    for match in re.finditer(r"    slug: '([a-z0-9-]+)',", source):
        slug = match.group(1)
        block = source[match.start():source.index("\n  },", match.start())]
        path, origin = source_for(slug, block)

        # our own artwork: take the palette rather than guess at it
        if origin == "cover" and slug in GENERATED:
            raw = un_hex(GENERATED[slug])
            origin = "generator"
        elif path:
            raw = dominant(path)
        else:
            rows.append((slug, None, None, None, "no artwork"))
            continue

        if not raw:
            rows.append((slug, None, None, None, "no colour in it"))
            continue

        accent = lift(raw)
        rows.append((slug, hexed(raw), hexed(accent), on(accent), origin))

    print("%-28s %-9s %-9s %-9s %s" % ("project", "in logo", "on page", "text on", "from"))
    for slug, raw, accent, text, origin in rows:
        print("%-28s %-9s %-9s %-9s %s" % (slug, raw or "-", accent or "-", text or "-", origin))

    written = 0
    for slug, raw, accent, text, _ in rows:
        if not accent:
            continue
        start = source.index("    slug: '%s',\n" % slug)
        end = source.index("\n  },", start)
        block = source[start:end]
        block = re.sub(r"    brand: \{[^}]*\},\n", "", block)
        line = ("    brand: { accent: '%s', onAccent: '%s' },\n" % (accent, text))
        anchor = "    video: null,"
        assert anchor in block, slug
        block = block.replace(anchor, line + anchor, 1)
        source = source[:start] + block + source[end:]
        written += 1

    io.open(PORTFOLIO, "w", encoding="utf-8", newline="").write(source)
    print("\nwrote a brand colour for %d of %d projects" % (written, len(rows)))
    return rows


if __name__ == "__main__":
    run()
