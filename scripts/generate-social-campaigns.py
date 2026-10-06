"""Sample social campaign boards for the social media management case studies.

A social case study is a run of finished artwork, so the files mirror what a
campaign hand-off actually contains: a presentation board, section dividers, the
square posts themselves, a portrait post and a phone mock-up board. Sizes follow
the reference pages - 1400 wide for boards and dividers, 1080x1080 for posts,
1080x1350 for the portrait one.

Everything is drawn here rather than borrowed, and each file is written at the
exact size of the slot it fills so real artwork drops in under the same name.
"""
import json
import os
from PIL import Image, ImageDraw, ImageFont

F_BOLD = "C:/Windows/Fonts/arialbd.ttf"
F_REG = "C:/Windows/Fonts/arial.ttf"
F_DISP = "C:/Windows/Fonts/bahnschrift.ttf"
F_MONO = "C:/Windows/Fonts/consola.ttf"

OUT_ROOT = "public/work"


def font(path, size):
    return ImageFont.truetype(path, max(int(size), 8))


def rgb(value):
    return tuple(int(value[i:i + 2], 16) for i in (1, 3, 5))


def mix(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(rgb(a), rgb(b)))


class Campaign:
    def __init__(self, slug, brand, line, deep, ink, accent, tint, posts, kicker):
        self.slug = slug
        self.brand = brand
        self.line = line
        self.deep = deep        # the dark ground
        self.ink = ink          # type on light grounds
        self.accent = accent    # the brand colour
        self.tint = tint        # the light ground
        self.posts = posts      # (kicker, headline) per square post
        self.kicker = kicker    # the divider label


CAMPAIGNS = [
    Campaign(
        "dr-bishoy-ghabrial-clinic", "Dr. Bishoy Ghabrial", "Eye Clinic",
        deep="#0C1B2A", ink="#0C1B2A", accent="#C8973F", tint="#F3EFE6",
        kicker="Awareness series",
        posts=[
            ("Lasik", "See the morning\nbefore your alarm"),
            ("Screens", "Your eyes work\na double shift"),
            ("Children", "Half of what they\nmiss is on the board"),
            ("Cataract", "Colour comes back\nin twenty minutes"),
            ("Check-up", "One visit a year\nis the whole plan"),
            ("Night driving", "Glare is a symptom,\nnot a habit"),
            ("Dry eye", "Blink. Then blink\nproperly"),
            ("Booking", "A clinic that runs\non time"),
        ],
    ),
    Campaign(
        "one-stop-gresco", "One Stop", "by Gresco",
        deep="#141414", ink="#141414", accent="#D32027", tint="#EFEFEF",
        kicker="Tyre campaign",
        posts=[
            ("Grip", "The road is wet\nfor nine seconds"),
            ("Pressure", "Two psi is a\nfull tank a month"),
            ("Alignment", "Your car pulls.\nYou correct. It wears"),
            ("Season", "Summer rubber in\nDecember is a bet"),
            ("Tread", "A coin tells you\nmore than a glance"),
            ("Fitting", "In and out in\nthirty minutes"),
            ("Balance", "The shake at 90\nis not the engine"),
            ("Warranty", "Five years, in\nwriting"),
        ],
    ),
    Campaign(
        "nourish-cosmetics", "Nourish", "Cosmetics",
        deep="#2A1F2D", ink="#2A1F2D", accent="#D98A8A", tint="#F7EFEA",
        kicker="Product launch",
        posts=[
            ("Serum", "Skin does its\nrepair at night"),
            ("Ingredients", "Eleven. All of\nthem readable"),
            ("Routine", "Three steps, not\nthirteen"),
            ("SPF", "The cheapest\nanti-ageing there is"),
            ("Texture", "It sinks in before\nyou put the cap back"),
            ("Sensitive", "Tested on skin\nthat complains"),
            ("Refill", "The bottle stays.\nThe pouch goes"),
            ("Launch", "In store from\nThursday"),
        ],
    ),
]


# ----------------------------------------------------------------- primitives

def logo(draw, x, y, size, campaign, colour):
    draw.ellipse([x, y, x + size, y + size], outline=colour, width=max(int(size * 0.12), 2))
    draw.ellipse([x + size * 0.34, y + size * 0.34, x + size * 0.66, y + size * 0.66], fill=colour)


def wordmark(draw, x, y, size, campaign, colour, with_line=True):
    f = font(F_DISP, size)
    draw.text((x, y), campaign.brand.upper(), font=f, fill=colour)
    if with_line:
        width = draw.textlength(campaign.brand.upper(), font=f)
        draw.text((x, y + size * 1.25), campaign.line, font=font(F_REG, size * 0.42), fill=colour)
        return width
    return draw.textlength(campaign.brand.upper(), font=f)


