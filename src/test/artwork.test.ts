import { describe, it, expect } from "vitest";
import { projects } from "@/data/portfolio";

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
