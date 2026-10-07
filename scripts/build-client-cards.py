"""Turn each client's logo into the card image used in the portfolio grids.

The logos arrive as 1200x1200 squares on white. The grid cards are 16/10 and
crop with object-cover, which would cut the top and bottom off a square mark, so
each logo is trimmed of its surrounding white, centred on a card-shaped tile and
given room to breathe. The result already matches the card, so nothing is cut.

Source logos live outside the repo; point LOGO_DIR at wherever they were saved.

Run from the project root:  python scripts/build-client-cards.py <logo-dir>
"""
import os
import sys

from PIL import Image, ImageChops

CARD_W, CARD_H = 1600, 1000
PADDING = 0.14          # of the shorter side, left clear around the mark
GROUND = (255, 255, 255)

# the folder name the client used, against our project slug
LOGOS = {
    "Abhathk": "abhathk",
    "Cairo Scan": "cairo-scan",
    "Dr.Bassant": "neurology-clinic",
    "Dr.Fady Fawzy": "dr-fady-fawzy",
    "Fast Clincs": "fast-clinics",
    "Fouda": "mohamed-fouda-law",
    "Nourish": "nourish-cosmetics",
    "One Stop": "one-stop-gresco",
    "Praxis": "praxis",
    "Sky Line": "sky-line-logistics",
    "Solve": "solve-clinic",
    "TBB Tires": "tbb-tires",
    "TBG": "tbg-train-brain-to-gain",
    "Techno Scan": "technoscan",
}


def trim(image):
    """Drop the white margin the logo was exported with."""
    ground = Image.new("RGB", image.size, GROUND)
    diff = ImageChops.difference(image, ground).convert("L")
    box = diff.point(lambda v: 255 if v > 12 else 0).getbbox()
    return image.crop(box) if box else image


def card(path):
    logo = trim(Image.open(path).convert("RGB"))
    inner_w = CARD_W * (1 - PADDING * 2)
    inner_h = CARD_H * (1 - PADDING * 2)
    scale = min(inner_w / logo.width, inner_h / logo.height)
    logo = logo.resize((max(int(logo.width * scale), 1), max(int(logo.height * scale), 1)),
                       Image.LANCZOS)

    tile = Image.new("RGB", (CARD_W, CARD_H), GROUND)
    tile.paste(logo, ((CARD_W - logo.width) // 2, (CARD_H - logo.height) // 2))
    return tile


def build(logo_dir):
    made = 0
    for folder, slug in sorted(LOGOS.items()):
        source = None
        directory = os.path.join(logo_dir, folder)
        if os.path.isdir(directory):
            files = [f for f in os.listdir(directory) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
            source = os.path.join(directory, files[0]) if files else None
        else:
            flat = folder.replace(".", "").replace(" ", "-") + ".jpg"
            if os.path.exists(os.path.join(logo_dir, flat)):
                source = os.path.join(logo_dir, flat)

        if not source:
            print("  missing logo for %s" % folder)
            continue

        out_dir = os.path.join("public/work", slug)
        os.makedirs(out_dir, exist_ok=True)
        out = os.path.join(out_dir, "card.webp")
        card(source).save(out, "WEBP", quality=88, method=6)
        print("  %-26s -> %s  %.0f KB" % (folder, out, os.path.getsize(out) / 1024))
        made += 1
    print("%d card images" % made)


if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else "logos")
