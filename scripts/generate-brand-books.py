"""Sample brand books for the two branding case studies.

These pages are drawn, not photographed. A branding case study shows the
guidelines that were delivered, so the spreads are logo construction, clear
space, palette, type and applications. Everything is original, which keeps the
live site clear of anyone else's client work, and each file is written at the
exact pixel size of the slot it fills so real artwork drops in under the same
name without moving anything on the page.
"""
import json
import os
from PIL import Image, ImageChops, ImageDraw, ImageFont

F_BOLD = "C:/Windows/Fonts/arialbd.ttf"
F_REG = "C:/Windows/Fonts/arial.ttf"
F_DISP = "C:/Windows/Fonts/bahnschrift.ttf"
F_MONO = "C:/Windows/Fonts/consola.ttf"
F_SERIF = "C:/Windows/Fonts/cambriab.ttf"

OUT_ROOT = "public/work"


def font(path, size):
    return ImageFont.truetype(path, max(int(size), 7))


def hex_rgb(value):
    return tuple(int(value[i:i + 2], 16) for i in (1, 3, 5))


class Brand:
    def __init__(self, name, tag, ink, accent, support, swatches, display, mark):
        self.name = name
        self.tag = tag
        self.ink = ink
        self.accent = accent
        self.support = support
        self.swatches = swatches
        self.paper = swatches[4][1]
        self.display = display
        self.mark = mark


VERDE = Brand(
    "VERDE", "Landscape & Outdoor Design",
    ink="#17301F", accent="#2F6B46", support="#9BB08F",
    swatches=[("Canopy", "#17301F"), ("Leaf", "#2F6B46"), ("Sage", "#9BB08F"),
              ("Sand", "#D8CBB4"), ("Paper", "#F2EFE7"), ("Stone", "#6E6A61")],
    display=F_SERIF, mark="leaf",
)

QUANTA = Brand(
    "QUANTA", "Spend Management Platform",
    ink="#141833", accent="#2F5BFF", support="#8A93AD",
    swatches=[("Ink", "#141833"), ("Signal", "#2F5BFF"), ("Mint", "#2BD3A0"),
              ("Slate", "#6B7280"), ("Mist", "#F4F6FC"), ("Paper", "#FFFFFF")],
    display=F_DISP, mark="q",
)


def tracked(draw, xy, text, fnt, fill, track, centred=False):
    """Letterspaced caps - the label style brand books use."""
    widths = [draw.textlength(c, font=fnt) + track for c in text]
    x = xy[0] - (sum(widths) - track) / 2 if centred else xy[0]
    for char, width in zip(text, widths):
        draw.text((x, xy[1]), char, font=fnt, fill=fill)
        x += width


def mark_layer(size, brand, colour):
    """The logo mark as its own transparent layer, so it can be transformed."""
    side = max(int(round(size)), 8)
    scale = 4  # drawn large and shrunk back, which is how the curves stay clean
    big = side * scale
    layer = Image.new("RGBA", (big, big), (0, 0, 0, 0))

    if brand.mark == "leaf":
        # Two quarter discs struck from opposite corners; the leaf is where they
        # overlap, so the shape is an intersection rather than a union.
        corner_a = Image.new("L", (big, big), 0)
        corner_b = Image.new("L", (big, big), 0)
        ImageDraw.Draw(corner_a).pieslice([-big, 0, big, big * 2], 270, 360, fill=255)
        ImageDraw.Draw(corner_b).pieslice([0, -big, big * 2, big], 90, 180, fill=255)
        leaf = ImageChops.multiply(corner_a, corner_b)
        layer.paste(Image.new("RGBA", (big, big), colour), mask=leaf)
    else:
        draw = ImageDraw.Draw(layer)
        weight = max(int(big * 0.15), 2)
        inset = weight / 2
        draw.ellipse([inset, inset, big - inset, big - inset], outline=colour, width=weight)
        draw.line([big * 0.66, big * 0.66, big - inset, big - inset], fill=colour, width=weight)

    return layer.resize((side, side), Image.LANCZOS)