def headline(draw, box, text, fnt, fill, leading=1.18, anchor="lt"):
    """Draw a pre-broken headline; returns the block height."""
    x, y = box
    lines = text.split("\n")
    step = fnt.size * leading
    for i, line in enumerate(lines):
        draw.text((x, y + i * step), line, font=fnt, fill=fill, anchor=anchor)
    return step * len(lines)


# --------------------------------------------------------------- the pieces

def post(size, campaign, index, kicker, text):
    """One square campaign post. Five layouts, rotated through the set."""
    style = index % 5
    w = h = size
    if style in (0, 3):
        bg, fg, sub, foot = campaign.deep, "#FFFFFF", campaign.accent, campaign.accent
    elif style == 1:
        # On the accent ground the kicker has to drop to the dark colour;
        # white on gold or on red does not hold.
        bg, fg, sub, foot = campaign.accent, "#FFFFFF", campaign.deep, campaign.deep
    elif style == 2:
        # The footer sits inside the accent bar at the foot of this one.
        bg, fg, sub, foot = campaign.tint, campaign.ink, campaign.accent, "#FFFFFF"
    else:
        bg, fg, sub, foot = campaign.tint, campaign.ink, campaign.accent, campaign.accent

    image = Image.new("RGB", (w, h), bg)
    draw = ImageDraw.Draw(image)
    m = w * 0.095

    if style == 0:      # big shape behind the type
        draw.ellipse([w * 0.45, -h * 0.18, w * 1.25, h * 0.62], fill=campaign.accent)
    elif style == 2:    # a block at the foot
        draw.rectangle([0, h * 0.82, w, h], fill=campaign.accent)
    elif style == 3:    # split ground
        draw.rectangle([0, 0, w, h * 0.38], fill=campaign.accent)
    elif style == 4:    # a wedge clear of the text column
        draw.pieslice([w * 0.62, h * 0.62, w * 1.5, h * 1.5], 0, 360, fill=campaign.accent)

    logo(draw, m, m, w * 0.075, campaign, fg)
    draw.text((m + w * 0.105, m + w * 0.012), campaign.brand, font=font(F_BOLD, w * 0.034), fill=fg)

    draw.text((m, h * 0.42), kicker.upper(), font=font(F_MONO, w * 0.028), fill=sub)
    headline(draw, (m, h * 0.49), text, font(F_DISP, w * 0.082), fg)

    draw.text((m, h - m * 0.9), campaign.line, font=font(F_REG, w * 0.026), fill=foot)
    return image


def portrait_post(w, h, campaign, kicker, text):
    image = Image.new("RGB", (w, h), campaign.deep)
    draw = ImageDraw.Draw(image)
    for y in range(h):
        draw.line([(0, y), (w, y)], fill=mix(campaign.deep, campaign.accent, (y / h) ** 2 * 0.65))
    m = w * 0.1
    logo(draw, m, m, w * 0.085, campaign, "#FFFFFF")
    draw.text((m + w * 0.12, m + w * 0.015), campaign.brand, font=font(F_BOLD, w * 0.038), fill="#FFFFFF")
    draw.text((m, h * 0.52), kicker.upper(), font=font(F_MONO, w * 0.03), fill="#FFFFFF")
    headline(draw, (m, h * 0.58), text, font(F_DISP, w * 0.088), "#FFFFFF")
    draw.text((m, h - m * 0.85), campaign.line, font=font(F_REG, w * 0.028), fill="#FFFFFF")
    return image


def divider(w, h, campaign, label):
    image = Image.new("RGB", (w, h), campaign.accent)
    draw = ImageDraw.Draw(image)
    f = font(F_DISP, h * 0.3)
    text = label.upper()
    widths = [draw.textlength(c, font=f) + h * 0.09 for c in text]
    x = (w - sum(widths)) / 2
    for char, width in zip(text, widths):
        draw.text((x, h / 2), char, font=f, fill="#FFFFFF", anchor="lm")
        x += width
    return image


