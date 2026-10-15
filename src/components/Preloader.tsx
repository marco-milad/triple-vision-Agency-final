import { useState, useEffect, useRef, useCallback } from 'react';
import {
  LOGO_VIEWBOX,
  MAIN_GLYPHS,
  AGENCY_GLYPHS,
  AGENCY_LOCKUP,
  LOGO_ORANGE,
} from './logoPaths';
import { dockTransform } from './dockTransform';

/**
 * Intro overlay: the wordmark writes itself, then docks into the header.
 *
 * The outline is traced from the logo file, so the pen follows the real
 * letterform and the fill that follows it is the real mark — one shape
 * completing itself rather than a sketch replaced by a picture.
 *
 * It does not fade out. The second line slides back to where the logo file puts
 * it, and the whole mark travels to the exact position and size of the logo in
 * the header, which is the same artwork. The intro turns into the site instead
 * of disappearing from in front of it.
 *
 * The site itself is only about 280KB, so this is a brand moment rather than a
 * loading indicator: there is nothing left to wait for. It stays skippable, and
 * plays once per browser session.
 */

type Phase = 'draw' | 'dock' | 'done';

const SESSION_KEY = 'preloaderShown';
/** The header logo this docks into. */
const HEADER_LOGO = 'header img[alt="Triple Vision Logo"], nav img[alt="Triple Vision Logo"]';

const TIMINGS = {
  /** One letter, from first stroke to last. */
  GLYPH_DRAW_MS: 440,
  /** How far behind the previous letter each one starts. */
  GLYPH_STAGGER_MS: 88,
  /** Each letter's ink arrives behind its own outline, not the whole word's. */
  FILL_OFFSET_MS: 175,
  FILL_MS: 480,
  /** A beat between the last letter and the play mark landing. */
  PLAY_GAP_MS: 60,
  PLAY_MS: 380,
  /** The journey into the header. */
  DOCK_MS: 900,
  /** Dock by now even if something has gone wrong upstream. */
  MAX_MS: 3200,
} as const;

const GLYPH_COUNT = MAIN_GLYPHS.length + AGENCY_GLYPHS.length;

/**
 * When the last letter finishes, and when the play mark lands on it.
 *
 * Derived rather than written down: both were separate numbers, so changing the
 * rhythm of the letters left the play mark landing in the wrong place with
 * nothing to show it had.
 */
const WRITING_ENDS_MS =
  (GLYPH_COUNT - 1) * TIMINGS.GLYPH_STAGGER_MS + TIMINGS.GLYPH_DRAW_MS;
const PLAY_AT_MS = WRITING_ENDS_MS + TIMINGS.PLAY_GAP_MS;

const BACKGROUND = 'hsl(280, 100%, 8%)';
const ACCENT = 'hsl(32, 100%, 50%)';

/** Storage can throw when cookies are blocked, and is absent while prerendering. */
const seenThisSession = (): boolean => {
  try {
    return typeof window !== 'undefined' && !!window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    return false;
  }
};

const markSeen = (): void => {
  try {
    window.sessionStorage.setItem(SESSION_KEY, 'true');
  } catch {
    /* storage unavailable — the intro simply plays again next time */
  }
};

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const STYLES = `
  @keyframes tvDraw { to { stroke-dashoffset: 0; } }
  @keyframes tvFill { to { fill-opacity: 1; } }
  @keyframes tvPlay { from { opacity: 0; transform: scale(0.55); } to { opacity: 1; transform: scale(1); } }

  /* pathLength normalises the mark to 1, so the pen takes the same time
     whatever the perimeter of the letterforms happens to add up to.
     The curve is an ease-out: intros read faster when the movement is quickest
     at the start and settles at the end. */
  /* Every letter is its own path, normalised to a length of 1, so each takes
     the same time to write whatever its outline actually measures — an I and an
     O arrive at the same pace. The delay per letter is set inline. */
  .tv-ink {
    stroke: rgba(255, 255, 255, 0.9);
    fill: #fff;
    stroke-width: 0.9;
    stroke-linejoin: round;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    fill-opacity: 0;
    animation:
      tvDraw ${TIMINGS.GLYPH_DRAW_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards,
      tvFill ${TIMINGS.FILL_MS}ms ease-out forwards;
  }

  /* A small overshoot: enough to feel like it lands, far short of a bounce. */
  .tv-play {
    fill: ${ACCENT};
    transform-box: fill-box;
    transform-origin: center;
    opacity: 0;
    animation: tvPlay ${TIMINGS.PLAY_MS}ms ${PLAY_AT_MS}ms cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
  }

  /* The header's copy of this artwork waits until the mark has landed on it.
     Both are visible otherwise, and any discrepancy at all shows as doubling. */
  html.tv-intro ${HEADER_LOGO} { opacity: 0; }

  @media (prefers-reduced-motion: reduce) {
    .tv-ink { stroke-dashoffset: 0; fill-opacity: 1; animation: none; }
    .tv-play { opacity: 1; animation: none; }
  }
`;

/**
 * When a letter starts being written, and when its own ink follows it.
 *
 * Two values, because `.tv-ink` runs two animations: the outline and the fill.
 */
const glyphDelay = (index: number): string => {
  const start = index * TIMINGS.GLYPH_STAGGER_MS;
  return `${start}ms, ${start + TIMINGS.FILL_OFFSET_MS}ms`;
};

