import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import Preloader from "@/components/Preloader";
import { dockTransform } from "@/components/dockTransform";

const clearSession = () => window.sessionStorage.clear();

/**
 * Step time forward until something is true.
 *
 * Each phase schedules its timer from an effect, and effects only run when act
 * flushes, so one big jump sails past them. Nothing here waits for a literal
 * millisecond either: the intro's timings are tuned from time to time, and a
 * test that encodes them turns every retune into a failure.
 */
const advanceUntil = async (done: () => boolean, limitMs = 6000) => {
  for (let elapsed = 0; elapsed < limitMs && !done(); elapsed += 100) {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
  }
  return done();
};

/**
 * Mount the intro the way the app mounts it: inside `#root`, with a sibling
 * standing in for the page.
 *
 * The intro covers the app by marking `#root`'s other children, so without a
 * real `#root` that whole branch is skipped — `document.getElementById('root')`
 * is null in a bare jsdom document, and the observer never even starts.
 */
const mountOverIntroRoot = async () => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);

  const view = render(<Preloader />, { container: root });

  // Held by identity rather than looked up each time: one of these tests
  // replaces the page node, and "the child that is not the page" would then
  // match the replacement as happily as the overlay.
  const overlayEl = root.firstElementChild;

  // The stand-in for the app goes in after the intro, because createRoot empties
  // the container it is given — in the app both are React's own children of
  // #root and neither clears the other. Arriving late is also the case that
  // matters here: it is the one the intro used to miss.
  const page = document.createElement("div");
  page.textContent = "the page";
  await act(async () => {
    root.appendChild(page);
    await Promise.resolve(); // the observer reports on a microtask
  });

  return {
    root,
    page,
    /**
     * The overlay, if it is still in the document.
     *
     * Deliberately not a role query: from dock start the overlay is aria-hidden
     * on purpose, so a role query stops finding it — which is the behaviour
     * under test. Being mounted and being exposed are different questions.
     */
    overlay: () => (overlayEl?.isConnected ? overlayEl : null),
    isExposed: () => overlayEl?.getAttribute("role") === "status",
    /** Scrolling held, or anything under #root kept out of reach. */
    isLocked: () =>
      document.body.style.overflow === "hidden" ||
      Array.from(root.children).some(
        (el) => el !== overlayEl && el.hasAttribute("inert"),
      ),
    unmount: view.unmount,
  };
};

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

  it("stops announcing itself before it leaves, and only leaves at the end", async () => {
    vi.useFakeTimers();
    const intro = await mountOverIntroRoot();
    try {
      expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();

      // The announcement goes quiet as the mark sets off for the header, since
      // from that moment the page underneath is usable and telling a screen
      // reader it is still loading would be false.
      await advanceUntil(() => !intro.isExposed());
      expect(intro.isExposed()).toBe(false);
      expect(screen.queryByRole("status")).not.toBeInTheDocument();

      // Going quiet is not leaving. Waiting on the role alone used to end the
      // test here, which stopped it checking that the intro ever came down.
      expect(intro.overlay()).not.toBeNull();

      await advanceUntil(() => intro.overlay() === null);
      expect(intro.overlay()).toBeNull();
      expect(document.body.style.overflow).toBe("");
    } finally {
      intro.unmount();
      intro.root.remove();
      vi.useRealTimers();
    }
  });

  it("draws one shape and then fills it", () => {
    const { container } = render(<Preloader />);

    const ink = container.querySelector("path.tv-ink");
    expect(ink).toBeTruthy();
    // Normalised, so the pen takes the same time whatever the perimeter adds up to.
    expect(ink!.getAttribute("pathLength")).toBe("1");
    // Holes in R, P, O, A, g and e only fall out with this rule.
    expect(ink!.getAttribute("fill-rule")).toBe("evenodd");

    // The play mark is its own shape so it can keep the brand's orange.
    expect(container.querySelector("path.tv-play")).toBeTruthy();
  });
});

/**
 * The intro holds the page still and out of reach while it writes, then hands
 * it back.
 *
 * These run inside a real `#root`, because that is the only way the covering
 * branch runs at all: with no `#root` the lookup returns null, nothing is
 * marked, and the observer never starts — so none of this was being checked.
 *
 * What went wrong before, and what each test here pins down: the covered nodes
 * were read once, so the subtree React swapped in when the page's chunk arrived
 * was never covered; the lock was then re-applied at the phase change; and the
 * page spent roughly two seconds scrollable and focusable behind an opaque
 * overlay in between.
 */
