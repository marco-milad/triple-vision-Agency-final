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
  SVG_VIEWBOX: '0 0 340 115',
  DISPLAY_WIDTH: 340,
  DISPLAY_HEIGHT: 115,
  LOGO_WIDTH: 320,
  LOGO_HEIGHT: 64,
} as const;

const LOGO_URL =
  'https://res.cloudinary.com/dcui0elwh/image/upload/f_auto,q_auto,w_640/v1763917799/logo2_transparent_jjpgv6.png';

/** Circumference of the "O" (r=15); pathLength is unreliable on <circle>. */
const CIRCLE_LENGTH = 2 * Math.PI * 15;

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
  { className: 'd-O', delay: 1.05, duration: 1.1, strokeWidth: 5 },
  { className: 'd-N', delay: 1.2, duration: 1.0 },
  // ── AGENCY ──
  { className: 'd-A', delay: 1.45, duration: 1.0 },
  { className: 'd-G', delay: 1.55, duration: 1.1 },
  { className: 'd-E2', delay: 1.65, duration: 1.0 },
  { className: 'd-N2', delay: 1.75, duration: 1.0 },
  { className: 'd-C', delay: 1.85, duration: 1.0 },
  { className: 'd-Y', delay: 1.95, duration: 0.9 },
  // ── underline ──
  { className: 'd-line', delay: 2.1, duration: 0.7, strokeWidth: 1.5 },
];

const STYLES = (() => {
  const defs = STROKE_CONFIGS.map(
    ({ className, delay, duration, strokeWidth }) => `
    .${className} {
      stroke-width: ${strokeWidth ?? 3.5};
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
    .d-line { opacity: 0.4; }
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
      addTimer(() => setPhase('fadeout'), TIMINGS.HOLD_MS);
      addTimer(finish, TIMINGS.HOLD_MS + TIMINGS.FADE_MS);
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
      <div className="relative flex items-center justify-center px-4" style={{ transform: 'scale(1.15)' }}>
        {/* SVG Stroke Animation */}
        <svg
          viewBox={SIZES.SVG_VIEWBOX}
          width={SIZES.DISPLAY_WIDTH}
          height={SIZES.DISPLAY_HEIGHT}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="max-w-[85vw]"
          style={{
            opacity: showLogo ? 0 : 1,
            transition: 'opacity 0.35s ease-out',
          }}
        >
          <style>{STYLES}</style>

          {/* ══ TRIPLE ══ */}

          {/* T — top bar + vertical stem */}
          <path pathLength="1" className="sp d-T"
            d="M5,18 L25,18
               M15,18 L15,50" />

          {/* R — vertical + bump + diagonal leg */}
          <path pathLength="1" className="sp d-R"
            d="M30,50 L30,18
               L43,18 Q51,18 51,27 Q51,36 43,36
               L30,36
               L51,50" />

          {/* I */}
          <path pathLength="1" className="sp d-I1" d="M58,18 L58,50" />

          {/* P — vertical + closed bump */}
          <path pathLength="1" className="sp d-P"
            d="M65,50 L65,18
               L78,18 Q86,18 86,27 Q86,36 78,36
               L65,36" />

          {/* L — vertical + floor */}
          <path pathLength="1" className="sp d-L"
            d="M93,18 L93,50 L108,50" />

          {/* E — vertical + top + mid + bottom */}
          <path pathLength="1" className="sp d-E1"
            d="M115,18 L115,50
               M115,18 L130,18
               M115,34 L127,34
               M115,50 L130,50" />

          {/* ══ VISION ══ */}

          {/* V — top-left → bottom-center → top-right */}
          <path pathLength="1" className="sp d-V"
            d="M140,18 L152,50 L164,18" />

          {/* I */}
          <path pathLength="1" className="sp d-I2" d="M171,18 L171,50" />

          {/* S — starts top right, upper curve, through the middle, lower curve */}
          <path pathLength="1" className="sp d-S"
            d="M197,24
               C197,18 191,18 186,18
               C181,18 178,22 178,26
               C178,31 183,33 188,35
               C193,37 198,39 198,44
               C198,48 195,52 190,52
               C185,52 181,49 181,44" />

          {/* I */}
          <path pathLength="1" className="sp d-I3" d="M206,18 L206,50" />

          {/* O — the lens motif */}
          <circle className="sp d-O" cx="226" cy="34" r="15" />

          {/* N — vertical + diagonal + vertical */}
          <path pathLength="1" className="sp d-N"
            d="M248,50 L248,18
               L268,50
               L268,18" />

          {/* ══ AGENCY ══ */}

          {/* A */}
          <path pathLength="1" className="sp d-A"
            d="M30,100 L42,68 L54,100
               M35,86 L49,86" />

          {/* G */}
          <path pathLength="1" className="sp d-G"
            d="M85,68 Q70,68 70,84 Q70,100 85,100
               L97,100 L97,84 L85,84" />

          {/* E */}
          <path pathLength="1" className="sp d-E2"
            d="M107,68 L107,100
               M107,68 L122,68
               M107,84 L119,84
               M107,100 L122,100" />

          {/* N */}
          <path pathLength="1" className="sp d-N2"
            d="M131,100 L131,68
               L148,100
               L148,68" />

          {/* C */}
          <path pathLength="1" className="sp d-C"
            d="M182,68 Q165,68 165,84 Q165,100 182,100" />

          {/* Y */}
          <path pathLength="1" className="sp d-Y"
            d="M193,68 L202,82 L211,68
               M202,82 L202,100" />

          {/* underline */}
          <path pathLength="1" className="sp d-line" d="M5,110 L280,110" />

        </svg>

        {/* Logo — takes over once it has loaded */}
        <img
          src={LOGO_URL}
          alt=""
          width={SIZES.LOGO_WIDTH}
          height={SIZES.LOGO_HEIGHT}
          className="absolute max-w-[85vw]"
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
