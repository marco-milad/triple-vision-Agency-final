import { describe, it, expect } from "vitest";
import { closeSync, existsSync, openSync, readSync } from "node:fs";
import path from "node:path";
import { projects } from "@/data/portfolio";

const PUBLIC = path.resolve(process.cwd(), "public");

/**
 * Read a WebP's real size out of its header.
 *
 * Every piece of artwork on this site is WebP, and the declared size is what
 * the page reserves space with, so it has to come from the file rather than
 * from whoever typed the entry.
 */
const webpSize = (file: string): { width: number; height: number } | null => {
  // Only the first 30 bytes carry the size. Reading each whole file instead
  // meant slurping tens of megabytes to look at a header, which pushed this
  // past its timeout once the real artwork landed.
  const buf = Buffer.alloc(30);
  const fd = openSync(file, "r");
  let read = 0;
  try {
    read = readSync(fd, buf, 0, 30, 0);
  } finally {
    closeSync(fd);
  }
  if (read < 30 || buf.toString("ascii", 0, 4) !== "RIFF") return null;
  switch (buf.toString("ascii", 12, 16)) {
    case "VP8 ": // lossy
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    case "VP8L": {
      // lossless - the two 14-bit dimensions are packed into one word
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    case "VP8X": // extended - 24-bit canvas size
      return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
    default:
      return null;
  }
};

/**
 * The case study pages render artwork at its own aspect ratio, which is right
 * for a screenshot but means a badly cut one takes the page with it. A 119x1600
 * sliver — a full-page capture whose long edge had been resized to 1600 — came
 * out roughly 13,700px tall in the reading column, and in the phone grid it
 * stretched its whole row.
 */
describe("Case study artwork", () => {
  const everyImage = projects.flatMap((project) => [
    ...(project.cover && project.coverWidth && project.coverHeight
      ? [{ slug: project.slug, src: project.cover, width: project.coverWidth, height: project.coverHeight }]
      : []),
    ...project.gallery.map((image) => ({ slug: project.slug, ...image })),
    ...(project.sections ?? []).flatMap((section) => [
      ...(section.items ?? []).flatMap((item) => (item.figure ? [{ slug: project.slug, ...item.figure }] : [])),
      ...(section.figure ? [{ slug: project.slug, ...section.figure }] : []),
    ]),
  ]);

  it("has artwork to check", () => {
    expect(everyImage.length).toBeGreaterThan(100);
  });

  it("declares a size for every image", () => {
    for (const image of everyImage) {
      expect(image.width, `${image.slug} ${image.src}`).toBeTruthy();
      expect(image.height, `${image.slug} ${image.src}`).toBeTruthy();
    }
  });

  it("holds every image to a shape a page can carry", () => {
    const tooTall = everyImage.filter((image) => image.height! / image.width! > 3);
    expect(
      tooTall.map((i) => `${i.src} is ${i.width}x${i.height}`),
      "a screenshot more than 3x its width is a sliver, not a screenshot",
    ).toEqual([]);
  });
});

/**
 * A written case study that keeps its screenshots in a block at the end reads as
 * prose with pictures parked after it. Every one that carries writing has to put
 * at least some of its artwork beside the writing it belongs to.
 */
describe("Written case studies", () => {
  const written = projects.filter((project) => project.sections?.length);

  it("has written case studies to check", () => {
    expect(written.length).toBeGreaterThan(0);
  });

  it("puts artwork beside the writing, not only after it", () => {
    const prosey = written
      .filter((project) => {
        const figures = project.sections!.flatMap((section) => [
          ...(section.items ?? []).filter((item) => item.figure),
          ...(section.figure ? [section.figure] : []),
        ]);
        return figures.length === 0;
      })
      .map((project) => project.slug);

    expect(prosey, "these read as paragraphs with the pictures at the end").toEqual([]);
  });

  it("gives every live project a link to it", () => {
    for (const project of projects.filter((p) => p.services.includes("web-development"))) {
      expect(project.liveUrl, `${project.slug}`).toMatch(/^https:\/\//);
    }
  });
});

/**
 * The data and the files on disk are edited separately — real artwork replaces
 * stand-ins, pieces get recut, a board is dropped. Nothing above reads a file,
 * so until now a path that pointed at nothing, or a size that disagreed with
 * the file it described, shipped silently: the first as a hole in the page, the
 * second as a reserved box of the wrong shape that the artwork then jumps out of.
 */
describe("Artwork on disk", () => {
  /** Every /work path the data mentions, however it is mentioned. */
  const referenced = [
    ...new Set(
      [
        ...projects.flatMap((p) => [p.cover, p.cardImage, ...p.gallery.map((g) => g.src)]),
        ...projects.flatMap((p) =>
          (p.sections ?? []).flatMap((s) => [
            ...(s.items ?? []).map((i) => i.figure?.src),
            s.figure?.src,
          ]),
        ),
      ].filter((src): src is string => typeof src === "string" && src.startsWith("/work/")),
    ),
  ];

  /** Every image that states a size, with the size it states. */
  const sized = projects.flatMap((project) => [
    ...(project.cover && project.coverWidth && project.coverHeight
      ? [
          {
            slug: project.slug,
            src: project.cover,
            width: project.coverWidth,
            height: project.coverHeight,
          },
        ]
      : []),
    ...project.gallery.map((image) => ({ slug: project.slug, ...image })),
  ]);

  /**
   * Everything the two checks below need to know about one file.
   *
   * Read once, here, rather than inside the tests. The tests used to walk the
   * same artwork twice over, and on a mechanical disk the first walk costs
   * about five seconds cold against a five-second budget for a test body —
   * close enough that the suite went red at random. A describe body runs while
   * the file is being collected, not while a test is being timed, so the disk
   * can take as long as it takes.
   *
   * This is built once and only ever read, so neither test can affect what the
   * other sees, and they still pass in any order or on their own.
   */
  type Found = { exists: boolean; size: ReturnType<typeof webpSize> };

  const onDisk: ReadonlyMap<string, Found> = new Map(
    [...new Set([...referenced, ...sized.map((image) => image.src)])].map(
      (src): [string, Found] => {
        const file = path.join(PUBLIC, src);
        if (!existsSync(file)) return [src, { exists: false, size: null }];
        return [src, { exists: true, size: webpSize(file) }];
      },
    ),
  );

  it("has artwork to check", () => {
    expect(referenced.length).toBeGreaterThan(100);
  });

  it("has the file every entry points at", () => {
    // Every path in both lists was probed above, so the lookup always lands.
    const missing = referenced.filter((src) => !onDisk.get(src)!.exists);
    expect(missing, "these paths render as a broken image").toEqual([]);
  });

  it("describes every image with the size it actually is", () => {
    const wrong: string[] = [];
    for (const image of sized) {
      const found = onDisk.get(image.src)!;
      if (!found.exists) continue; // the test above owns that failure
      const real = found.size;
      if (!real) continue;
      if (real.width !== image.width || real.height !== image.height) {
        wrong.push(
          `${image.src} is ${real.width}x${real.height}, declared ${image.width}x${image.height}`,
        );
      }
    }
    expect(wrong, "the page reserves space from the declared size").toEqual([]);
  });
});