describe("The interaction lock", () => {
  beforeEach(() => {
    clearSession();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearSession();
    document.getElementById("root")?.remove();
    document.documentElement.classList.remove("tv-intro");
    document.body.style.overflow = "";
    vi.useRealTimers();
  });

  it("covers the page while the mark is being written", async () => {
    const intro = await mountOverIntroRoot();
    try {
      expect(document.body.style.overflow).toBe("hidden");
      expect(intro.page).toHaveAttribute("inert");
      expect(intro.page).toHaveAttribute("aria-hidden", "true");
      expect(intro.isExposed()).toBe(true);
    } finally {
      intro.unmount();
    }
  });

  it("lets go when the mark sets off, while the intro is still on screen", async () => {
    vi.useFakeTimers();
    const intro = await mountOverIntroRoot();
    try {
      expect(intro.isLocked()).toBe(true);

      await advanceUntil(() => !intro.isLocked());

      // Handed back as the mark starts travelling, not when it lands: by then
      // the overlay takes no pointer events and its ground is fading, so there
      // is nothing left to hold.
      expect(document.body.style.overflow).toBe("");
      expect(intro.page).not.toHaveAttribute("inert");
      expect(intro.page).not.toHaveAttribute("aria-hidden");

      // Still on screen, and the header's own copy of the logo still held back
      // so the two never show at once.
      expect(intro.overlay()).not.toBeNull();
      expect(document.documentElement.classList.contains("tv-intro")).toBe(true);
    } finally {
      intro.unmount();
    }
  });

  it("does not quietly put the lock back when it changes phase", async () => {
    vi.useFakeTimers();
    const intro = await mountOverIntroRoot();
    try {
      const transitions: boolean[] = [];
      const note = () => {
        const locked = intro.isLocked();
        if (transitions[transitions.length - 1] !== locked) transitions.push(locked);
      };
      note();

      /*
        Take the lock off from outside, the way the rest of the page used to.
        The navbar wrote the body's overflow the moment it mounted, and the
        subtree React swapped in when the page's own chunk arrived had never
        been covered — measured in a browser, the two together left the page
        loose from about 600ms.

        Changing phase then re-ran the whole covering pass and put the lock
        back on, which is the thing this test exists to catch. On its own that
        re-lock is invisible: React runs the cleanup and the effect body
        back-to-back inside one commit, so the released moment never reaches
        the DOM. It only shows once the lock has been taken off first.
      */
      await act(async () => {
        document.body.style.overflow = "unset";
        intro.page.removeAttribute("inert");
        intro.page.removeAttribute("aria-hidden");
      });
      note();
      expect(intro.isLocked()).toBe(false);

      for (let elapsed = 0; elapsed < 6000; elapsed += 100) {
        await act(async () => {
          await vi.advanceTimersByTimeAsync(100);
        });
        note();
      }

      // Held once, let go once, never taken back.
      expect(transitions).toEqual([true, false]);
      expect(document.body.style.overflow).not.toBe("hidden");
      expect(intro.page).not.toHaveAttribute("inert");
      expect(intro.page).not.toHaveAttribute("aria-hidden");
    } finally {
      intro.unmount();
    }
  });

  it("covers a subtree swapped in while the intro is up", async () => {
    vi.useFakeTimers();
    const intro = await mountOverIntroRoot();
    try {
      expect(intro.page).toHaveAttribute("inert");

      // What React does when the page's own chunk arrives: the node standing in
      // for it is replaced outright, and the node taking its place was never
      // covered by the pass that ran at mount.
      const replacement = document.createElement("div");
      replacement.textContent = "the page, for real";
      await act(async () => {
        intro.root.replaceChild(replacement, intro.page);
        await Promise.resolve(); // the observer reports on a microtask
      });

      expect(replacement).toHaveAttribute("inert");
      expect(replacement).toHaveAttribute("aria-hidden", "true");
      expect(intro.isLocked()).toBe(true);
    } finally {
      intro.unmount();
    }
  });

  it("gives back both the subtree it covered and the one that replaced it", async () => {
    vi.useFakeTimers();
    const intro = await mountOverIntroRoot();
    const original = intro.page;
    try {
      const replacement = document.createElement("div");
      await act(async () => {
        intro.root.replaceChild(replacement, original);
        await Promise.resolve();
      });
      expect(replacement).toHaveAttribute("inert");

      await advanceUntil(() => !intro.isLocked());

      expect(replacement).not.toHaveAttribute("inert");
      expect(replacement).not.toHaveAttribute("aria-hidden");
      // The one React detached is tracked too. Nothing reads it any more, but
      // leaving it marked would mean the bookkeeping had lost it.
      expect(original).not.toHaveAttribute("inert");
      expect(original).not.toHaveAttribute("aria-hidden");
    } finally {
      intro.unmount();
    }
  });
});

