import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Intro overlay: draws the wordmark, reveals the logo, then leaves.
 *
 * It is tied to real loading rather than a fixed timeline — it waits for the
 * logo and the fonts, with a floor so it never flashes and a ceiling so a slow
 * connection cannot hold the visitor hostage. Shown once per browser session.
 */

type Phase = 'draw' | 'reveal' | 'fadeout' | 'done';

interface StrokeConfig {
  className: string;
  /** Seconds, in the original hand-tuned rhythm; scaled by DRAW_SPEED below. */
  delay: number;
  duration: number;
  strokeWidth?: number;
}

const SESSION_KEY = 'preloaderShown';

/**
 * The original rhythm ran for 2.8s. Halving it keeps the same feel while
 * getting the visitor to the site far sooner.
 */
const DRAW_SPEED = 0.5;

const TIMINGS = {
  /** When the last stroke finishes. */
  DRAW_MS: 2800 * DRAW_SPEED,
  /** Never shorter than this, so fast connections do not see a flash. */
  MIN_MS: 900,
  /** Reveal by now even if assets are still loading. */
  MAX_MS: 2200,
  /** How long the finished logo is held. */
  HOLD_MS: 450,
  /** Must match the CSS transition on the overlay. */
  FADE_MS: 400,
} as const;

const BACKGROUND = 'hsl(280, 100%, 8%)';

const SIZES = {
  /*
   * The logo file is 640x178. The viewBox matches it exactly and every
   * coordinate in the drawing is measured off it, so the sketch and the image
   * that replaces it occupy the same box and nothing shifts when they swap.
   */
  SVG_VIEWBOX: '0 0 640 178',
  ASPECT: '640 / 178',
  /** The widest it is drawn; below this it scales with the viewport. */
  MAX_WIDTH: 420,
} as const;

const LOGO_URL =
  'https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_640/v1763917799/logo2_transparent_jjpgv6.png';

/** Circumference of the "O" (r=29); pathLength is unreliable on <circle>. */
const CIRCLE_LENGTH = 2 * Math.PI * 29;

const STROKE_CONFIGS: StrokeConfig[] = [
  // ── TRIPLE ──
  { className: 'd-T', delay: 0.0, duration: 0.9 },
  { className: 'd-R', delay: 0.1, duration: 1.0 },
  { className: 'd-I1', delay: 0.2, duration: 0.7 },
  { className: 'd-P', delay: 0.3, duration: 1.0 },
  { className: 'd-L', delay: 0.4, duration: 0.8 },
  { className: 'd-E1', delay: 0.5, duration: 1.0 },
  // ── VISION ──
  { className: 'd-V', delay: 0.65, duration: 0.9 },
  { className: 'd-I2', delay: 0.75, duration: 0.7 },
  { className: 'd-S', delay: 0.85, duration: 1.1 },
  { className: 'd-I3', delay: 0.95, duration: 0.7 },
  { className: 'd-O', delay: 1.05, duration: 1.1 },
  { className: 'd-N', delay: 1.2, duration: 1.0 },
  // ── Agency: lighter and quicker, the way a signature is written ──
  { className: 'd-ag-A', delay: 1.5, duration: 0.5, strokeWidth: 4.5 },
  { className: 'd-ag-g', delay: 1.58, duration: 0.5, strokeWidth: 4.5 },
  { className: 'd-ag-e', delay: 1.66, duration: 0.5, strokeWidth: 4.5 },
  { className: 'd-ag-n', delay: 1.74, duration: 0.5, strokeWidth: 4.5 },
  { className: 'd-ag-c', delay: 1.82, duration: 0.5, strokeWidth: 4.5 },
  { className: 'd-ag-y', delay: 1.9, duration: 0.5, strokeWidth: 4.5 },
  // ── the three bars close it ──
  { className: 'd-mark', delay: 2.1, duration: 0.6, strokeWidth: 5 },
];

