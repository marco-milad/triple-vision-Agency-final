"""Sample rebranding boards, in the model creativetwinkles.net uses.

That case study is nine images and nothing else: no page title, no brief, no
body copy in the HTML. Every headline and every paragraph is baked into the
artwork, and each board runs the full width of the window. The boards are dense
and mostly taller than they are wide - the nine range from 0.61 to 1.54 - so the
page reads as a presentation someone hands you rather than a list of pictures.

These are drawn here rather than borrowed, at the same width and the same nine
heights, so the agency's own boards drop in under the same names.

Run from the project root:  python scripts/generate-brand-boards.py
"""
import json
import os
from PIL import Image, ImageChops, ImageDraw, ImageFont

F_BOLD = "C:/Windows/Fonts/arialbd.ttf"
F_REG = "C:/Windows/Fonts/arial.ttf"
F_DISP = "C:/Windows/Fonts/bahnschrift.ttf"
F_MONO = "C:/Windows/Fonts/consola.ttf"

W = 1920
SLUG = "branding-food-group"
OUT = os.path.join("public/work", SLUG)
MANIFEST = "scripts/brand-boards.json"

BLACK = "#0E0E0E"
WHITE = "#FFFFFF"
PAPER = "#F4F2ED"

BRAND = "MAZRA"
LINE = "Food Group"

# the four category sub-brands, each with its own colour
CATEGORIES = [
    ("PASTA", "#E8A020"),
    ("GRAIN", "#C3372B"),
    ("OILS", "#7D9442"),
    ("MILLING", "#C9A227"),
]
ACCENT = CATEGORIES[0][1]


def font(path, size):
    return ImageFont.truetype(path, max(int(size), 8))


def hex_rgb(value):
    return tuple(int(value[i:i + 2], 16) for i in (1, 3, 5))


def cmyk(value):
    """The print values a brand board prints beside the swatch, actually derived."""
    r, g, b = (channel / 255 for channel in hex_rgb(value))
    k = 1 - max(r, g, b)
    if k >= 1:
        return 0, 0, 0, 100
    c, m, y = ((1 - channel - k) / (1 - k) for channel in (r, g, b))
    return tuple(round(v * 100) for v in (c, m, y, k))


def wrap(draw, text, fnt, width):
    lines, line = [], ""
    for word in text.split():
        trial = (line + " " + word).strip()
        if draw.textlength(trial, font=fnt) <= width or not line:
            line = trial
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def para(draw, xy, text, fnt, fill, width, leading=1.45):
    x, y = xy
    for i, line in enumerate(wrap(draw, text, fnt, width)):
        draw.text((x, y + i * fnt.size * leading), line, font=fnt, fill=fill)
    return len(wrap(draw, text, fnt, width)) * fnt.size * leading


def stack(draw, xy, lines, fnt, fill, leading=0.95):
    x, y = xy
    for i, line in enumerate(lines):
        draw.text((x, y + i * fnt.size * leading), line, font=fnt, fill=fill)
    return len(lines) * fnt.size * leading


def tracked(draw, xy, text, fnt, fill, track):
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=fnt, fill=fill)
        x += draw.textlength(char, font=fnt) + track


def mark(size, colour):
    """A wheat-grain lens, built as the overlap of two quarter discs."""
    side = max(int(size), 8)
    big = side * 4
    a = Image.new("L", (big, big), 0)
    b = Image.new("L", (big, big), 0)
    ImageDraw.Draw(a).pieslice([-big, 0, big, big * 2], 270, 360, fill=255)
    ImageDraw.Draw(b).pieslice([0, -big, big * 2, big], 90, 180, fill=255)
    layer = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    layer.paste(Image.new("RGBA", (big, big), colour), mask=ImageChops.multiply(a, b))
    return layer.resize((side, side), Image.LANCZOS)


