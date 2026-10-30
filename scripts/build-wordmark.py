"""Emit the wordmark as two movable parts, read straight from the logo file.

The intro and the header want different arrangements of the same mark. The logo
file sets "Agency" small and tucked under the right end of VISION, which is
right in a header but reads as a label hanging off the mark when it is alone in
the middle of a screen; there it wants to be a lockup, centred under the words.

So both parts stay in the logo's own coordinates and the second line carries a
transform that puts it in the lockup position. Animating that transform away
returns the mark to exactly the artwork the header shows, which is what lets the
intro dock into the header instead of simply disappearing.

This reads src/assets/logo.svg - the real vector artwork. It used to read a
bitmap trace of the same mark, which meant the intro was writing a staircase of
one-unit steps rather than the letterforms; at any size above a header logo the
difference shows. Every curve in here is the designer's own.

Run from the project root:
    python scripts/build-wordmark.py
"""
import io
import re
import xml.etree.ElementTree as ET

SVG = "src/assets/logo.svg"
OUT = "src/components/logoPaths.ts"
NS = "{http://www.w3.org/2000/svg}"

#: Below this y, a shape belongs to "Agency" rather than to TRIPLE VISION.
BAND_SPLIT = 28.0
#: Brings the second line's cap height to about half the main line's.
AGENCY_SCALE = 1.45
#: From the baseline of line one to the cap of line two, in the logo's units.
LINE_GAP = 12.2
#: The pen the intro writes with, against the weight of the mark's own rules.
#: Thinner than the thinnest line in the artwork, so the outline reads as a pen
#: travelling over the letter rather than as a second, heavier mark.
INK_STROKE_RATIO = 0.28

NUM = re.compile(r"[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?")
CMD = re.compile(r"([MmZzLlHhVvCcSsQqTtAa])")
ARGS = {"M": 2, "L": 2, "H": 1, "V": 1, "C": 6, "S": 4, "Q": 4, "T": 2, "A": 7, "Z": 0}


def tokens(d):
    """(command, args) in order, with repeated argument groups split out."""
    parts = [p for p in CMD.split(d) if p.strip()]
    out, i = [], 0
    while i < len(parts):
        cmd, i = parts[i], i + 1
        n = ARGS[cmd.upper()]
        if n == 0:
            out.append((cmd, []))
            continue
        nums = [float(x) for x in NUM.findall(parts[i])] if i < len(parts) else []
        i += 1
        for j in range(0, len(nums), n):
            group = nums[j:j + n]
            if len(group) < n:
                break
            # A repeated argument group after M is an implicit lineto.
            follow = cmd.upper() == "M" and j
            out.append(("l" if follow and cmd.islower() else "L" if follow else cmd, group))
    return out


def fmt(v):
    s = ("%.2f" % v).rstrip("0").rstrip(".")
    return "0" if s in ("", "-0") else s


def absolute(d):
    """The same path with absolute coordinates and no H/V/S/T shorthands.

    The site's own geometry checks read coordinates straight out of these
    strings, so a relative command or a shorthand would make a path's bounding
    box meaningless.
    """
    out = []
    x = y = sx = sy = 0.0
    prev_cmd, prev_ctrl = "", None

    def put(cmd, *pts):
        out.append(cmd + " " + " ".join("%s,%s" % (fmt(a), fmt(b)) for a, b in pts))

    for cmd, a in tokens(d):
        up, rel = cmd.upper(), cmd.islower()
        if up == "Z":
            out.append("Z")
            x, y, prev_ctrl = sx, sy, None
        elif up in ("M", "L"):
            x, y = (x + a[0], y + a[1]) if rel else (a[0], a[1])
            if up == "M":
                sx, sy = x, y
            put(up, (x, y))
            prev_ctrl = None
        elif up == "H":
            x = x + a[0] if rel else a[0]
            put("L", (x, y))
            prev_ctrl = None
        elif up == "V":
            y = y + a[0] if rel else a[0]
            put("L", (x, y))
            prev_ctrl = None
        elif up in ("C", "Q"):
            pts = [(a[i], a[i + 1]) for i in range(0, len(a), 2)]
            if rel:
                pts = [(x + px, y + py) for px, py in pts]
            put(up, *pts)
            prev_ctrl, (x, y) = pts[-2], pts[-1]
        elif up in ("S", "T"):
            pts = [(a[i], a[i + 1]) for i in range(0, len(a), 2)]
            if rel:
                pts = [(x + px, y + py) for px, py in pts]
            mirror = prev_cmd.upper() in ("CS" if up == "S" else "QT") and prev_ctrl
            first = (2 * x - prev_ctrl[0], 2 * y - prev_ctrl[1]) if mirror else (x, y)
            put("C" if up == "S" else "Q", first, *pts)
            prev_ctrl, (x, y) = (first if len(pts) == 1 else pts[0]), pts[-1]
        else:
            raise ValueError("unsupported path command %r in the logo" % cmd)
        prev_cmd = cmd
    return " ".join(out)


def box(d):
    """A path's bounds. Control points are included, so curves are enclosed."""
    pts = [(float(m.group(1)), float(m.group(2)))
           for m in re.finditer(r"(-?[\d.]+),(-?[\d.]+)", d)]
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    return min(xs), min(ys), max(xs), max(ys)