const STYLES = (() => {
  const defs = STROKE_CONFIGS.map(
    ({ className, delay, duration, strokeWidth }) => `
    .${className} {
      stroke-width: ${strokeWidth ?? 7};
      animation: svgDraw ${(duration * DRAW_SPEED).toFixed(2)}s ${(delay * DRAW_SPEED).toFixed(2)}s ease-out forwards;
    }`,
  ).join('');

  return `
    @keyframes svgDraw { to { stroke-dashoffset: 0; } }
    .sp {
      stroke: hsl(32, 100%, 50%);
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      /* pathLength="1" normalises every shape, so each stroke finishes exactly
         when its animation does, whatever its real geometry. */
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
    }
    .d-O {
      stroke-dasharray: ${CIRCLE_LENGTH.toFixed(2)};
      stroke-dashoffset: ${CIRCLE_LENGTH.toFixed(2)};
    }
    ${defs}
    .d-mark { opacity: 0.6; }
    /* A fill cannot be drawn with a dash offset, so it fades in once the O closes. */
    .d-play {
      fill: hsl(32, 100%, 50%);
      opacity: 0;
      animation: playIn ${(0.45 * DRAW_SPEED).toFixed(2)}s ${(1.75 * DRAW_SPEED).toFixed(2)}s ease-out forwards;
    }
    @keyframes playIn { to { opacity: 1; } }
  `;
})();

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

