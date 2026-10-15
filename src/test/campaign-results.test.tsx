import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ContactProvider } from "@/contexts/ContactContext";
import WorkDetail from "@/pages/WorkDetail";
import { projects } from "@/data/portfolio";
import { parseFigure, formatFigure } from "@/components/work/CountUp";

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

const withResults = projects.filter((p) => p.results);

describe("Campaign figures", () => {
  it("there are media buying case studies to check", () => {
    expect(withResults.length).toBeGreaterThan(0);
  });

  /**
   * These run over the data rather than the markup, so they will keep checking
   * the client's real numbers once those replace the stand-ins. A funnel that
   * grows, or a label that disagrees with its own value, is a typo nobody would
   * catch by eye — and on this page the numbers are the product.
   */
  it.each(withResults.map((p) => [p.slug, p] as const))(
    "%s narrows at every stage",
    (_slug, project) => {
      const stages = project.results!.funnel;
      expect(stages.length).toBeGreaterThan(2);
      for (let i = 1; i < stages.length; i += 1) {
        expect(
          stages[i].value,
          `${stages[i].stage} cannot be larger than ${stages[i - 1].stage}`,
        ).toBeLessThan(stages[i - 1].value);
      }
    },
  );

  it.each(withResults.map((p) => [p.slug, p] as const))(
    "%s labels every stage with its own number",
    (_slug, project) => {
      for (const stage of project.results!.funnel) {
        expect(Number(stage.display.replace(/[,\s]/g, "")), stage.stage).toBe(stage.value);
      }
    },
  );

  it.each(withResults.map((p) => [p.slug, p] as const))(
    "%s keeps the supporting figures to a readable row",
    (_slug, project) => {
      // A handful of headline numbers is a row of stat tiles; past four it stops
      // being a row and starts being a table.
      expect(project.results!.figures.length).toBeGreaterThan(1);
      expect(project.results!.figures.length).toBeLessThanOrEqual(4);
    },
  );
});

describe("A media buying case study", () => {
  const project = withResults[0];

  it("leads with exactly one hero figure", () => {
    const { container } = renderWork(project.slug);
    // One number leads the page. The figure itself may well appear again inside
    // the chart that proves it — what must not repeat is the lead.
    expect(container.querySelectorAll("[data-hero-figure]")).toHaveLength(1);
    expect(container.querySelector("[data-hero-figure]")).toHaveTextContent(
      project.results!.headline.value,
    );
    expect(screen.getByText(project.results!.headline.label)).toBeInTheDocument();
  });

  it("shows every supporting figure with its label", () => {
    renderWork(project.slug);
    for (const figure of project.results!.figures) {
      expect(screen.getAllByText(figure.value).length).toBeGreaterThan(0);
      expect(screen.getByText(figure.label)).toBeInTheDocument();
    }
  });

  it("gives the funnel a table as well as bars", () => {
    renderWork(project.slug);
    const table = screen.getByRole("table");
    for (const stage of project.results!.funnel) {
      expect(within(table).getByText(stage.display)).toBeInTheDocument();
    }
  });

  it("says plainly that the figures are not real results", () => {
    renderWork(project.slug);
    // A stand-in number presented as a result is worse to publish than a
    // stand-in picture.
    expect(screen.getByText(/illustrative, not a real result/i)).toBeInTheDocument();
  });

  it("names where and when it ran", () => {
    renderWork(project.slug);
    expect(screen.getByText(project.results!.platforms.join(" · "))).toBeInTheDocument();
    expect(screen.getByText(project.results!.window)).toBeInTheDocument();
  });
});