def lockup(image, x, y, size, colour, label=None, draw=None):
    """The wordmark with its mark, optionally over a category label."""
    m = mark(size, colour)
    image.paste(m, (int(x), int(y)), m)
    d = draw or ImageDraw.Draw(image)
    f = font(F_DISP, size * 0.95)
    d.text((x + size * 1.25, y + size * 0.02), BRAND, font=f, fill=colour)
    if label:
        width = d.textlength(BRAND, font=f)
        lf = font(F_MONO, size * 0.3)
        lw = d.textlength(label, font=lf)
        cx = x + size * 1.25 + width / 2
        d.text((cx - lw / 2, y + size * 1.05), label, font=lf, fill=colour)
        d.line([x + size * 1.25, y + size * 1.18, cx - lw / 2 - size * 0.2, y + size * 1.18],
               fill=colour, width=2)
        d.line([cx + lw / 2 + size * 0.2, y + size * 1.18, x + size * 1.25 + width,
                y + size * 1.18], fill=colour, width=2)


def mockup(draw, box, ground, item, label=None, portrait=True):
    """A flat stand-in for a photographed object - a box, a sheet, a panel."""
    x0, y0, x1, y1 = box
    draw.rectangle(box, fill=ground)
    w, h = x1 - x0, y1 - y0
    if portrait:
        iw, ih = w * 0.42, h * 0.66
    else:
        iw, ih = w * 0.66, h * 0.42
    ix, iy = x0 + (w - iw) / 2, y0 + (h - ih) / 2
    draw.rectangle([ix, iy, ix + iw, iy + ih], fill=item)
    draw.rectangle([ix, iy, ix + iw, iy + ih * 0.14], fill=ACCENT)
    size = min(iw, ih) * 0.2
    m = mark(size, WHITE if ground != WHITE else BLACK)
    if label:
        draw.text((x0 + w * 0.06, y1 - h * 0.1), label, font=font(F_MONO, h * 0.035),
                  fill=WHITE if ground != WHITE else BLACK)
    return ix, iy, iw, ih


# ---------------------------------------------------------------- the boards

def b_title(h):
    image = Image.new("RGB", (W, h), BLACK)
    draw = ImageDraw.Draw(image)
    m = W * 0.07

    size = W * 0.1
    lockup(image, W / 2 - size * 2.1, h * 0.34, size, ACCENT, draw=draw)

    draw.rectangle([m, h * 0.72, m + 6, h * 0.72 + W * 0.055], fill=CATEGORIES[1][1])
    draw.text((m + 24, h * 0.72), "REBRANDING", font=font(F_BOLD, W * 0.016), fill=CATEGORIES[1][1])
    para(draw, (m + 24, h * 0.72 + W * 0.028),
         "The purpose of these designs is to explain the use of the new brand and to "
         "reinforce a consistent application of the visual elements across every "
         "publication, presentation and piece of marketing material, online and off.",
         font(F_REG, W * 0.0105), "#9A9A9A", W * 0.28)

    box = [W - m - W * 0.24, h * 0.72, W - m, h * 0.72 + W * 0.075]
    draw.rectangle(box, outline=WHITE, width=5)
    stack(draw, (box[0] + W * 0.02, box[1] + W * 0.012), ["IN NEW", "& FRESH!"],
          font(F_DISP, W * 0.034), WHITE, 1.05)
    return image


