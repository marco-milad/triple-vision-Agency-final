import { useState, useEffect, useMemo } from 'react';

// ============================================================================
// TYPES
// ============================================================================
type Phase = 'draw' | 'reveal' | 'fadeout' | 'done';

interface StrokeConfig {
  className: string;
  len: number;
  delay: number;
  duration: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================
const SESSION_KEY = 'preloaderShown';

const PRELOADER_CONFIG = {
  TIMINGS: {
    DRAW: 3500,    // الرسم: 3.5 ثانية (كان 2.5) ← +1 ثانية
    REVEAL: 4200,  // بداية الظهور: 4.2 ثانية (كان 3.2)
    FADEOUT: 5800, // بداية الاختفاء: 5.8 ثانية (كان 4.8)
  },
  COLORS: {
    BACKGROUND: 'hsl(280, 100%, 8%)',
    STROKE: 'hsl(32, 100%, 50%)',
  },
  SIZES: {
    WIDTH: 320,
    HEIGHT: 64,
    SVG_VIEWBOX: '0 0 400 110', // ← زودنا الارتفاع من 80 لـ 110 عشان AGENCY
    DRAW_WIDTH: 640,   // ← ضعف الحجم للـ draw
    DRAW_HEIGHT: 128,  // ← ضعف الحجم للـ draw
  },
  LOGO_URL: 'https://res.cloudinary.com/dcui0elwh/image/upload/v1763917799/logo2_transparent_jjpgv6.png',
} as const;

const STROKE_CONFIGS: StrokeConfig[] = [
  { className: 'd1', len: 120, delay: 0, duration: 1.2 },      // T
  { className: 'd2', len: 100, delay: 0.1, duration: 1.2 },    // R
  { className: 'd3', len: 80, delay: 0.2, duration: 1.1 },     // I
  { className: 'd4', len: 90, delay: 0.3, duration: 1.1 },     // P
  { className: 'd5', len: 70, delay: 0.4, duration: 1.0 },     // L
  { className: 'd6', len: 100, delay: 0.5, duration: 1.2 },    // E
  { className: 'd7', len: 90, delay: 0.6, duration: 1.1 },     // V ← كان 0.15
  { className: 'd8', len: 80, delay: 0.7, duration: 1.0 },     // I ← كان 0.2
  { className: 'd9', len: 70, delay: 0.8, duration: 1.0 },     // S ← كان 0.25
  { className: 'd10', len: 80, delay: 0.9, duration: 1.0 },    // I ← كان 0.3
  { className: 'd11', len: 100, delay: 1.1, duration: 1.2 },   // N ← كان 0.35
  // AGENCY - السطر التاني
  { className: 'd12', len: 90, delay: 1.4, duration: 1.1 },    // A
  { className: 'd13', len: 95, delay: 1.5, duration: 1.2 },    // G
  { className: 'd14', len: 100, delay: 1.6, duration: 1.2 },   // E
  { className: 'd15', len: 80, delay: 1.7, duration: 1.0 },    // N
  { className: 'd16', len: 95, delay: 1.8, duration: 1.1 },    // C
  { className: 'd17', len: 85, delay: 1.9, duration: 1.0 },    // Y
];

const SPECIAL_PATHS = {
  circle: { len: 94, delay: 1.0, duration: 1.3, strokeWidth: 5 }, // O (في VISION)
  underline: { len: 300, delay: 2.1, duration: 0.8, strokeWidth: 2, opacity: 0.5 }, // ← بعد AGENCY، وأطول
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
const generateStrokeStyles = (): string => {
  const baseStyles = `
    @keyframes draw {
      from { stroke-dashoffset: var(--len); }
      to { stroke-dashoffset: 0; }
    }
    .stroke-path {
      stroke: ${PRELOADER_CONFIG.COLORS.STROKE};
      stroke-width: 4; /* ← كان 2، دلوقتي 4 (ضعف السُمك) */
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      will-change: stroke-dashoffset;
    }
  `;

  const strokeStyles = STROKE_CONFIGS.map(
    ({ className, len, delay, duration }) => `
    .${className} { 
      --len: ${len}; 
      stroke-dasharray: ${len}; 
      animation: draw ${duration}s ${delay}s ease-out forwards; 
      stroke-dashoffset: ${len}; 
    }
  `
  ).join('');

  const specialStyles = `
    .circle-path { 
      --len: ${SPECIAL_PATHS.circle.len}; 
      stroke-dasharray: ${SPECIAL_PATHS.circle.len}; 
      animation: draw ${SPECIAL_PATHS.circle.duration}s ${SPECIAL_PATHS.circle.delay}s ease-out forwards; 
      stroke-dashoffset: ${SPECIAL_PATHS.circle.len}; 
      stroke-width: ${SPECIAL_PATHS.circle.strokeWidth}; 
    }
    .underline-path { 
      --len: ${SPECIAL_PATHS.underline.len}; 
      stroke-dasharray: ${SPECIAL_PATHS.underline.len}; 
      animation: draw ${SPECIAL_PATHS.underline.duration}s ${SPECIAL_PATHS.underline.delay}s ease-out forwards; 
      stroke-dashoffset: ${SPECIAL_PATHS.underline.len}; 
      stroke-width: ${SPECIAL_PATHS.underline.strokeWidth}; 
      opacity: ${SPECIAL_PATHS.underline.opacity}; 
    }
  `;

  return baseStyles + strokeStyles + specialStyles;
};

// ============================================================================
// COMPONENT - VERSION 2: Constant Large Scale (1.2 طول الوقت)
// ============================================================================
const Preloader = () => {
  const [phase, setPhase] = useState<Phase>(() =>
    sessionStorage.getItem(SESSION_KEY) ? 'done' : 'draw'
  );
  const [imageLoaded, setImageLoaded] = useState(false);

  // Check for prefers-reduced-motion and skip animation if needed
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setPhase('done');
      return;
    }

    if (phase === 'done') return;

    let mounted = true;

    const t1 = setTimeout(() => {
      if (mounted) setPhase('reveal');
    }, PRELOADER_CONFIG.TIMINGS.DRAW);

    const t2 = setTimeout(() => {
      if (mounted) setPhase('fadeout');
    }, PRELOADER_CONFIG.TIMINGS.REVEAL);

    const t3 = setTimeout(() => {
      if (mounted) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setPhase('done');
      }
    }, PRELOADER_CONFIG.TIMINGS.FADEOUT);