const Preloader = () => {
  const [phase, setPhase] = useState<Phase>(() =>
    typeof window === 'undefined' || seenThisSession() || prefersReducedMotion() ? 'done' : 'draw',
  );
  /** The transform that carries the mark onto the header logo. */
  const [dockMove, setDockMove] = useState<string>();

  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    markSeen();
    setPhase('done');
  }, [clearTimers]);

  /**
   * Measure where the mark is and where the header logo is, and work out the
   * move between them. Nothing about the mark's layout may change between the
   * measurement and the move, or the transform starts from somewhere else. Both are the same artwork at different sizes, so the
   * mark can land exactly on it rather than near it.
   */
  const dock = useCallback(() => {
    const mark = markRef.current;
    const target = document.querySelector<HTMLElement>(HEADER_LOGO);

    if (mark && target) {
      const from = mark.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      if (from.width > 0 && to.width > 0) {
        setDockMove(dockTransform(from, to));
      }
    }
    setPhase('dock');
  }, []);

  // Mark the session as soon as the intro starts, so a reload mid-animation
  // does not replay it.
  useEffect(() => {
    if (phase !== 'done') markSeen();
  }, [phase]);

  // Hold the page still and keep the rest of the app out of the tab order
  // while the overlay covers it.
  useEffect(() => {
    if (phase === 'done') return;

    document.documentElement.classList.add('tv-intro');
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const root = document.getElementById('root');
    const covered = Array.from(root?.children ?? []).filter((el) => el !== overlayRef.current);
    covered.forEach((el) => {
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('inert', '');
    });

    return () => {
      document.documentElement.classList.remove('tv-intro');
      body.style.overflow = previousOverflow;
      covered.forEach((el) => {
        el.removeAttribute('aria-hidden');
        el.removeAttribute('inert');
      });
    };
  }, [phase]);

  // Each phase owns its own timer. Keeping them in one effect keyed on `phase`
  // meant the cleanup wiped the timers the previous phase had just scheduled,
  // which left the logo on screen until the visitor pressed Skip.
  useEffect(() => {
    if (phase !== 'draw') return;
    // The dock begins as the play mark lands, so the brand's own element is
    // what sets the exit going rather than a timer nobody can see.
    addTimer(dock, PLAY_AT_MS + TIMINGS.PLAY_MS);
    addTimer(dock, TIMINGS.MAX_MS);
    return clearTimers;
  }, [phase, addTimer, clearTimers, dock]);

  useEffect(() => {
    if (phase !== 'dock') return;
    const id = setTimeout(finish, TIMINGS.DOCK_MS);
    return () => clearTimeout(id);
  }, [phase, finish]);

  if (phase === 'done') return null;

  const docking = phase === 'dock';
  const ease = 'cubic-bezier(0.65, 0, 0.35, 1)';

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ pointerEvents: docking ? 'none' : 'auto' }}
    >
      <style>{STYLES}</style>

      {/* The ground clears on its own, so the mark is seen travelling onto the
          page rather than onto another panel. */}
      <div
        className="absolute inset-0"
        style={{
          background: BACKGROUND,
          opacity: docking ? 0 : 1,
          transition: `opacity ${TIMINGS.DOCK_MS - 120}ms ease-in`,
        }}
      />

      <svg
        ref={markRef}
        viewBox={LOGO_VIEWBOX}
        className="relative w-[min(88vw,460px)]"
        style={{
          // The second line hangs below the logo's own box while it is in
          // lockup, so the box must not clip it.
          overflow: 'visible',
          // Stated rather than left to `h-auto`: the ink is located by its
          // fraction of this box, so the box has to be the artwork's shape.
          aspectRatio: '640 / 178',
          transform: dockMove && docking ? dockMove : 'none',
          transformOrigin: 'top left',
          transition: `transform ${TIMINGS.DOCK_MS}ms ${ease}`,
        }}
        aria-hidden="true"
      >
        {MAIN_GLYPHS.map((d, i) => (
          <path
            key={d.slice(0, 24)}
            pathLength={1}
            className="tv-ink"
            fillRule="evenodd"
            style={{ animationDelay: glyphDelay(i) }}
            d={d}
          />
        ))}

        {/* "Agency" travels from the lockup back to its place in the logo. */}
        <g
          style={{
            transform: docking ? 'none' : AGENCY_LOCKUP,
            transition: `transform ${TIMINGS.DOCK_MS}ms ${ease}`,
          }}
        >
          {AGENCY_GLYPHS.map((d, i) => (
            <path
              key={d.slice(0, 24)}
              pathLength={1}
              className="tv-ink"
              fillRule="evenodd"
              style={{ animationDelay: glyphDelay(MAIN_GLYPHS.length + i) }}
              d={d}
            />
          ))}
        </g>

        <path className="tv-play" fillRule="evenodd" d={LOGO_ORANGE} />
      </svg>

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-8 text-white/50 text-sm hover:text-white transition-colors duration-200 rounded px-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        style={{
          opacity: docking ? 0 : 1,
          pointerEvents: docking ? 'none' : 'auto',
          transition: 'opacity 200ms ease-out',
        }}
      >
        Skip
      </button>
    </div>
  );
};

export default Preloader;
