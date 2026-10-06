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

  it("normalises every stroke so the drawing finishes when its animation does", () => {
    const { container } = render(<Preloader />);
    const paths = container.querySelectorAll("path.sp");

    expect(paths.length).toBeGreaterThan(0);
    paths.forEach((path) => {
      expect(path.getAttribute("pathLength")).toBe("1");
    });
  });
});