const Preloader = () => {
  const [phase, setPhase] = useState<Phase>(() =>
    typeof window === 'undefined' || seenThisSession() || prefersReducedMotion() ? 'done' : 'draw',
  );
  const [logoReady, setLogoReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
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

  // Each phase owns its own timer. Keeping them in one effect keyed on `phase`
  // meant the cleanup wiped the timers the previous phase had just scheduled,
  // which left the logo on screen until the visitor pressed Skip.
  useEffect(() => {
    if (phase !== 'reveal') return;
    const id = setTimeout(() => setPhase('fadeout'), TIMINGS.HOLD_MS);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'fadeout') return;
    const id = setTimeout(finish, TIMINGS.FADE_MS);
    return () => clearTimeout(id);
  }, [phase, finish]);

  // Mark the session as soon as the intro starts, so a reload mid-animation
  // does not replay it.
  useEffect(() => {
    if (phase !== 'done') markSeen();
  }, [phase]);

  // Hold the page still and keep the rest of the app out of the tab order
  // while the overlay covers it.
  useEffect(() => {
    if (phase === 'done') return;

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
      body.style.overflow = previousOverflow;
      covered.forEach((el) => {
        el.removeAttribute('aria-hidden');
        el.removeAttribute('inert');
      });
    };
  }, [phase]);

  // Leave once the drawing has finished and the assets are in, with a hard
  // ceiling so a slow connection cannot stall the visitor.
  useEffect(() => {
    if (phase !== 'draw') return;

    const started = performance.now();
    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setPhase('reveal');
    };

    const logo = new Image();
    const logoLoaded = new Promise<void>((resolve) => {
      logo.onload = () => {
        setLogoReady(true);
        resolve();
      };
      logo.onerror = () => resolve();
    });
    logo.src = LOGO_URL;

    const fontsReady: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();

    Promise.all([fontsReady, logoLoaded]).then(() => {
      const elapsed = performance.now() - started;
      const floor = Math.max(TIMINGS.DRAW_MS, TIMINGS.MIN_MS);
      addTimer(reveal, Math.max(0, floor - elapsed));
    });

    // Ceiling: reveal regardless once this passes.
    addTimer(reveal, TIMINGS.MAX_MS);

    return clearTimers;
  }, [phase, addTimer, clearTimers, finish]);

  if (phase === 'done') return null;

  const isRevealed = phase === 'reveal' || phase === 'fadeout';
  const isFading = phase === 'fadeout';
  // Only hand over to the bitmap once it has actually loaded, otherwise keep
  // the drawing on screen rather than showing an empty overlay.
  const showLogo = isRevealed && logoReady;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-live="polite"
      aria-label="Loading Triple Vision Agency"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: BACKGROUND,
        opacity: isFading ? 0 : 1,
        transition: `opacity ${TIMINGS.FADE_MS}ms ease-out`,
        willChange: 'opacity',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      {/*
        One box, given the logo's aspect ratio, holding both layers on top of
        each other. Both fill it, so they are the same size and the same place
        at every width, and the box itself is centred by the flex parent.
      */}
      <div
        className="relative w-[min(86vw,420px)]"
        style={{ aspectRatio: SIZES.ASPECT }}
      >
        {/* SVG Stroke Animation */}
        <svg
          viewBox={SIZES.SVG_VIEWBOX}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: showLogo ? 0 : 1,
            transition: 'opacity 0.35s ease-out',
          }}
        >
          <style>{STYLES}</style>

          {/* ══ TRIPLE ══ */}
          <path pathLength="1" className="sp d-T"
            d="M53,65 L99,65 M76,65 L76,121" />
          <path pathLength="1" className="sp d-R"
            d="M103,121 L103,65 L138,65 Q152,65 152,79 Q152,93 138,93 L103,93 L152,121" />
          <path pathLength="1" className="sp d-I1"
            d="M164,65 L164,121" />
          <path pathLength="1" className="sp d-P"
            d="M181,121 L181,65 L214,65 Q228,65 228,80 Q228,95 214,95 L181,95" />
          <path pathLength="1" className="sp d-L"
            d="M232,65 L232,121 L273,121" />
          <path pathLength="1" className="sp d-E1"
            d="M320,65 L277,65 L277,121 L320,121 M277,93 L312,93" />

          {/* ══ VISION — the gap before the V is the word space ══ */}
          <path pathLength="1" className="sp d-V"
            d="M339,65 L368,121 L397,65" />
          <path pathLength="1" className="sp d-I2"
            d="M411,65 L411,121" />
          <path pathLength="1" className="sp d-S"
            d="M471,74 Q471,65 448,65 Q425,65 425,79 Q425,93 448,93 Q471,93 471,107 Q471,121 448,121 Q425,121 425,112" />
          <path pathLength="1" className="sp d-I3"
            d="M484,65 L484,121" />

          {/* The O, with the brand's play mark inside it */}
          <circle className="sp d-O" cx="526.5" cy="93" r="29" />
          <polygon className="d-play" points="519,84 536,93 519,102" />

          <path pathLength="1" className="sp d-N"
            d="M562,121 L562,65 L611,121 L611,65" />

          {/* ══ Agency — small, sentence case, under the end of VISION ══ */}
          <path pathLength="1" className="sp d-ag-A"
            d="M507,148 L517,125 L527,148 M511,141 L523,141" />
          <path pathLength="1" className="sp d-ag-g"
            d="M545,132 Q531,132 531,140 Q531,148 545,148 L545,131 L545,152 Q545,156 538,156" />
          <path pathLength="1" className="sp d-ag-e"
            d="M549,141 L562,141 Q562,132 556,132 Q549,132 549,140 Q549,148 556,148 Q561,148 562,145" />
          <path pathLength="1" className="sp d-ag-n"
            d="M566,148 L566,132 Q579,132 579,140 L579,148" />
          <path pathLength="1" className="sp d-ag-c"
            d="M595,134 Q583,130 583,140 Q583,150 595,146" />
          <path pathLength="1" className="sp d-ag-y"
            d="M599,132 L606,148 M614,132 L606,148 L603,156" />

          {/* The three bars that open the mark */}
          <path pathLength="1" className="sp d-mark"
            d="M14,106 L45,106 M14,112 L45,112 M14,118 L45,118" />
        </svg>

        {/* Logo — takes over once it has loaded */}
        <img
          src={LOGO_URL}
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: showLogo ? 1 : 0,
            transition: 'opacity 0.45s ease-in',
          }}
          onLoad={() => setLogoReady(true)}
          onError={() => setLogoReady(true)}
        />
      </div>

      {/* Skip stays available for the whole intro, not just the drawing. */}
      <button
        type="button"
        onClick={finish}
        className="absolute bottom-8 text-white/70 text-sm hover:text-white transition-colors duration-200 rounded px-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        style={{
          opacity: isFading ? 0 : 1,
          pointerEvents: isFading ? 'none' : 'auto',
          transition: 'opacity 0.3s ease-out',
        }}
      >
        Skip →
      </button>
    </div>
  );
};

export default Preloader;