    return () => {
      mounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Memoized styles for performance
  const containerStyle = useMemo(
    () => ({
      background: PRELOADER_CONFIG.COLORS.BACKGROUND,
      opacity: phase === 'fadeout' ? 0 : 1,
      transition: 'opacity 0.3s ease-out',
      pointerEvents: phase === 'fadeout' ? ('none' as const) : ('auto' as const),
    }),
    [phase]
  );

  // VERSION 2: كبير طول الوقت (1.2)
  const wrapperStyle = useMemo(
    () => ({
      transform: 'scale(1.2)', // كبير من البداية للنهاية
      transition: 'transform 0.4s ease-out',
    }),
    []
  );

  // حجم الـ SVG يتغير حسب الـ phase والشاشة
  const svgSize = useMemo(() => {
    const baseWidth = phase === 'draw' ? PRELOADER_CONFIG.SIZES.DRAW_WIDTH : PRELOADER_CONFIG.SIZES.WIDTH;
    const baseHeight = phase === 'draw' ? PRELOADER_CONFIG.SIZES.DRAW_HEIGHT : PRELOADER_CONFIG.SIZES.HEIGHT;
    
    // Responsive: تصغير على الشاشات الصغيرة
    const scale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.7 : 1;
    
    return {
      width: baseWidth * scale,
      height: baseHeight * scale,
    };
  }, [phase]);

  const svgStyle = useMemo(
    () => ({
      opacity: phase === 'reveal' || phase === 'fadeout' ? 0 : 1,
      transition: 'opacity 0.3s ease-out',
    }),
    [phase]
  );

  const imageStyle = useMemo(
    () => ({
      opacity: (phase === 'reveal' || phase === 'fadeout') && imageLoaded ? 1 : 0,
      transition: 'opacity 0.4s ease-in',
    }),
    [phase, imageLoaded]
  );

  const skipButtonStyle = useMemo(
    () => ({
      opacity: phase === 'draw' ? 1 : 0,
      transition: 'opacity 0.3s ease-out',
      pointerEvents: phase === 'draw' ? ('auto' as const) : ('none' as const),
    }),
    [phase]
  );

  // Skip handler
  const handleSkip = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setPhase('done');
  };