def bar(el):
    """A stroked rule, as the filled rectangle it draws.

    The three bars are <line> in the file. The intro writes its shapes by
    sweeping a stroke along them, which a line already drawn as a stroke cannot
    show, so each becomes the rectangle its stroke covers.
    """
    x1, y1, x2, y2 = (float(el.get(k) or 0) for k in ("x1", "y1", "x2", "y2"))
    half = float(el.get("stroke-width") or STROKE_WIDTH) / 2
    return "M %s,%s L %s,%s L %s,%s L %s,%s Z" % (
        fmt(x1), fmt(y1 - half), fmt(x2), fmt(y2 - half),
        fmt(x2), fmt(y2 + half), fmt(x1), fmt(y1 + half))


# ---- read ------------------------------------------------------------
source = io.open(SVG, encoding="utf-8").read()
root = ET.fromstring(source)
view_box = root.get("viewBox")

# The file carries its fills in a <style> block rather than on the elements.
styles = dict(re.findall(r"\.(cls-\d+)\s*\{([^}]*)\}", source))
gold = next(c for c, body in styles.items() if "#faad1b" in body.lower())
ruled = next(c for c, body in styles.items() if "stroke-width" in body)
STROKE_WIDTH = float(re.search(r"stroke-width:\s*([\d.]+)", styles[ruled]).group(1))

letters, bars, play = [], [], None
for el in root.iter():
    tag, cls = el.tag.replace(NS, ""), el.get("class")
    if tag == "path":
        d = absolute(el.get("d"))
        if cls == gold:
            play = d
        else:
            letters.append(d)
    elif tag == "line":
        bars.append(bar(el))

assert play, "no gold play mark found in the logo"
assert bars, "no ruled bars found in the logo"

# ---- arrange ---------------------------------------------------------
# The three bars read as one mark, not as three letters, so the intro writes
# them in a single stroke.
bars_glyph = " ".join(sorted(bars, key=lambda d: box(d)[1]))

main = sorted([bars_glyph] + [d for d in letters if box(d)[1] < BAND_SPLIT],
              key=lambda d: box(d)[0])
agency = sorted([d for d in letters if box(d)[1] >= BAND_SPLIT], key=lambda d: box(d)[0])

assert len(main) == 13, "expected the bars plus TRIPLE VISION, got %d" % len(main)
assert len(agency) >= 2, "expected Agency to come out as several shapes"

# Where the second line goes while the mark stands on its own: scaled up, and
# centred under the words rather than under the bars, which are a mark and sit
# out to the left of them.
words = [box(d) for d in main[1:]]
words_mid = (min(b[0] for b in words) + max(b[2] for b in words)) / 2
baseline = max(b[3] for b in words)

ax0, ay0, ax1, ay1 = box(" ".join(agency))
tx = words_mid - AGENCY_SCALE * (ax0 + ax1) / 2
ty = (baseline + LINE_GAP) - AGENCY_SCALE * ay0
overflow = AGENCY_SCALE * ay1 + ty

# ---- emit ------------------------------------------------------------
TEMPLATE = """/**
 * The wordmark, read from the logo file, as two parts that can be arranged two
 * ways.
 *
 * Generated by scripts/build-wordmark.py from src/assets/logo.svg. Both parts
 * are in the logo's own coordinates, so with no transform applied they are
 * exactly the artwork the header shows. `AGENCY_LOCKUP` moves the second line
 * to where the intro wants it - scaled up and centred under the words - and
 * animating that transform away reassembles the header's layout.
 *
 * These are the designer's own curves, not a trace of them, so the mark holds
 * its edge at any size the intro cares to draw it. Coordinates are absolute and
 * free of shorthand commands, because the geometry checks in the test suite
 * read them straight out of the strings.
 */

/** The logo's own box. The lockup overflows below it, so the svg must not clip. */
export const LOGO_VIEWBOX = '%(view_box)s';

/**
 * How far below that box the second line reaches while it is in lockup, in the
 * logo's own units.
 */
export const LOCKUP_OVERFLOW = %(overflow)s;

/** The stroke the intro writes with, in the logo's own units. */
export const INK_STROKE_WIDTH = %(stroke)s;

/**
 * TRIPLE VISION and the three bars, one entry per glyph so the intro can write
 * them one at a time. In reading order, the bars first.
 */
export const MAIN_GLYPHS = [
%(main)s
];

/** "Agency", in its header position, also one entry per letter. */
export const AGENCY_GLYPHS = [
%(agency)s
];

/** What puts the second line into the lockup the intro opens on. */
export const AGENCY_LOCKUP = 'translate(%(tx)s %(ty)s) scale(%(scale)s)';

/** The gold play mark inside the O, which lands once the writing is done. */
export const LOGO_ORANGE =
  '%(play)s';
"""


def lines(paths):
    return "\n".join("  '%s'," % d for d in paths)


io.open(OUT, "w", encoding="utf-8", newline="\n").write(TEMPLATE % {
    "view_box": view_box,
    "overflow": fmt(overflow),
    "stroke": fmt(STROKE_WIDTH * INK_STROKE_RATIO),
    "main": lines(main),
    "agency": lines(agency),
    "tx": fmt(tx),
    "ty": fmt(ty),
    "scale": AGENCY_SCALE,
    "play": play,
})

print("%s: %d main glyphs, %d in the second line" % (OUT, len(main), len(agency)))
print("  lockup  translate(%s %s) scale(%s)" % (fmt(tx), fmt(ty), AGENCY_SCALE))
print("  reaches %s, against a box %s tall" % (fmt(overflow), view_box.split()[-1]))