/**
 * The drawing is a sketch of the logo it cross-fades into, so it has to sit on
 * the logo's own geometry. When it did not, the swap visibly jumped: the old
 * drawing put AGENCY full size on a second line and carried an underline the
 * logo does not have.
 */
/** The bounding box of a generated path, in the logo's own coordinates. */
function pathBox(d: string) {
  const pts = Array.from(d.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)).map(
    (m) => [Number(m[1]), Number(m[2])] as const,
  );
  const xs = pts.map(([x]) => x);
  const ys = pts.map(([, y]) => y);
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
}

/** Where each contour of a path starts, in order. */
function contourStarts(d: string) {
  return d
    .split("M")
    .slice(1)
    .map((sub) => {
      const m = /(-?[\d.]+),(-?[\d.]+)/.exec(sub)!;
      return { x: Number(m[1]), y: Number(m[2]) };
    });
}

describe("Preloader wordmark", () => {
  // vitest serves this file over a non-file URL, so resolve from the project root
  const component = readFileSync(resolve("src/components/Preloader.tsx"), "utf8");
  const art = readFileSync(resolve("src/components/logoPaths.ts"), "utf8");

  /** The glyph paths of one exported array, in the order they are written. */
  const glyphsOf = (name: string) => {
    const block = new RegExp(`${name} = \\[([^\\]]*)\\]`, "s").exec(art)?.[1] ?? "";
    return Array.from(block.matchAll(/'([^']+)'/g)).map((m) => m[1]);
  };

  const mainGlyphs = glyphsOf("MAIN_GLYPHS");
  const agencyGlyphs = glyphsOf("AGENCY_GLYPHS");
  const main = mainGlyphs.join("");
  const agency = agencyGlyphs.join("");
  const lockup = /AGENCY_LOCKUP = '([^']*)'/.exec(art)?.[1] ?? "";

  it("is one path per letter, so they can be written one at a time", () => {
    // TRIPLE VISION plus the three-bar mark: thirteen shapes with clear air
    // between them. "Agency" is tighter and its letters touch in the artwork,
    // so it comes out as groups rather than letters.
    expect(mainGlyphs.length).toBe(13);
    expect(agencyGlyphs.length).toBeGreaterThanOrEqual(2);
  });

  it("writes them left to right", () => {
    for (const glyphs of [mainGlyphs, agencyGlyphs]) {
      const lefts = glyphs.map((d) => pathBox(d).x0);
      expect(lefts).toEqual([...lefts].sort((a, b) => a - b));
    }
  });

  it("staggers each letter behind the one before it", () => {
    expect(component).toContain("GLYPH_STAGGER_MS");
    expect(component).toContain("glyphDelay(");
    // Both the outline and the ink are delayed, or a letter fills before it
    // has been written.
    expect(component).toMatch(/\$\{start\}ms, \$\{start \+ TIMINGS\.FILL_OFFSET_MS\}ms/);
  });

  it("keeps both parts in the logo's own coordinates", () => {
    // With no transform the two parts must be exactly the header's artwork,
    // or the mark cannot land on the header logo at the end.
    const m = pathBox(main);
    const a = pathBox(agency);
    expect(m.y1).toBeLessThan(a.y0);          // "Agency" sits below the words
    expect(a.x1).toBeGreaterThan(m.x1 - 20);  // and against their right edge
  });

  it("centres the second line under the words while it is in lockup", () => {
    const [, tx, , sc] = /translate\((-?[\d.]+) (-?[\d.]+)\) scale\(([\d.]+)\)/.exec(lockup)!;
    const scale = Number(sc);
    const a = pathBox(agency);
    const lockedMid = (a.x0 * scale + Number(tx) + (a.x1 * scale + Number(tx))) / 2;

    // The three bars sit out to the left of the words and are a mark, not a
    // letter; centring on them too drags the second line off the middle.
    const m = pathBox(main);
    const words = mainGlyphs.map(pathBox).filter((b) => b.x0 > m.x0 + 30);
    const wordsMid = (Math.min(...words.map((b) => b.x0)) + m.x1) / 2;

    expect(Math.abs(lockedMid - wordsMid)).toBeLessThan(10);
  });

  it("uses the real letterforms rather than redrawn ones", () => {
    // A trace is hundreds of coordinates; a handful would mean it produced
    // nothing and the mark had been hand-drawn instead.
    expect((main + agency).match(/[ML]/g)?.length ?? 0).toBeGreaterThan(400);
  });

  it("draws and fills rather than swapping in a second image", () => {
    expect(component).not.toContain("res.cloudinary.com");
    expect(component).not.toContain("<img");
    expect(component).toContain("stroke-dashoffset: 1");
    expect(component).toContain("fill-opacity: 0");
  });

  it("docks into the header logo instead of fading away", () => {
    expect(component).toContain('alt="Triple Vision Logo"');
    expect(component).toContain("getBoundingClientRect");
    expect(component).toContain("AGENCY_LOCKUP");
  });

  it("eases out of the draw, which is what makes an intro read as quick", () => {
    expect(component).toContain("tvDraw ${TIMINGS.GLYPH_DRAW_MS}ms cubic-bezier(0.22");
  });
});