def b_old_new(h):
    image = Image.new("RGB", (W, h), WHITE)
    draw = ImageDraw.Draw(image)
    m = W * 0.07
    stack(draw, (m, h * 0.09), [BRAND, "IN NEW", "COSTUM"], font(F_DISP, W * 0.065), BLACK, 1.0)

    panel = [m, h * 0.46, W * 0.63, h * 0.88]
    draw.rounded_rectangle(panel, radius=W * 0.03, fill=CATEGORIES[1][1])
    draw.text((panel[0] + W * 0.04, panel[1] + W * 0.035), "OLD", font=font(F_MONO, W * 0.011),
              fill="#F3B4AE")
    old = font(F_REG, W * 0.028)
    draw.text((panel[0] + W * 0.09, panel[1] + W * 0.028), BRAND, font=old, fill="#F6CFCB")
    draw.text((panel[0] + W * 0.04, panel[1] + W * 0.12), "NEW", font=font(F_MONO, W * 0.011),
              fill=WHITE)
    lockup(image, panel[0] + W * 0.09, panel[1] + W * 0.105, W * 0.045, WHITE, draw=draw)

    x = W * 0.68
    stack(draw, (x, h * 0.5), ["LOOKIN'", "FRESH!"], font(F_DISP, W * 0.03), BLACK, 1.05)
    draw.line([x, h * 0.48, x, h * 0.82], fill=BLACK, width=4)
    para(draw, (x + W * 0.012, h * 0.62),
         "Kept the character, added depth, dressed it up a little and amplified the spark.",
         font(F_REG, W * 0.0105), "#555555", W * 0.2)
    return image


