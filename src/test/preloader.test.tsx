import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Preloader from "@/components/Preloader";

const clearSession = () => window.sessionStorage.clear();

describe("Preloader", () => {
  beforeEach(() => {
    clearSession();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearSession();
    document.body.style.overflow = "";
  });

  it("shows the intro on a fresh session", () => {
    render(<Preloader />);
    expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();
  });

  it("stays out of the way once the session has seen it", () => {
    window.sessionStorage.setItem("preloaderShown", "true");
    const { container } = render(<Preloader />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not crash when storage is blocked", () => {
    // Safari private mode and blocked-cookie setups throw on access. The
    // preloader sits at the app root, so an exception here blanks the site.
    vi.spyOn(window.sessionStorage, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    vi.spyOn(window.sessionStorage, "setItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });

    expect(() => render(<Preloader />)).not.toThrow();
  });

  it("locks page scrolling while it covers the page, and restores it on skip", () => {
    render(<Preloader />);
    expect(document.body.style.overflow).toBe("hidden");

    act(() => {
      screen.getByRole("button", { name: /skip/i }).click();
    });

    expect(document.body.style.overflow).toBe("");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("skipping records the session so it does not replay", () => {
    render(<Preloader />);
    act(() => {
      screen.getByRole("button", { name: /skip/i }).click();
    });
    expect(window.sessionStorage.getItem("preloaderShown")).toBe("true");
  });

  it("finishes on its own without the visitor pressing skip", async () => {
    vi.useFakeTimers();
    try {
      render(<Preloader />);
      expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();

      // Step in small slices: each phase schedules its timer from an effect,
      // which only runs when act flushes, so one big jump would skip past them.
      for (let elapsed = 0; elapsed < 6000; elapsed += 100) {
        if (!screen.queryByRole("status")) break;
        await act(async () => {
          await vi.advanceTimersByTimeAsync(100);
        });
      }

      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe("");
    } finally {
      vi.useRealTimers();
    }
  });

  it("normalises every stroke so the drawing finishes when its animation does", () => {
    const { container } = render(<Preloader />);
    const paths = container.querySelectorAll("path.sp");

    expect(paths.length).toBeGreaterThan(0);
    paths.forEach((path) => {
      expect(path.getAttribute("pathLength")).toBe("1");
    });
  });
});

/**
 * The drawing is a sketch of the logo it cross-fades into, so it has to sit on
 * the logo's own geometry. When it did not, the swap visibly jumped: the old
 * drawing put AGENCY full size on a second line and carried an underline the
 * logo does not have.
 */
describe("Preloader wordmark", () => {
  // vitest serves this file over a non-file URL, so resolve from the project root
  const source = readFileSync(resolve("src/components/Preloader.tsx"), "utf8");

  it("draws in the logo's own coordinate space", () => {
    // The logo file is 640x178; the viewBox has to match or the sketch and the
    // image are different sizes.
    expect(source).toContain("'0 0 640 178'");
    expect(source).toContain("'640 / 178'");
  });

  it("separates the two words far more than the letters", () => {
    // Measured off the logo: letters sit 4-7 apart, the words 19.
    const e = /d-E1"\s*\n\s*d="M(\d+)/.exec(source);
    const v = /d-V"\s*\n\s*d="M(\d+)/.exec(source);
    expect(e, "E1 path").toBeTruthy();
    expect(v, "V path").toBeTruthy();
    const wordGap = Number(v![1]) - Number(e![1]);
    expect(wordGap).toBeGreaterThan(15);
  });

  it("keeps Agency small and under the end of VISION", () => {
    // Not a second full-size line: it starts past the middle and is lighter.
    const a = /d-ag-A"\s*\n\s*d="M(\d+)/.exec(source);
    expect(a, "Agency A path").toBeTruthy();
    expect(Number(a![1])).toBeGreaterThan(450);
    expect(source).toMatch(/d-ag-A', delay: [\d.]+, duration: [\d.]+, strokeWidth: 4\.5/);
  });

  it("carries the play mark the logo has, and not the underline it does not", () => {
    expect(source).toContain('className="d-play"');
    expect(source).not.toContain("d-line");
  });

  it("holds both layers in one box so the swap cannot shift", () => {
    const layers = source.match(/className="absolute inset-0 w-full h-full"/g) ?? [];
    expect(layers.length).toBe(2);
  });
});