def mark(draw, x, y, size, brand, colour, image=None, transform=None):
    """Stamp the mark. `image` is needed because a layer is pasted, not drawn."""
    target = image if image is not None else draw._image
    layer = mark_layer(size, brand, colour)
    if transform == "stretch":
        layer = layer.resize((int(layer.width * 1.55), int(layer.height * 0.72)), Image.LANCZOS)
    elif transform == "rotate":
        layer = layer.rotate(34, resample=Image.BICUBIC, expand=True)
    target.paste(layer, (int(x), int(y)), layer)


def shell(width, height, brand, label, number, dark=False):
    """Every spread carries the same label, page number and footer."""
    background = brand.ink if dark else brand.paper
    ink = brand.paper if dark else brand.ink
    image = Image.new("RGB", (width, height), background)
    draw = ImageDraw.Draw(image)
    margin = round(width * 0.072)
    small = font(F_REG, width * 0.0125)
    tracked(draw, (margin, margin * 0.7), label.upper(), small,
            brand.support if dark else brand.accent, width * 0.004)
    draw.text((width - margin, margin * 0.7), "%02d" % number, font=small, fill=ink, anchor="ra")
    draw.text((margin, height - margin * 0.8), brand.name + "   Brand Guidelines",
              font=font(F_REG, width * 0.0115), fill=brand.support)
    return image, draw, margin, ink


def cover(path, width, height, brand):
    image = Image.new("RGB", (width, height), brand.ink)
    draw = ImageDraw.Draw(image)
    top, bottom = hex_rgb(brand.ink), hex_rgb(brand.accent)
    for y in range(height):
        t = (y / height) ** 1.7 * 0.55
        draw.line([(0, y), (width, y)],
                  fill=tuple(round(a + (b - a) * t) for a, b in zip(top, bottom)))

    margin = round(width * 0.1)
    size = width * 0.17
    mark(draw, width / 2 - size / 2, height * 0.3, size, brand, brand.paper)
    tracked(draw, (width / 2, height * 0.52), brand.name,
            font(brand.display, width * 0.105), brand.paper, width * 0.014, centred=True)
    draw.text((width / 2, height * 0.625), brand.tag,
              font=font(F_REG, width * 0.023), fill=brand.support, anchor="ma")
    draw.line([margin, height * 0.71, width - margin, height * 0.71], fill=brand.support, width=2)
    tracked(draw, (width / 2, height * 0.745), "BRAND GUIDELINES",
            font(F_REG, width * 0.018), brand.paper, width * 0.012, centred=True)
    draw.text((width / 2, height * 0.925), "Volume 01",
              font=font(F_REG, width * 0.017), fill=brand.support, anchor="ma")
    image.save(path, "WEBP", quality=88, method=6)


# --------------------------------------------------------------- the spreads

def heading(draw, margin, height, width, brand, ink, text):
    draw.text((margin, height * 0.15), text, font=font(brand.display, width * 0.052), fill=ink)


def p_contents(draw, margin, ink, width, height, brand, titles):
    heading(draw, margin, height, width, brand, ink, "Contents")
    y = height * 0.33
    step = (height * 0.82 - y) / max(len(titles), 1)
    for i, title in enumerate(titles):
        draw.text((margin, y), "%02d" % (i + 3), font=font(F_MONO, width * 0.015), fill=brand.accent)
        draw.text((margin + width * 0.07, y), title, font=font(F_REG, width * 0.018), fill=ink)
        draw.line([margin, y + step * 0.72, width - margin, y + step * 0.72],
                  fill=brand.support, width=1)
        y += step


