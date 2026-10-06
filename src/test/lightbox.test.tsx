import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ContactProvider } from "@/contexts/ContactContext";
import WorkDetail from "@/pages/WorkDetail";
import { projects } from "@/data/portfolio";

const renderWork = (slug: string) =>
  render(
    <HelmetProvider>
      <ContactProvider>
        <MemoryRouter initialEntries={[`/work/${slug}`]}>
          <Routes>
            <Route path="/work/:slug" element={<WorkDetail />} />
          </Routes>
        </MemoryRouter>
      </ContactProvider>
    </HelmetProvider>,
  );

const dialog = () => screen.getByRole("dialog");

describe("Case study viewer", () => {
  const stacked = projects.find((p) => p.caseStudyStyle && p.gallery.length > 2)!;

  it("opens on the piece that was clicked", () => {
    renderWork(stacked.slug);
    fireEvent.click(screen.getByRole("button", { name: `Open ${stacked.gallery[0].alt}` }));

    expect(within(dialog()).getByRole("img")).toHaveAttribute("src", stacked.gallery[0].src);
  });

  it("steps forward and back through the set", () => {
    renderWork(stacked.slug);
    fireEvent.click(screen.getByRole("button", { name: `Open ${stacked.gallery[0].alt}` }));

    fireEvent.click(within(dialog()).getByRole("button", { name: /next image/i }));
    expect(within(dialog()).getByRole("img")).toHaveAttribute("src", stacked.gallery[1].src);

    fireEvent.click(within(dialog()).getByRole("button", { name: /previous image/i }));
    expect(within(dialog()).getByRole("img")).toHaveAttribute("src", stacked.gallery[0].src);
  });

  it("wraps around rather than dead-ending on the last piece", () => {
    renderWork(stacked.slug);
    // The cover is the first thing the viewer holds, so stepping back from it
    // should land on the last piece.
    fireEvent.click(screen.getByRole("button", { name: `Open ${stacked.coverAlt}` }));
    fireEvent.click(within(dialog()).getByRole("button", { name: /previous image/i }));

    const last = stacked.gallery[stacked.gallery.length - 1];
    expect(within(dialog()).getByRole("img")).toHaveAttribute("src", last.src);
  });

  it("steps with the arrow keys", () => {
    renderWork(stacked.slug);
    fireEvent.click(screen.getByRole("button", { name: `Open ${stacked.gallery[0].alt}` }));

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(within(dialog()).getByRole("img")).toHaveAttribute("src", stacked.gallery[1].src);

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(within(dialog()).getByRole("img")).toHaveAttribute("src", stacked.gallery[0].src);
  });

  it("says where you are in the set", () => {
    renderWork(stacked.slug);
    fireEvent.click(screen.getByRole("button", { name: `Open ${stacked.gallery[0].alt}` }));

    // The cover is index 0, so the first gallery piece is the second of the run.
    expect(within(dialog()).getByText(`2 / ${stacked.gallery.length + 1}`)).toBeInTheDocument();
  });

  it("opens a figure that sits inside the writing", () => {
    // These are deliberately kept out of `gallery`, so a viewer built from the
    // gallery alone would leave them unable to open.
    const written = projects.find((p) =>
      p.sections?.some((s) => s.figure || s.items?.some((i) => i.figure)),
    )!;
    const figure =
      written.sections!.flatMap((s) => [
        ...(s.items ?? []).flatMap((i) => (i.figure ? [i.figure] : [])),
        ...(s.figure ? [s.figure] : []),
      ])[0];

    renderWork(written.slug);
    fireEvent.click(screen.getByRole("button", { name: `Open ${figure.alt}` }));

    expect(within(dialog()).getByRole("img")).toHaveAttribute("src", figure.src);
  });
});
