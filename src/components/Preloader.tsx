import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================
type Phase = 'draw' | 'reveal' | 'fadeout' | 'done';

interface StrokeConfig {
  className: string;
  len: number;
  delay: number;
  duration: number;
  strokeWidth?: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================
const SESSION_KEY = 'preloaderShown';

const PRELOADER_CONFIG = {
  TIMINGS: {
    DRAW: 2800,
    REVEAL: 3400,
    FADEOUT: 4600,
  },
  COLORS: {
    BACKGROUND: 'hsl(280, 100%, 8%)',
    STROKE: 'hsl(32, 100%, 50%)',
  },
  SIZES: {
    SVG_VIEWBOX: '0 0 340 115',
    DISPLAY_WIDTH: 340,
    DISPLAY_HEIGHT: 115,
    LOGO_WIDTH: 320,
    LOGO_HEIGHT: 64,
  },
  LOGO_URL: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1763917799/logo2_transparent_jjpgv6.png',
} as const;

const STROKE_CONFIGS: StrokeConfig[] = [
  // ── TRIPLE ──
  { className: 'd-T',    len: 70,  delay: 0.0,  duration: 0.9 },
  { className: 'd-R',    len: 130, delay: 0.1,  duration: 1.0 },
  { className: 'd-I1',   len: 35,  delay: 0.2,  duration: 0.7 },
  { className: 'd-P',    len: 110, delay: 0.3,  duration: 1.0 },
  { className: 'd-L',    len: 65,  delay: 0.4,  duration: 0.8 },
  { className: 'd-E1',   len: 100, delay: 0.5,  duration: 1.0 },
  // ── VISION ──
  { className: 'd-V',    len: 75,  delay: 0.65, duration: 0.9 },
  { className: 'd-I2',   len: 35,  delay: 0.75, duration: 0.7 },
  { className: 'd-S',    len: 160, delay: 0.85, duration: 1.1 },
  { className: 'd-I3',   len: 35,  delay: 0.95, duration: 0.7 },
  { className: 'd-O',    len: 95,  delay: 1.05, duration: 1.1, strokeWidth: 5 },
  { className: 'd-N',    len: 105, delay: 1.2,  duration: 1.0 },
  // ── AGENCY ──
  { className: 'd-A',    len: 90,  delay: 1.45, duration: 1.0 },
  { className: 'd-G',    len: 115, delay: 1.55, duration: 1.1 },
  { className: 'd-E2',   len: 100, delay: 1.65, duration: 1.0 },
  { className: 'd-N2',   len: 105, delay: 1.75, duration: 1.0 },
  { className: 'd-C',    len: 90,  delay: 1.85, duration: 1.0 },
  { className: 'd-Y',    len: 80,  delay: 1.95, duration: 0.9 },
  // ── underline ──
  { className: 'd-line', len: 320, delay: 2.1,  duration: 0.7, strokeWidth: 1.5 },
];

// CSS بيتولّد مرة واحدة خارج الـ component
const STYLES = (() => {
  const defs = STROKE_CONFIGS.map(
    ({ className, len, delay, duration, strokeWidth }) => `
    .${className} {
      stroke-dasharray: ${len};
      stroke-dashoffset: ${len};
      stroke-width: ${strokeWidth ?? 3.5};
      animation: svgDraw ${duration}s ${delay}s ease-out forwards;
    }`
  ).join('');

  return `
    @keyframes svgDraw { to { stroke-dashoffset: 0; } }
    .sp {
      stroke: hsl(32, 100%, 50%);
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      will-change: stroke-dashoffset;
    }
    ${defs}
    .d-line { opacity: 0.4; }
  `;
})();

// ============================================================================
// COMPONENT
// ============================================================================
const Preloader = () => {
  const [phase, setPhase] = useState<Phase>(() =>
    sessionStorage.getItem(SESSION_KEY) ? 'done' : 'draw'
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // preload الصورة من أول لحظة — مفيش flash وقت الـ reveal
  useEffect(() => {
    const img = new Image();
    img.src = PRELOADER_CONFIG.LOGO_URL;
    img.onload  = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
  }, []);

  useEffect(() => {
    // prefers-reduced-motion — skip animation تماماً
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || sessionStorage.getItem(SESSION_KEY)) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setPhase('done');
      return;
    }

    const add = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timersRef.current.push(t);
    };

    add(() => setPhase('reveal'),  PRELOADER_CONFIG.TIMINGS.DRAW);
    add(() => setPhase('fadeout'), PRELOADER_CONFIG.TIMINGS.REVEAL);
    add(() => {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setPhase('done');
    }, PRELOADER_CONFIG.TIMINGS.FADEOUT);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  // skip بيمسح الـ timers فوراً
  const handleSkip = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    sessionStorage.setItem(SESSION_KEY, 'true');
    setPhase('done');
  }, []);

  if (phase === 'done') return null;

  const isDrawing  = phase === 'draw';
  const isRevealed = phase === 'reveal' || phase === 'fadeout';
  const isFading   = phase === 'fadeout';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: PRELOADER_CONFIG.COLORS.BACKGROUND,
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        willChange: 'opacity',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      <div
        className="relative flex items-center justify-center px-4"
        style={{ transform: 'scale(1.15)' }}
      >
        {/* SVG Stroke Animation */}
        <svg
          viewBox={PRELOADER_CONFIG.SIZES.SVG_VIEWBOX}
          width={PRELOADER_CONFIG.SIZES.DISPLAY_WIDTH}
          height={PRELOADER_CONFIG.SIZES.DISPLAY_HEIGHT}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="max-w-[85vw]"
          style={{
            opacity: isRevealed ? 0 : 1,
            transition: 'opacity 0.35s ease-out',
            willChange: 'opacity',
          }}
        >
          <style>{STYLES}</style>

          {/* ══ TRIPLE ══ */}

          {/* T — top bar + vertical stem */}
          <path className="sp d-T"
            d="M5,18 L25,18
               M15,18 L15,50" />

          {/* R — vertical + bump + diagonal leg */}
          <path className="sp d-R"
            d="M30,50 L30,18
               L43,18 Q51,18 51,27 Q51,36 43,36
               L30,36
               L51,50" />

          {/* I */}
          <path className="sp d-I1" d="M58,18 L58,50" />

          {/* P — vertical + closed bump */}
          <path className="sp d-P"
            d="M65,50 L65,18
               L78,18 Q86,18 86,27 Q86,36 78,36
               L65,36" />

          {/* L — vertical + floor */}
          <path className="sp d-L"
            d="M93,18 L93,50 L108,50" />

          {/* E — vertical + top + mid + bottom */}
          <path className="sp d-E1"
            d="M115,18 L115,50
               M115,18 L130,18
               M115,34 L127,34
               M115,50 L130,50" />

          {/* ══ VISION ══ */}

          {/* V — top-left → bottom-center → top-right */}
          <path className="sp d-V"
            d="M140,18 L152,50 L164,18" />

          {/* I */}
          <path className="sp d-I2" d="M171,18 L171,50" />

          {/* S — cubic bezier صح: يبدأ أعلى يمين، upper curve، ينزل للوسط، lower curve، ينتهي أسفل يمين */}
          <path className="sp d-S"
            d="M197,24
               C197,18 191,18 186,18
               C181,18 178,22 178,26
               C178,31 183,33 188,35
               C193,37 198,39 198,44
               C198,48 195,52 190,52
               C185,52 181,49 181,44" />

          {/* I */}
          <path className="sp d-I3" d="M206,18 L206,50" />

          {/* O — circle واحدة بس */}
          <circle className="sp d-O" cx="226" cy="34" r="15" />

          {/* N — vertical + diagonal + vertical */}
          <path className="sp d-N"
            d="M248,50 L248,18
               L268,50
               L268,18" />

          {/* ══ AGENCY ══ */}

          {/* A */}
          <path className="sp d-A"
            d="M30,100 L42,68 L54,100
               M35,86 L49,86" />

          {/* G */}
          <path className="sp d-G"
            d="M85,68 Q70,68 70,84 Q70,100 85,100
               L97,100 L97,84 L85,84" />

          {/* E */}
          <path className="sp d-E2"
            d="M107,68 L107,100
               M107,68 L122,68
               M107,84 L119,84
               M107,100 L122,100" />

          {/* N */}
          <path className="sp d-N2"
            d="M131,100 L131,68
               L148,100
               L148,68" />

          {/* C */}
          <path className="sp d-C"
            d="M182,68 Q165,68 165,84 Q165,100 182,100" />

          {/* Y */}
          <path className="sp d-Y"
            d="M193,68 L202,82 L211,68
               M202,82 L202,100" />

          {/* underline */}
          <path className="sp d-line" d="M5,110 L280,110" />

        </svg>

        {/* Logo — بيظهر بعد ما الـ SVG يختفي */}
        <img
          src={PRELOADER_CONFIG.LOGO_URL}
          alt="Triple Vision Agency"
          width={PRELOADER_CONFIG.SIZES.LOGO_WIDTH}
          height={PRELOADER_CONFIG.SIZES.LOGO_HEIGHT}
          className="absolute max-w-[85vw]"
          style={{
            opacity: isRevealed && imageLoaded ? 1 : 0,
            transition: 'opacity 0.45s ease-in',
            willChange: 'opacity',
          }}
          onError={() => setImageLoaded(true)}
        />
      </div>

      {/* Skip button — keyboard accessible */}
      <button
        onClick={handleSkip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSkip();
          }
        }}
        className="absolute bottom-8 text-white/50 text-sm hover:text-white/90 transition-colors duration-200 rounded px-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        style={{
          opacity: isDrawing ? 1 : 0,
          pointerEvents: isDrawing ? 'auto' : 'none',
          transition: 'opacity 0.3s ease-out',
        }}
        aria-label="Skip intro animation"
      >
        Skip →
      </button>
    </div>
  );
};

export default Preloader;