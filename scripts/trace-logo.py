"""Trace the logo bitmap into outlines, so the preloader can draw and then fill
the real letterforms instead of a hand-drawn approximation of them.

A monoline sketch has to be replaced by a different image to become the logo,
and that swap is what reads as cheap. An outline can be stroked first and filled
afterwards, so one shape completes itself.

Marching squares gives the contours, Douglas-Peucker thins them, and every
contour of one colour goes into a single path with fill-rule evenodd, which
makes the counters of P, R, O and the rest fall out for free.
"""
import io
import json
from PIL import Image

SOURCE = "real-logo.png"
ALPHA = 110          # ink vs background
EPSILON = 0.55        # how far a simplified point may stray, in source pixels.
                     # The intro strokes this outline before it fills it, and a
                     # stroke shows every corner a fill would hide, so it is cut
                     # finer than a fill alone would need.


def masks(path):
    image = Image.open(path).convert("RGBA")
    w, h = image.size
    px = image.load()
    white, orange = set(), set()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < ALPHA:
                continue
            if r > 170 and 90 < g < 205 and b < 100:
                orange.add((x, y))
            else:
                white.add((x, y))
    return (w, h), white, orange


def contours(points, size):
    """Every closed boundary of the filled region, walked square by square."""
    w, h = size
    inside = lambda x, y: (x, y) in points

    # edges of the boundary, as a directed graph, so each is walked once
    edges = {}
    for (x, y) in points:
        if not inside(x, y - 1):
            edges.setdefault((x, y), []).append((x + 1, y))          # top, ->
        if not inside(x + 1, y):
            edges.setdefault((x + 1, y), []).append((x + 1, y + 1))  # right, v
        if not inside(x, y + 1):
            edges.setdefault((x + 1, y + 1), []).append((x, y + 1))  # bottom, <-
        if not inside(x - 1, y):
            edges.setdefault((x, y + 1), []).append((x, y))          # left, ^

    loops = []
    while edges:
        start = next(iter(edges))
        loop, node = [start], start
        while True:
            nexts = edges.get(node)
            if not nexts:
                break
            nxt = nexts.pop()
            if not nexts:
                del edges[node]
            loop.append(nxt)
            node = nxt
            if node == start:
                break
        if len(loop) > 8:
            loops.append(loop)
    return loops


def simplify(points, epsilon):
    """Douglas-Peucker, iterative so a long contour cannot blow the stack."""
    if len(points) < 3:
        return points
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        first, last = stack.pop()
        if last <= first + 1:
            continue
        (x1, y1), (x2, y2) = points[first], points[last]
        dx, dy = x2 - x1, y2 - y1
        norm = (dx * dx + dy * dy) ** 0.5 or 1e-9
        worst, index = 0.0, first
        for i in range(first + 1, last):
            x, y = points[i]
            d = abs(dy * x - dx * y + x2 * y1 - y2 * x1) / norm
            if d > worst:
                worst, index = d, i
        if worst > epsilon:
            keep[index] = True
            stack.append((first, index))
            stack.append((index, last))
    return [p for p, k in zip(points, keep) if k]


def simplify_closed(loop, epsilon):
    """
    Douglas-Peucker needs two distinct ends, and a closed contour has one point
    at both. Cutting it at the point furthest from the start gives two open
    halves that can each be thinned and then rejoined.
    """
    if len(loop) < 4:
        return loop
    if loop[0] == loop[-1]:
        loop = loop[:-1]
    x0, y0 = loop[0]
    far = max(range(len(loop)), key=lambda i: (loop[i][0] - x0) ** 2 + (loop[i][1] - y0) ** 2)
    first = simplify(loop[:far + 1], epsilon)
    second = simplify(loop[far:] + [loop[0]], epsilon)
    return first[:-1] + second[:-1]


def to_path(loops, scale):
    out = []
    for loop in loops:
        pts = simplify_closed(loop, EPSILON)
        if len(pts) < 3:
            continue
        d = "M" + " L".join("%.1f,%.1f" % (x * scale, y * scale) for x, y in pts) + " Z"
        out.append(d)
    return " ".join(out)


def run():
    size, white, orange = masks(SOURCE)
    print("source %dx%d   white px %d   orange px %d" % (size[0], size[1], len(white), len(orange)))

    result = {}
    for name, pts in (("white", white), ("orange", orange)):
        loops = contours(pts, size)
        total_before = sum(len(l) for l in loops)
        d = to_path(loops, 1.0)
        total_after = d.count(",")
        print("  %-7s %3d contours   %6d points -> %5d" % (name, len(loops), total_before, total_after))
        result[name] = d

    json.dump(result, open("logo-paths.json", "w"))
    print("characters: white %d, orange %d" % (len(result["white"]), len(result["orange"])))


if __name__ == "__main__":
    run()