def hero_board(w, h, campaign):
    """The opening board: the wordmark over a 2x2 of posts from the set."""
    image = Image.new("RGB", (w, h), campaign.deep)
    draw = ImageDraw.Draw(image)
    for y in range(h):
        draw.line([(0, y), (w, y)], fill=mix(campaign.deep, campaign.accent, (y / h) ** 1.8 * 0.5))

    logo(draw, w / 2 - w * 0.035, h * 0.075, w * 0.07, campaign, "#FFFFFF")
    f = font(F_DISP, w * 0.072)
    text = campaign.brand.upper()
    widths = [draw.textlength(c, font=f) + w * 0.009 for c in text]
    x = (w - sum(widths)) / 2
    for char, width in zip(text, widths):
        draw.text((x, h * 0.2), char, font=f, fill="#FFFFFF")
        x += width
    draw.text((w / 2, h * 0.3), campaign.line + "   ·   Social Media Management",
              font=font(F_REG, w * 0.019), fill="#FFFFFF", anchor="ma")

    cell = w * 0.21
    gap = w * 0.022
    left = (w - cell * 2 - gap) / 2
    top = h * 0.4
    for i in range(4):
        kicker, text = campaign.posts[i]
        thumb = post(540, campaign, i, kicker, text).resize((int(cell), int(cell)), Image.LANCZOS)
        image.paste(thumb, (int(left + (i % 2) * (cell + gap)), int(top + (i // 2) * (cell + gap))))
    return image


def phones_board(w, h, campaign):
    """Three phones showing the posts in the feed they were made for."""
    image = Image.new("RGB", (w, h), campaign.tint)
    draw = ImageDraw.Draw(image)
    draw.text((w * 0.5, h * 0.09), "In the feed", font=font(F_DISP, w * 0.038),
              fill=campaign.ink, anchor="ma")

    phone_w = w * 0.17
    phone_h = phone_w * 2.03
    gap = w * 0.045
    left = (w - phone_w * 3 - gap * 2) / 2
    top = h * 0.22
    for i in range(3):
        x = left + i * (phone_w + gap)
        draw.rounded_rectangle([x, top, x + phone_w, top + phone_h],
                               radius=phone_w * 0.1, fill=campaign.deep)
        inner = phone_w * 0.92
        ix, iy = x + (phone_w - inner) / 2, top + phone_w * 0.14
        draw.rounded_rectangle([x + phone_w * 0.36, top + phone_w * 0.045,
                                x + phone_w * 0.64, top + phone_w * 0.085],
                               radius=phone_w * 0.02, fill="#FFFFFF")
        kicker, text = campaign.posts[(i + 4) % len(campaign.posts)]
        thumb = post(540, campaign, i + 1, kicker, text).resize((int(inner), int(inner)), Image.LANCZOS)
        image.paste(thumb, (int(ix), int(iy)))
        bar = iy + inner
        draw.rectangle([ix, bar, ix + inner, bar + phone_w * 0.07], fill="#FFFFFF")
        draw.rectangle([ix + inner * 0.06, bar + phone_w * 0.09, ix + inner * 0.7,
                        bar + phone_w * 0.115], fill="#FFFFFF")
    return image


SEQUENCE = [
    ("01-opening-board", "hero", 1400, 1375, "the opening board, the wordmark over four posts from the set"),
    ("02-divider", "divider", 1400, 212, "a divider carrying the campaign name"),
    ("03-post", "post", 1080, 1080, None),
    ("04-post", "post", 1080, 1080, None),
    ("05-post", "post", 1080, 1080, None),
    ("06-in-the-feed", "phones", 1400, 860, "three phones showing the posts in the feed"),
    ("07-post", "post", 1080, 1080, None),
    ("08-post", "post", 1080, 1080, None),
    ("09-story", "portrait", 1080, 1350, "the portrait cut of the campaign, made for stories"),
    ("10-divider", "divider", 1400, 212, "a divider closing the campaign"),
    ("11-post", "post", 1080, 1080, None),
    ("12-post", "post", 1080, 1080, None),
]


def build():
    manifest = {}
    for campaign in CAMPAIGNS:
        folder = os.path.join(OUT_ROOT, campaign.slug)
        os.makedirs(folder, exist_ok=True)
        for stale in os.listdir(folder):
            os.remove(os.path.join(folder, stale))

        entries = []
        post_index = 0
        for name, kind, w, h, note in SEQUENCE:
            if kind == "hero":
                image = hero_board(w, h, campaign)
            elif kind == "divider":
                image = divider(w, h, campaign, campaign.kicker)
            elif kind == "phones":
                image = phones_board(w, h, campaign)
            elif kind == "portrait":
                kicker, text = campaign.posts[-1]
                image = portrait_post(w, h, campaign, kicker, text)
            else:
                kicker, text = campaign.posts[post_index % len(campaign.posts)]
                image = post(w, campaign, post_index, kicker, text)
                note = "the %s post, %s" % (kicker.lower(), text.replace("\n", " ").lower())
                post_index += 1

            filename = name + ".webp"
            image.save(os.path.join(folder, filename), "WEBP", quality=86, method=6)
            entries.append({
                "src": "/work/%s/%s" % (campaign.slug, filename),
                "alt": "%s campaign, %s" % (campaign.brand, note),
                "width": w, "height": h,
            })

        manifest[campaign.slug] = {"cover": entries[0], "gallery": entries[1:]}
        size = sum(os.path.getsize(os.path.join(folder, f)) for f in os.listdir(folder))
        print("%-28s %2d files %6.0f KB" % (campaign.slug, len(entries), size / 1024))

    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "social.json")
    json.dump(manifest, open(path, "w"), indent=1)
    print("manifest ->", path)


if __name__ == "__main__":
    build()