describe("Docking into the header", () => {
  it("lands the mark exactly on the header logo", () => {
    // Real numbers: the intro mark is 460 wide, centred on a 1440x900 screen;
    // the header logo is the same artwork at 144 wide, near the top left.
    const from = { left: 490, top: 386, width: 460 };
    const to = { left: 24, top: 24, width: 144 };

    const t = dockTransform(from, to);
    const [, dx, dy, scale] = /translate\((-?[\d.]+)px, (-?[\d.]+)px\) scale\(([\d.]+)\)/.exec(t)!;

    // Applying it by hand has to put the mark's corner on the target's corner,
    // and give it the target's width.
    expect(from.left + Number(dx)).toBeCloseTo(to.left);
    expect(from.top + Number(dy)).toBeCloseTo(to.top);
    expect(from.width * Number(scale)).toBeCloseTo(to.width);
  });

  it("keeps the two in register once scaled, not just aligned at a corner", () => {
    const from = { left: 490, top: 386, width: 460 };
    const to = { left: 24, top: 24, width: 144 };
    const [, dx, , scale] = /translate\((-?[\d.]+)px, (-?[\d.]+)px\) scale\(([\d.]+)\)/.exec(
      dockTransform(from, to),
    )!;

    // The centre has to agree too. Measuring centre to centre in the first
    // place looked right and was out by (460 - 144) / 2.
    const landedCentre = from.left + Number(dx) + (from.width * Number(scale)) / 2;
    expect(landedCentre).toBeCloseTo(to.left + to.width / 2);
  });
});

describe("Handing over to the header", () => {
  beforeEach(() => clearSession());
  afterEach(() => {
    clearSession();
    document.documentElement.classList.remove("tv-intro");
  });

  it("holds the header logo back while the intro is up", () => {
    const { unmount } = render(<Preloader />);
    // Both are the same artwork; showing them together makes any discrepancy
    // read as doubling.
    expect(document.documentElement.classList.contains("tv-intro")).toBe(true);
    unmount();
  });

  it("gives it back when the intro leaves", () => {
    render(<Preloader />);
    fireEvent.click(screen.getByRole("button", { name: /skip/i }));
    expect(document.documentElement.classList.contains("tv-intro")).toBe(false);
  });
});

describe("Intro rhythm", () => {
  const component = readFileSync(resolve("src/components/Preloader.tsx"), "utf8");

  it("works out when the writing ends instead of restating it", () => {
    // These were two independent numbers, so retuning the letters left the play
    // mark landing before or after them with nothing to show it had.
    expect(component).toContain("const WRITING_ENDS_MS =");
    expect(component).toContain("GLYPH_COUNT - 1) * TIMINGS.GLYPH_STAGGER_MS");
    expect(component).toContain("const PLAY_AT_MS = WRITING_ENDS_MS");
    expect(component).not.toMatch(/PLAY_AT_MS:\s*\d/);
  });

  it("counts every letter it has to write", () => {
    expect(component).toContain("MAIN_GLYPHS.length + AGENCY_GLYPHS.length");
  });
});