def b_visual_system(h):
    image = Image.new("RGB", (W, h), WHITE)
    draw = ImageDraw.Draw(image)
    m = W * 0.07

    stack(draw, (m, h * 0.05), ["VISUAL", "SYSTEM"], font(F_DISP, W * 0.03), BLACK, 1.05)
    para(draw, (m, h * 0.13),
         "The symbol is built on the golden ratio and a square grid, so it stays "
         "optically even at any size.", font(F_REG, W * 0.0098), "#666666", W * 0.2)

    gx, gy, gs = W * 0.62, h * 0.04, W * 0.26
    for i in range(7):
        o = gs / 6 * i
        draw.line([gx + o, gy, gx + o, gy + gs], fill="#DDDDDD", width=2)
        draw.line([gx, gy + o, gx + gs, gy + o], fill="#DDDDDD", width=2)
    m_img = mark(gs * 0.46, BLACK)
    image.paste(m_img, (int(gx + gs * 0.17), int(gy + gs * 0.17)), m_img)

    stack(draw, (m, h * 0.29), ["BECAUSE", "WE LIKE", "STORY", "TELLING"],
          font(F_DISP, W * 0.038), BLACK, 1.0)

    cx, cy = W * 0.6, h * 0.34
    for i, (label, colour) in enumerate(CATEGORIES):
        r = W * 0.035 - i * W * 0.004
        x = cx + (i % 2) * W * 0.17 + (i // 2) * W * 0.05
        y = cy + (i // 2) * W * 0.08 + (i % 2) * W * 0.03
        draw.ellipse([x, y, x + r * 2, y + r * 2], fill=colour)

    top = h * 0.62
    cell = (W - m * 2) / 4
    for i, (label, colour) in enumerate(CATEGORIES):
        x = m + i * cell
        draw.line([x, top, x + cell * 0.8, top], fill="#DDDDDD", width=2)
        draw.ellipse([x + cell * 0.3, top + h * 0.03, x + cell * 0.46, top + h * 0.03 + cell * 0.16],
                     fill=colour)
        draw.text((x + cell * 0.38, top - h * 0.025), label, font=font(F_MONO, W * 0.0085),
                  fill="#888888", anchor="ma")
    for i, (label, colour) in enumerate(CATEGORIES):
        lockup(image, m + i * cell, h * 0.84, cell * 0.17, colour, label, draw)
    return image


def b_slogan_palette(h):
    image = Image.new("RGB", (W, h), WHITE)
    draw = ImageDraw.Draw(image)
    m = W * 0.07

    panel = [0, 0, W * 0.72, h * 0.2]
    draw.rounded_rectangle([panel[0] - 40, panel[1] - 40, panel[2], panel[3]],
                           radius=W * 0.03, fill=BLACK)
    stack(draw, (m, h * 0.05), ["SLOGAN", "IN GOOD"], font(F_DISP, W * 0.028), WHITE, 1.05)
    para(draw, (m, h * 0.125), "When the slogan carries the same promise as the name.",
         font(F_REG, W * 0.009), "#9A9A9A", W * 0.18)
    draw.text((W * 0.4, h * 0.055), "OLD", font=font(F_MONO, W * 0.009), fill=CATEGORIES[1][1])
    draw.text((W * 0.46, h * 0.05), "FEEL FOOD FEEL GOOD", font=font(F_REG, W * 0.013), fill="#9A9A9A")
    draw.text((W * 0.4, h * 0.105), "NEW", font=font(F_MONO, W * 0.009), fill=ACCENT)
    draw.text((W * 0.46, h * 0.1), "COMMITTED TO QUALITY", font=font(F_BOLD, W * 0.013), fill=WHITE)

    top = h * 0.26
    cell = (W - m * 2) / 4
    column = h * 0.42
    for i, (label, colour) in enumerate(CATEGORIES):
        x = m + i * cell
        draw.rounded_rectangle([x, top, x + cell * 0.88, top + column],
                               radius=W * 0.012, fill=colour)
        draw.text((x + cell * 0.07, top + column * 0.08), "COMMITTED", font=font(F_BOLD, W * 0.011),
                  fill=WHITE)
        draw.text((x + cell * 0.07, top + column * 0.14), "TO QUALITY", font=font(F_BOLD, W * 0.011),
                  fill=WHITE)
        rgb = hex_rgb(colour)
        for j, line in enumerate([colour.upper(), "RGB %d %d %d" % rgb,
                                  "CMYK %d %d %d %d" % cmyk(colour)]):
            draw.text((x + cell * 0.07, top + column * 0.74 + j * h * 0.022), line,
                      font=font(F_MONO, W * 0.0078), fill=WHITE)

    base = top + column + h * 0.05
    for i, (label, colour) in enumerate(CATEGORIES):
        lockup(image, m + i * cell, base, cell * 0.16, colour, label, draw)
        r = cell * 0.17
        draw.ellipse([m + i * cell, base + h * 0.1, m + i * cell + r * 2, base + h * 0.1 + r * 2],
                     fill=colour)
        draw.text((m + i * cell + r, base + h * 0.1 + r), label[:2].lower(),
                  font=font(F_DISP, r * 1.1), fill=WHITE, anchor="mm")
    return image


def b_typography(h):
    image = Image.new("RGB", (W, h), WHITE)
    draw = ImageDraw.Draw(image)
    m = W * 0.07
    bar = W * 0.5
    for i in range(10):
        colour = CATEGORIES[i % 4][1]
        draw.rectangle([m + i * (bar / 10), h * 0.06, m + (i + 1) * (bar / 10), h * 0.1], fill=colour)

    rows = [("Bahnschrift", F_DISP), ("Arial Bold", F_BOLD)]
    for i, (name, path) in enumerate(rows):
        y = h * 0.22 + i * h * 0.38
        draw.text((m, y), "AB", font=font(path, W * 0.07), fill="#555555")
        draw.text((m + W * 0.17, y + W * 0.012), name.upper(), font=font(F_MONO, W * 0.0105),
                  fill=BLACK)
        for j, line in enumerate(["ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                                  "abcdefghijklmnopqrstuvwxyz",
                                  "1234567890 ! @ # $ % & * ( ) _ - +"]):
            draw.text((m + W * 0.17, y + W * 0.03 + j * h * 0.055), line,
                      font=font(path, W * 0.0135), fill="#444444")
    return image


def b_pattern(h):
    image = Image.new("RGB", (W, h), BLACK)
    draw = ImageDraw.Draw(image)
    step = W / 16
    for row in range(int(h * 0.62 / step) + 1):
        for col in range(17):
            colour = CATEGORIES[(row + col) % 4][1]
            x, y = col * step, row * step
            if (row + col) % 3 == 0:
                draw.ellipse([x + step * 0.3, y + step * 0.3, x + step * 0.6, y + step * 0.6],
                             outline=colour, width=3)
            elif (row + col) % 3 == 1:
                draw.arc([x + step * 0.2, y + step * 0.2, x + step * 0.8, y + step * 0.8],
                         200, 340, fill=colour, width=3)

    m = W * 0.07
    for i, (label, colour) in enumerate(CATEGORIES):
        lockup(image, m, h * 0.08 + i * h * 0.12, W * 0.05, colour, label, draw)
    stack(draw, (W * 0.62, h * 0.08), ["DOES", "THIS", "SHADE", "MAKE", "ME", "LOOK", "LIKE"],
          font(F_DISP, W * 0.052), CATEGORIES[1][1], 0.95)

    panel = h * 0.66
    draw.rectangle([0, panel, W, h], fill=CATEGORIES[2][1])
    para(draw, (m, panel + h * 0.06),
         "A kit of brand illustrations we keep forming and reforming. It tells larger "
         "than life stories that everyone can still relate to.",
         font(F_REG, W * 0.0105), WHITE, W * 0.26)
    for i in range(14):
        colour = CATEGORIES[i % 4][1]
        r = W * (0.012 + 0.006 * ((i * 7) % 3))
        x = W * 0.42 + (i % 7) * W * 0.075
        y = panel + h * 0.06 + (i // 7) * h * 0.09
        draw.ellipse([x, y, x + r * 2, y + r * 2], fill=colour)
    stack(draw, (W * 0.66, h - h * 0.17), ["BECAUSE", "WE ARE", "FAMILY"],
          font(F_DISP, W * 0.034), WHITE, 1.0)
    return image


def b_imagery(h):
    image = Image.new("RGB", (W, h), WHITE)
    draw = ImageDraw.Draw(image)
    cols, rows = 4, 4
    cell_w, cell_h = W / cols, (h * 0.68) / rows
    for r in range(rows):
        for c in range(cols):
            colour = CATEGORIES[(r * cols + c) % 4][1]
            x, y = c * cell_w, r * cell_h
            dark = (r + c) % 2 == 0
            draw.rectangle([x, y, x + cell_w, y + cell_h], fill=BLACK if dark else colour)
            iw, ih = cell_w * 0.46, cell_h * 0.62
            ix, iy = x + (cell_w - iw) / 2, y + (cell_h - ih) / 2
            draw.rounded_rectangle([ix, iy, ix + iw, iy + ih], radius=cell_w * 0.03,
                                   fill=colour if dark else BLACK)
            size = iw * 0.3
            m_img = mark(size, WHITE)
            image.paste(m_img, (int(ix + iw * 0.12), int(iy + ih * 0.12)), m_img)
            draw.text((ix + iw * 0.12, iy + ih * 0.78), BRAND, font=font(F_DISP, iw * 0.2),
                      fill=WHITE)

    m = W * 0.07
    base = h * 0.72
    stack(draw, (m, base), ["BRAND", "IMAGERY"], font(F_DISP, W * 0.032), BLACK, 1.05)
    draw.rectangle([W * 0.42, base - h * 0.03, W, h], fill=BLACK)
    para(draw, (W * 0.46, base),
         "Packaging is coloured by category, and that will not change. While the brand "
         "language is far more colourful now, the resting colour is used only where the "
         "palette is not already doing the work.",
         font(F_REG, W * 0.0105), "#BBBBBB", W * 0.26)
    return image


def b_look_feel(h):
    image = Image.new("RGB", (W, h), WHITE)
    draw = ImageDraw.Draw(image)
    draw.rectangle([0, 0, W * 0.34, h * 0.46], fill=CATEGORIES[1][1])
    stack(draw, (W * 0.05, h * 0.12), ["BRAND", "LOOK &", "FEEL"], font(F_DISP, W * 0.034),
          WHITE, 1.05)

    mockup(draw, [W * 0.34, 0, W, h * 0.46], CATEGORIES[2][1], WHITE, "LETTERHEAD & ENVELOPE", False)
    mockup(draw, [0, h * 0.46, W * 0.5, h], PAPER, CATEGORIES[1][1], "LANYARD & CARD")
    mockup(draw, [W * 0.5, h * 0.46, W, h], BLACK, WHITE, "DESK CALENDAR")
    return image


def b_outdoor(h):
    image = Image.new("RGB", (W, h), BLACK)
    draw = ImageDraw.Draw(image)
    m = W * 0.07
    draw.line([m, h * 0.1, W - m, h * 0.1], fill=WHITE, width=4)
    stack(draw, (m, h * 0.12), ["LINGO AT PLAY", "ON THE OUTDOOR"], font(F_DISP, W * 0.034),
          WHITE, 1.05)

    top = h * 0.34
    panel_h = h * 0.56
    gap = W * 0.03
    panel_w = (W - m * 2 - gap) / 2

    draw.rectangle([m, top, m + panel_w, top + panel_h], fill="#E6E4DF")
    draw.rectangle([m + panel_w * 0.24, top + panel_h * 0.1,
                    m + panel_w * 0.76, top + panel_h * 0.9], fill=WHITE)
    size = panel_w * 0.16
    m_img = mark(size, ACCENT)
    image.paste(m_img, (int(m + panel_w * 0.42), int(top + panel_h * 0.34)), m_img)
    draw.text((m + panel_w * 0.5, top + panel_h * 0.56), BRAND, font=font(F_DISP, panel_w * 0.1),
              fill=BLACK, anchor="ma")

    x = m + panel_w + gap
    draw.rectangle([x, top, x + panel_w, top + panel_h], fill="#2B2B2B")
    for i in range(6):
        colour = CATEGORIES[i % 4][1]
        cw = panel_w * 0.26
        ch = panel_h * 0.2
        cx = x + panel_w * 0.1 + (i % 3) * (cw + panel_w * 0.06)
        cy = top + panel_h * 0.16 + (i // 3) * (ch + panel_h * 0.12)
        draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=cw * 0.1, fill=colour)
    draw.text((x + panel_w / 2, top + panel_h * 0.78), BRAND + "  " + LINE.upper(),
              font=font(F_DISP, panel_w * 0.07), fill=WHITE, anchor="ma")
    return image


BOARDS = [
    ("01-rebranding", 2144, b_title, "the opening board, the new mark over the rebranding note"),
    ("02-old-and-new", 1690, b_old_new, "the old mark set against the new one"),
    ("03-visual-system", 2266, b_visual_system, "the symbol on its grid and the four category lockups"),
    ("04-slogan-and-palette", 2263, b_slogan_palette, "the slogan, then the four category colours with their values"),
    ("05-typography", 1245, b_typography, "the two typefaces and their character sets"),
    ("06-pattern", 2991, b_pattern, "the illustration kit and how colour carries across the categories"),
    ("07-brand-imagery", 3140, b_imagery, "packaging coloured by category"),
    ("08-look-and-feel", 1878, b_look_feel, "stationery, lanyard and desk calendar"),
    ("09-outdoor", 1945, b_outdoor, "the brand outdoors, on signage and a vending unit"),
]


def build():
    os.makedirs(OUT, exist_ok=True)
    for stale in os.listdir(OUT):
        os.remove(os.path.join(OUT, stale))

    entries = []
    for name, height, render, note in BOARDS:
        image = render(height)
        filename = name + ".webp"
        image.save(os.path.join(OUT, filename), "WEBP", quality=84, method=6)
        entries.append({
            "src": "/work/%s/%s" % (SLUG, filename),
            "alt": "%s rebranding board, %s" % (BRAND, note),
            "width": W, "height": height,
        })
        print("  %-24s %4dx%-5d" % (name, W, height))

    json.dump({SLUG: {"cover": entries[0], "gallery": entries[1:]}}, open(MANIFEST, "w"), indent=1)
    size = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
    print("%d boards, %.0f KB -> %s" % (len(entries), size / 1024, MANIFEST))


if __name__ == "__main__":
    build()
