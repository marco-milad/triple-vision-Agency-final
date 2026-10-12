"""Re-cut the web case study screenshots that were squeezed into slivers.

The originals are full-page captures - some of them 2880x38662. The import
resized the long edge to 1600px, which turned a tall page into a 119px-wide
sliver: rendered in a 1024px column that is nearly 14,000px tall, and in the
phone grid it stretches its row to several thousand pixels.

A full-page capture is only readable up to a point. Past it, this takes the
first screen instead - the same thing the Ojos source already does with its
`-fold` files - so a desktop page arrives at 16:10 and a phone page at the
shape of a phone.

Run from the project root:
    python scripts/refold-web-screenshots.py "G:/iti projects/web projects/Portfolio 2"
"""
import io
import os
import re
import sys

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

# past these, a capture stops being readable and is cut to its first screen
DESKTOP_CAP = 2.6
PHONE_CAP = 2.2

DESKTOP_FOLD = 0.625        # 16:10
PHONE_FOLD = 2.164          # 1170x2532, the shape the source's own folds use
DESKTOP_WIDTH = 1600
PHONE_WIDTH = 760

# our project slug -> the folder it was imported from
PROJECTS = {
    "mm-bags": "mm-bags",
    "gold-jewelry-erp": "gold-erp",
    "ray-lab": "Ray Lab",
    "ojos-studio": "Ojos-studio",
}


def find_original(assets, project, stem, phone):
    """
    The source capture for one of our files.

    Our phone shots carry an `m-` prefix the source does not always use, so both
    spellings are tried. A phone file only ever matches inside `mobile`, because
    several projects hold a desktop and a phone capture of the same page under
    the same name.
    """
    base = os.path.join(assets, "Portfolio-assets", project)
    if not os.path.isdir(base):
        return None

    names = [stem, stem[2:]] if stem.startswith("m-") else [stem]
    folders = []
    for folder in sorted(os.listdir(base)):
        d = os.path.join(base, folder)
        if not os.path.isdir(d):
            continue
        is_mobile = folder.lower() == "mobile"
        if phone and not is_mobile and folder.lower() != "web":
            continue
        if not phone and is_mobile:
            continue
        folders.append(d)

    # a curated fold already in the source wins over anything we would cut
    for suffixes in (("-fold",), ("", "-full")):
        for d in folders:
            for name in os.listdir(d):
                root, ext = os.path.splitext(name)
                if ext.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
                    continue
                if any(root.lower() == n + s for n in names for s in suffixes):
                    return os.path.join(d, name)
    return None


def refold(src_path, phone):
    image = Image.open(src_path).convert("RGB")
    target = PHONE_FOLD if phone else DESKTOP_FOLD
    want_h = int(image.width * target)
    if image.height > want_h:
        image = image.crop((0, 0, image.width, want_h))
    width = PHONE_WIDTH if phone else DESKTOP_WIDTH
    if image.width != width:
        image = image.resize((width, max(round(image.height * width / image.width), 1)),
                             Image.LANCZOS)
    return image


def run(assets):
    source = io.open("src/data/portfolio.ts", encoding="utf-8").read()
    referenced = sorted(set(re.findall(r"(?:src|cover): '(/work/[^']+)'", source)))

    changes, skipped = [], []
    for ref in referenced:
        parts = ref.strip("/").split("/")
        if len(parts) != 3:
            continue
        _, slug, filename = parts
        if slug not in PROJECTS:
            continue

        path = "public" + ref
        if not os.path.exists(path):
            continue
        w, h = Image.open(path).size
        stem = os.path.splitext(filename)[0].lower()
        phone = stem.startswith("m-")
        cap = PHONE_CAP if phone else DESKTOP_CAP
        if h / w <= cap:
            continue

        original = find_original(assets, PROJECTS[slug], stem, phone)
        if not original:
            skipped.append((ref, w, h))
            continue

        out = refold(original, phone)
        out.save(path, "WEBP", quality=84, method=6)
        changes.append((ref, (w, h), out.size))

    for ref, before, after in changes:
        print("  %-46s %-12s -> %-12s" % (ref[-46:], "%dx%d" % before, "%dx%d" % after))
    print("re-cut %d screenshot(s)" % len(changes))
    for ref, w, h in skipped:
        print("  no original found for %s (%dx%d)" % (ref, w, h))
    return changes


if __name__ == "__main__":
    run(sys.argv[1] if len(sys.argv) > 1 else "../Portfolio 2")