def p_logo(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "The logo")
    draw.text((margin, height * 0.31),
              "Built on a square grid. The mark and the\nwordmark hold the same optical weight.",
              font=font(F_REG, width * 0.0155), fill=brand.support, spacing=width * 0.009)
    gx, gy = width * 0.54, height * 0.2
    size = min(width * 0.3, height * 0.55)
    for i in range(7):
        offset = size / 6 * i
        draw.line([gx + offset, gy, gx + offset, gy + size], fill=brand.support, width=1)
        draw.line([gx, gy + offset, gx + size, gy + offset], fill=brand.support, width=1)
    mark(draw, gx + size * 0.17, gy + size * 0.17, size * 0.45, brand, brand.accent)
    tracked(draw, (margin, height * 0.63), brand.name,
            font(brand.display, width * 0.046), ink, width * 0.006)


def p_clearspace(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Clear space")
    draw.text((margin, height * 0.31),
              "Keep a margin of one mark-height on every\nside. Nothing enters that margin.",
              font=font(F_REG, width * 0.0155), fill=brand.support, spacing=width * 0.009)
    size = min(width * 0.15, height * 0.26)
    bx, by = width * 0.62, height * 0.33
    draw.rectangle([bx - size, by - size, bx + size * 2, by + size * 2],
                   outline=brand.support, width=2)
    mark(draw, bx, by, size, brand, brand.accent)
    draw.line([bx - size, by - size * 1.3, bx, by - size * 1.3], fill=brand.accent, width=3)
    draw.line([bx + size, by - size * 1.3, bx + size * 2, by - size * 1.3], fill=brand.accent, width=3)
    draw.text((bx + size * 0.5, by + size * 2.3), "X = mark height",
              font=font(F_MONO, width * 0.013), fill=brand.support, anchor="ma")


def p_variations(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Variations")
    cells = [("Primary", brand.paper, brand.accent), ("Reversed", brand.ink, brand.paper),
             ("Mono", brand.paper, brand.ink), ("Accent", brand.accent, brand.paper)]
    gap = width * 0.025
    cell_w = (width - margin * 2 - gap * 3) / 4
    cell_h = height * 0.34
    for i, (name, background, colour) in enumerate(cells):
        x = margin + i * (cell_w + gap)
        y = height * 0.35
        draw.rectangle([x, y, x + cell_w, y + cell_h], fill=background,
                       outline=brand.support, width=1)
        size = min(cell_w, cell_h) * 0.38
        mark(draw, x + cell_w / 2 - size / 2, y + cell_h * 0.26, size, brand, colour)
        draw.text((x, y + cell_h + height * 0.055), name,
                  font=font(F_REG, width * 0.0135), fill=ink)


def p_misuse(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Misuse")
    cells = [("Do not stretch", "stretch", brand.accent),
             ("Do not rotate", "rotate", brand.accent),
             ("Do not recolour", None, "#C2185B"),
             ("Do not outline", None, brand.swatches[3][1])]
    gap = width * 0.025
    cell_w = (width - margin * 2 - gap * 3) / 4
    cell_h = height * 0.32
    for i, (label, transform, colour) in enumerate(cells):
        x, y = margin + i * (cell_w + gap), height * 0.35
        draw.rectangle([x, y, x + cell_w, y + cell_h], outline=brand.support, width=1)
        size = min(cell_w, cell_h) * 0.4
        mark(draw, x + cell_w / 2 - size / 2, y + cell_h / 2 - size / 2, size, brand, colour,
             transform=transform)
        draw.line([x, y, x + cell_w, y + cell_h], fill="#C8503C", width=2)
        draw.line([x + cell_w, y, x, y + cell_h], fill="#C8503C", width=2)
        draw.text((x, y + cell_h + height * 0.055), label,
                  font=font(F_REG, width * 0.0125), fill=ink)


def p_palette(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Colour")
    count = len(brand.swatches)
    gap = width * 0.015
    cell_w = (width - margin * 2 - gap * (count - 1)) / count
    y, cell_h = height * 0.33, height * 0.35
    for i, (name, value) in enumerate(brand.swatches):
        x = margin + i * (cell_w + gap)
        draw.rectangle([x, y, x + cell_w, y + cell_h], fill=value, outline=brand.support, width=1)
        draw.text((x, y + cell_h + height * 0.055), name,
                  font=font(F_BOLD, width * 0.0135), fill=ink)
        draw.text((x, y + cell_h + height * 0.115), value.upper(),
                  font=font(F_MONO, width * 0.0115), fill=brand.support)


def p_proportion(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Colour in use")
    parts = [(0.52, brand.paper), (0.26, brand.swatches[0][1]),
             (0.14, brand.accent), (0.08, brand.swatches[2][1])]
    x, y, bar_h = margin, height * 0.38, height * 0.3
    total = width - margin * 2
    for fraction, colour in parts:
        draw.rectangle([x, y, x + total * fraction, y + bar_h], fill=colour,
                       outline=brand.support, width=1)
        draw.text((x + width * 0.012, y + bar_h + height * 0.07), "%d%%" % round(fraction * 100),
                  font=font(F_MONO, width * 0.014), fill=ink)
        x += total * fraction


def p_type(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Typography")
    draw.text((margin, height * 0.28), "Aa", font=font(brand.display, width * 0.16), fill=brand.accent)
    rows = [("Display", brand.display, 0.032), ("Heading", F_BOLD, 0.024),
            ("Body", F_REG, 0.018), ("Caption", F_REG, 0.0135)]
    x = width * 0.42
    for i, (label, path, size) in enumerate(rows):
        y = height * 0.3 + i * height * 0.145
        draw.text((x, y), "ABCDEFGHIJK abcdefghijk 0123"[:28 - i * 2],
                  font=font(path, width * size), fill=ink)
        draw.text((x, y + height * 0.082), label, font=font(F_MONO, width * 0.0115),
                  fill=brand.support)


def p_scale(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Type scale")
    rows = [("72 / 68", 0.048), ("48 / 52", 0.034), ("32 / 40", 0.025),
            ("20 / 30", 0.017), ("14 / 22", 0.0125)]
    y = height * 0.32
    for spec, size in rows:
        draw.text((margin, y), "The quick brown fox", font=font(F_BOLD, width * size), fill=ink)
        draw.text((width - margin, y), spec, font=font(F_MONO, width * 0.0115),
                  fill=brand.support, anchor="ra")
        y += height * 0.115
        draw.line([margin, y - height * 0.028, width - margin, y - height * 0.028],
                  fill=brand.support, width=1)


def p_pattern(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Pattern")
    x0, y0, x1, y1 = margin, height * 0.33, width - margin, height * 0.84
    draw.rectangle([x0, y0, x1, y1], fill=brand.swatches[0][1])
    step = (x1 - x0) / 14
    for col in range(14):
        for row in range(int((y1 - y0) / step) + 1):
            cx, cy = x0 + col * step, y0 + row * step
            if cy + step > y1:
                continue
            phase = (col + row) % 3
            if phase == 2:
                continue
            colour = brand.accent if phase == 0 else brand.swatches[2][1]
            start = 180 if (col + row) % 2 else 0
            draw.pieslice([cx, cy, cx + step, cy + step], start, start + 90, fill=colour)


def p_stationery(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Stationery")
    letter_w = width * 0.26
    letter_h = min(letter_w * 1.414, height * 0.52)
    lx, ly = margin, height * 0.33
    draw.rectangle([lx, ly, lx + letter_w, ly + letter_h], fill=brand.paper, outline=brand.support)
    mark(draw, lx + letter_w * 0.1, ly + letter_h * 0.08, letter_w * 0.13, brand, brand.accent)
    for i in range(7):
        ry = ly + letter_h * 0.38 + i * letter_h * 0.06
        draw.line([lx + letter_w * 0.1, ry, lx + letter_w * 0.78, ry], fill=brand.support, width=1)

    card_w = width * 0.24
    card_h = card_w * 0.57
    cx, cy = width * 0.46, height * 0.35
    draw.rectangle([cx, cy, cx + card_w, cy + card_h], fill=brand.ink)
    mark(draw, cx + card_w * 0.08, cy + card_h * 0.2, card_h * 0.38, brand, brand.paper)
    bx, by = cx + width * 0.02, cy + card_h * 1.2
    draw.rectangle([bx, by, bx + card_w, by + card_h], fill=brand.paper, outline=brand.support)
    tracked(draw, (bx + card_w * 0.08, by + card_h * 0.3), brand.name,
            font(brand.display, width * 0.021), brand.ink, width * 0.004)
    draw.text((bx + card_w * 0.08, by + card_h * 0.62), brand.tag,
              font=font(F_REG, width * 0.0105), fill=brand.support)


def p_applications(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Applications")
    gap = width * 0.035
    left_w = (width - margin * 2 - gap) * 0.52
    y, box_h = height * 0.33, height * 0.5
    draw.rectangle([margin, y, margin + left_w, y + box_h], fill=brand.accent)
    size = box_h * 0.28
    mark(draw, margin + left_w * 0.12, y + box_h * 0.2, size, brand, brand.paper)
    tracked(draw, (margin + left_w * 0.12, y + box_h * 0.68), brand.name,
            font(brand.display, width * 0.024), brand.paper, width * 0.005)

    rx = margin + left_w + gap
    rw = width - margin - rx
    draw.rectangle([rx, y, rx + rw, y + box_h * 0.46], fill=brand.swatches[3][1])
    mark(draw, rx + rw * 0.44, y + box_h * 0.1, box_h * 0.24, brand, brand.ink)
    draw.rectangle([rx, y + box_h * 0.54, rx + rw, y + box_h], fill=brand.ink)
    tracked(draw, (rx + rw * 0.08, y + box_h * 0.72), brand.name,
            font(brand.display, width * 0.02), brand.paper, width * 0.005)


def p_ui(draw, margin, ink, width, height, brand):
    heading(draw, margin, height, width, brand, ink, "Product")
    x, y = margin, height * 0.32
    panel_w, panel_h = width - margin * 2, height * 0.53
    draw.rectangle([x, y, x + panel_w, y + panel_h], fill=brand.swatches[4][1],
                   outline=brand.support)
    draw.rectangle([x, y, x + panel_w * 0.2, y + panel_h], fill=brand.ink)
    mark(draw, x + panel_w * 0.05, y + panel_h * 0.08, panel_h * 0.13, brand, brand.paper)
    for i in range(5):
        ry = y + panel_h * 0.34 + i * panel_h * 0.11
        draw.rectangle([x + panel_w * 0.05, ry, x + panel_w * 0.15, ry + panel_h * 0.04],
                       fill=brand.accent if i == 0 else brand.support)
    for i in range(3):
        cx = x + panel_w * 0.25 + i * panel_w * 0.24
        draw.rectangle([cx, y + panel_h * 0.1, cx + panel_w * 0.2, y + panel_h * 0.4],
                       fill=brand.paper, outline=brand.support)
        draw.rectangle([cx + panel_w * 0.02, y + panel_h * 0.16,
                        cx + panel_w * 0.09, y + panel_h * 0.2], fill=brand.accent)
        draw.rectangle([cx + panel_w * 0.02, y + panel_h * 0.26,
                        cx + panel_w * 0.14, y + panel_h * 0.29], fill=brand.support)
    bars = [0.5, 0.78, 0.36, 0.92, 0.64, 0.48, 0.84]
    for i, value in enumerate(bars):
        bx = x + panel_w * 0.26 + i * panel_w * 0.085
        draw.rectangle([bx, y + panel_h * 0.88 - panel_h * 0.33 * value,
                        bx + panel_w * 0.05, y + panel_h * 0.88],
                       fill=brand.accent if i % 2 else brand.swatches[2][1])


SPREADS = {
    "contents": p_contents, "logo": p_logo, "clearspace": p_clearspace,
    "variations": p_variations, "misuse": p_misuse, "palette": p_palette,
    "proportion": p_proportion, "type": p_type, "scale": p_scale,
    "pattern": p_pattern, "stationery": p_stationery,
    "applications": p_applications, "ui": p_ui,
}

DARK = {"proportion", "pattern"}

BOOKS = {
    "branding-landscape-company": (VERDE, 1372, 1771, [
        (1100, 619, "Contents", "contents", "the contents page"),
        (1100, 575, "Logo", "logo", "the logo on its construction grid"),
        (1100, 575, "Clear space", "clearspace", "the clear space rule around the logo"),
        (1100, 575, "Variations", "variations", "the four approved logo variations"),
        (1100, 575, "Misuse", "misuse", "the logo misuses that are not allowed"),
        (1100, 575, "Colour", "palette", "the six colour palette with its hex values"),
        (1100, 619, "Colour in use", "proportion", "how much of each colour a layout should carry"),
        (1100, 575, "Typography", "type", "the typefaces and the role each one plays"),
        (1100, 575, "Type scale", "scale", "the type scale from display down to caption"),
        (1100, 575, "Pattern", "pattern", "the pattern built from the logo shape"),
        (1100, 575, "Stationery", "stationery", "the letterhead and the business cards"),
        (1086, 619, "Applications", "applications", "signage, uniform and vehicle applications"),
    ]),
    "branding-spend-platform": (QUANTA, 1372, 1771, [
        (960, 540, "Logo", "logo", "the logo on its construction grid"),
        (960, 540, "Colour", "palette", "the six colour palette with its hex values"),
        (960, 540, "Typography", "type", "the typefaces and the role each one plays"),
        (960, 540, "Product", "ui", "the identity applied to the product interface"),
        (960, 540, "Stationery", "stationery", "the letterhead and the business cards"),
    ]),
}


def build():
    manifest = {}
    for slug, (brand, cover_w, cover_h, pages) in BOOKS.items():
        folder = os.path.join(OUT_ROOT, slug)
        os.makedirs(folder, exist_ok=True)
        for stale in os.listdir(folder):
            os.remove(os.path.join(folder, stale))

        cover(os.path.join(folder, "cover.webp"), cover_w, cover_h, brand)
        titles = [page[2] for page in pages]
        gallery = []

        for index, (width, height, label, kind, alt) in enumerate(pages):
            number = index + 2
            image, draw, margin, ink = shell(width, height, brand, label, number, kind in DARK)
            if kind == "contents":
                p_contents(draw, margin, ink, width, height, brand, titles[1:])
            else:
                SPREADS[kind](draw, margin, ink, width, height, brand)
            name = "brand-book-%02d.webp" % number
            image.save(os.path.join(folder, name), "WEBP", quality=88, method=6)
            gallery.append({
                "src": "/work/%s/%s" % (slug, name),
                "alt": "%s brand book, %s" % (brand.name, alt),
                "width": width, "height": height,
            })

        manifest[slug] = {
            "brand": brand.name,
            "tagline": brand.tag,
            "cover": {"src": "/work/%s/cover.webp" % slug, "width": cover_w, "height": cover_h,
                      "alt": "The cover of the %s brand book" % brand.name},
            "gallery": gallery,
        }
        size = sum(os.path.getsize(os.path.join(folder, f)) for f in os.listdir(folder))
        print("%-32s %2d files %6.0f KB" % (slug, len(gallery) + 1, size / 1024))

    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "brandbook.json")
    json.dump(manifest, open(path, "w"), indent=1)
    print("manifest ->", path)


if __name__ == "__main__":
    build()