  // Image handlers
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error('Preloader logo failed to load');
    setImageLoaded(true);
  };

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={containerStyle}
    >
      <div className="relative flex items-center justify-center px-4" style={wrapperStyle}>
        {/* SVG stroke drawing */}
        <svg
          viewBox={PRELOADER_CONFIG.SIZES.SVG_VIEWBOX}
          width={svgSize.width}
          height={svgSize.height}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="max-w-[90vw]" 
          style={{
            ...svgStyle,
            transition: 'opacity 0.3s ease-out, width 0.4s ease-out, height 0.4s ease-out',
          }}
        >
          <style>{generateStrokeStyles()}</style>

          {/* T */}
          <path className="stroke-path d1" d="M10,20 L30,20 M20,20 L20,50" />
          {/* R */}
          <path className="stroke-path d2" d="M35,50 L35,20 L48,20 Q55,20 55,28 Q55,36 48,36 L35,36 L55,50" />
          {/* I */}
          <path className="stroke-path d3" d="M62,20 L62,50" />
          {/* P */}
          <path className="stroke-path d4" d="M70,50 L70,20 L83,20 Q90,20 90,28 Q90,36 83,36 L70,36" />
          {/* L */}
          <path className="stroke-path d5" d="M97,20 L97,50 L112,50" />
          {/* E */}
          <path className="stroke-path d6" d="M119,20 L119,50 L134,50 M119,20 L134,20 M119,35 L131,35" />

          {/* V */}
          <path className="stroke-path d7" d="M155,20 L165,50 L175,20" />
          {/* I */}
          <path className="stroke-path d8" d="M182,20 L182,50" />
          {/* S - معدّل عشان يرسم من فوق لتحت */}
          <path className="stroke-path d9" d="M220,25 Q220,20 215,20 L205,20 Q200,20 200,25 Q200,32 210,35 Q220,38 220,45 Q220,50 215,50 L200,50 Q195,50 195,45" />
          {/* I */}
          <path className="stroke-path d10" d="M228,20 L228,50" />
          {/* O (the iconic circle/eye) - حجم متوسط */}
          <circle className="stroke-path circle-path" cx="252" cy="35" r="15" />
          {/* N */}
          <path className="stroke-path d11" d="M280,50 L280,20 L300,50 L300,20" />

          {/* AGENCY - السطر التاني */}
          {/* A */}
          <path className="stroke-path d12" d="M80,85 L90,60 L100,85 M85,75 L95,75" />
          {/* G */}
          <path className="stroke-path d13" d="M120,60 Q105,60 105,72.5 Q105,85 120,85 L130,85 L130,72.5 L120,72.5" />
          {/* E */}
          <path className="stroke-path d14" d="M140,60 L140,85 L155,85 M140,60 L155,60 M140,72.5 L152,72.5" />
          {/* N */}
          <path className="stroke-path d15" d="M165,85 L165,60 L180,85 L180,60" />
          {/* C */}
          <path className="stroke-path d16" d="M205,60 Q190,60 190,72.5 Q190,85 205,85" />
          {/* Y */}
          <path className="stroke-path d17" d="M215,60 L222.5,72.5 L230,60 M222.5,72.5 L222.5,85" />

          {/* O (the iconic circle/eye) - حجم متوسط */}
          <circle className="stroke-path circle-path" cx="252" cy="35" r="15" />

          {/* Subtle underline */}
          <path className="stroke-path underline-path" d="M10,95 L300,95" />
        </svg>

        {/* Actual logo fade-in */}
        <img
          src={PRELOADER_CONFIG.LOGO_URL}
          alt="Triple Vision Agency"
          width={PRELOADER_CONFIG.SIZES.WIDTH}
          height={PRELOADER_CONFIG.SIZES.HEIGHT}
          className="absolute max-w-[90vw]"
          style={imageStyle}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 text-white/60 text-sm hover:text-white/90 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-3 py-1"
        style={skipButtonStyle}
        aria-label="Skip preloader animation"
      >
        Skip →
      </button>
    </div>
  );
};

export default Preloader;