describe("The two templates", () => {
  const byTemplate = (t: string) => projects.filter((p) => p.results?.template === t);

  it("has an account on each, so neither is theoretical", () => {
    expect(byTemplate("efficiency").length).toBeGreaterThan(0);
    expect(byTemplate("scale").length).toBeGreaterThan(0);
  });

  it.each(byTemplate("efficiency").map((p) => [p.slug, p] as const))(
    "%s carries the before-and-after an efficiency brief is judged on",
    (_slug, project) => {
      const mark = project.results!.benchmark;
      expect(mark, "an efficiency case study without a benchmark proves nothing").toBeTruthy();
      // The whole claim is that it got cheaper.
      expect(mark!.afterValue).toBeLessThan(mark!.beforeValue);
    },
  );

  it.each(byTemplate("scale").map((p) => [p.slug, p] as const))(
    "%s carries the spend and return a scale brief is judged on",
    (_slug, project) => {
      const money = project.results!.economics;
      expect(money, "a scale case study without economics proves nothing").toBeTruthy();
      // Same unit, so the two sit on one scale and can be compared at all.
      expect(money!.returned.value).toBeGreaterThan(money!.spend.value);
    },
  );

  it("shows each account only the proof its own brief was judged on", () => {
    for (const project of projects.filter((p) => p.results)) {
      const r = project.results!;
      if (r.template === "efficiency") expect(r.economics).toBeUndefined();
      if (r.template === "scale") expect(r.benchmark).toBeUndefined();
    }
  });

  it("splits the budget to the same total it reports as spend", () => {
    for (const project of projects.filter((p) => p.results?.spendSplit)) {
      const r = project.results!;
      const split = r.spendSplit!.reduce((sum, c) => sum + c.value, 0);
      const stated = r.figures.find((f) => /spend/i.test(f.label));
      if (!stated) continue;
      // A split that does not add up to the spend is the first thing a client
      // will notice, and the easiest thing to get wrong when typing real numbers.
      expect(Number(stated.value.replace(/[^\d]/g, "")), project.slug).toBe(split);
    }
  });
});

describe("Counting a figure up", () => {
  /**
   * The figures are authored as display strings, so the counter has to take the
   * number out of "EGP 286,000" and put it back the same way. Getting this
   * wrong is how a page ends up briefly showing EGP 286 or 3.4000000001x.
   */
  it.each([
    ["EGP 286,000", "EGP ", 286000, "", 0, true],
    ["EGP 41", "EGP ", 41, "", 0, false],
    ["1.84M", "", 1.84, "M", 2, false],
    ["3.4x", "", 3.4, "x", 1, false],
    ["6,940", "", 6940, "", 0, true],
    ["2,310,000", "", 2310000, "", 0, true],
    ["118", "", 118, "", 0, false],
  ])("reads %s", (input, prefix, value, suffix, decimals, grouped) => {
    const figure = parseFigure(input as string);
    expect(figure).not.toBeNull();
    expect(figure).toMatchObject({ prefix, value, suffix, decimals, grouped });
  });

  it.each(["EGP 286,000", "EGP 41", "1.84M", "3.4x", "6,940", "5.8x", "2,310,000"])(
    "lands %s back on exactly what it started as",
    (input) => {
      const figure = parseFigure(input)!;
      // The last frame of the count must be the authored string, character for
      // character — a counter that finishes one digit off is worse than none.
      expect(formatFigure(figure.value, figure)).toBe(input);
    },
  );

  it("counts from zero in the shape of its figure", () => {
    const figure = parseFigure("EGP 286,000")!;
    expect(formatFigure(0, figure)).toBe("EGP 0");
    expect(formatFigure(286000 * 0.5, figure)).toBe("EGP 143,000");
  });

  it("rounds a part-way frame to the places the figure shows", () => {
    const figure = parseFigure("1.84M")!;
    // Not 1.2328000000000002M.
    expect(formatFigure(1.84 * 0.67, figure)).toBe("1.23M");
  });

  it("leaves a figure with no number alone", () => {
    expect(parseFigure("—")).toBeNull();
    expect(parseFigure("Pending")).toBeNull();
  });

  it("can count every figure the live case studies carry", () => {
    for (const project of withResults) {
      const r = project.results!;
      const authored = [
        r.headline.value,
        ...r.figures.map((f) => f.value),
        ...r.funnel.map((s) => s.display),
        ...(r.benchmark ? [r.benchmark.before.display, r.benchmark.after.display] : []),
        ...(r.economics ? [r.economics.spend.display, r.economics.returned.display] : []),
        ...(r.spendSplit?.map((c) => c.display) ?? []),
      ];
      for (const display of authored) {
        const figure = parseFigure(display);
        expect(figure, `${project.slug}: "${display}" has no number to count`).not.toBeNull();
        expect(formatFigure(figure!.value, figure!), project.slug).toBe(display);
      }
    }
  });
});

describe("A figure that has not finished counting", () => {
  it("still reads as its final value in the markup", () => {
    const { container } = renderWork(withResults[0].slug);
    // The count runs on a scroll trigger that may never fire — print, a crawler,
    // a reader who asked for less motion. The finished figure is always there.
    const hero = container.querySelector("[data-hero-figure]");
    expect(hero).toHaveTextContent(withResults[0].results!.headline.value);
  });
});
