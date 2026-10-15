import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, act } from "@testing-library/react";
import CountUp from "@/components/work/CountUp";

/**
 * The shared test setup stubs IntersectionObserver with a no-op, which is what
 * framer-motion needs but means nothing ever exercises the count itself. These
 * tests install an observer that can be fired on demand, so the counting path
 * is actually run.
 */
let fire: (intersecting: boolean) => void;
let observed: number;

class FiringObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(private cb: IntersectionObserverCallback) {
    fire = (intersecting) =>
      this.cb(
        [{ isIntersecting: intersecting } as IntersectionObserverEntry],
        this as IntersectionObserver,
      );
  }
  observe() {
    observed += 1;
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

const original = globalThis.IntersectionObserver;

/** Effects only schedule their timers when act flushes, so step, don't jump. */
const advance = (ms: number) =>
  act(() => {
    for (let left = ms; left > 0; left -= 50) vi.advanceTimersByTime(Math.min(50, left));
  });

const shown = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("span"))
    .filter((s) => s.getAttribute("aria-hidden") === "true")
    .map((s) => s.textContent);

beforeEach(() => {
  observed = 0;
  vi.useFakeTimers();
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: FiringObserver,
  });
});

afterEach(() => {
  vi.useRealTimers();
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: original,
  });
});

describe("A counting figure", () => {
  it("waits for the scroll trigger before it counts", () => {
    const { container } = render(<CountUp value="EGP 41" />);
    expect(observed).toBe(1);
    // Nothing counting yet, so the figure is simply the figure.
    expect(shown(container)).toEqual([]);
    expect(container.textContent).toBe("EGP 41");
  });

  it("counts from zero up to exactly its figure", () => {
    const { container } = render(<CountUp value="EGP 286,000" durationMs={1000} />);
    act(() => fire(true));

    expect(shown(container)).toEqual(["EGP 0"]);

    advance(500);
    const midway = shown(container)[0]!;
    // Part way: past zero, not yet arrived, and formatted like its figure.
    expect(midway).toMatch(/^EGP [\d,]+$/);
    expect(midway).not.toBe("EGP 0");
    expect(midway).not.toBe("EGP 286,000");

    advance(600);
    // The overlay is dropped at the end, leaving the authored string alone.
    expect(shown(container)).toEqual([]);
    expect(container.textContent).toBe("EGP 286,000");
  });

  it("keeps the figure readable to assistive tech while it counts", () => {
    const { container } = render(<CountUp value="3.4x" durationMs={1000} />);
    act(() => fire(true));

    const real = Array.from(container.querySelectorAll("span")).find(
      (s) => s.textContent === "3.4x",
    );
    expect(real, "the finished figure must stay in the markup").toBeTruthy();
    // visibility:hidden or display:none would drop it from the accessibility
    // tree, and for the second the count runs the figure would be exposed to
    // nothing at all. It is faded instead.
    expect(real!.className).toContain("opacity-0");
    expect(real!.className).not.toContain("invisible");
    expect(real!.getAttribute("aria-hidden")).toBeNull();
  });

  it("holds off for its delay, so it falls in with its bar", () => {
    const { container } = render(<CountUp value="6,940" delayMs={300} durationMs={500} />);
    act(() => fire(true));

    expect(shown(container)).toEqual([]);
    advance(350);
    expect(shown(container)).not.toEqual([]);
  });

  it("does nothing until the figure is actually in view", () => {
    const { container } = render(<CountUp value="118" durationMs={500} />);
    act(() => fire(false));
    advance(600);
    expect(shown(container)).toEqual([]);
  });

  it("shows a reader who asked for less motion the figure, not the counting", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList);

    const { container } = render(<CountUp value="1.84M" />);
    expect(container.textContent).toBe("1.84M");
    advance(2000);
    expect(shown(container)).toEqual([]);
    expect(container.textContent).toBe("1.84M");
  });

  it("prints a figure with no number to count as it was written", () => {
    const { container } = render(<CountUp value="Pending" />);
    act(() => fire(true));
    advance(1500);
    expect(container.textContent).toBe("Pending");
  });
});
