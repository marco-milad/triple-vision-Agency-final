import { useState, useEffect } from 'react';

const SESSION_KEY = 'preloaderShown';

const Preloader = () => {
  const [phase, setPhase] = useState<'draw' | 'reveal' | 'fadeout' | 'done'>(() =>
    sessionStorage.getItem(SESSION_KEY) ? 'done' : 'draw'
  );

  useEffect(() => {
    if (phase === 'done') return;

    const t1 = setTimeout(() => setPhase('reveal'), 1500);
    const t2 = setTimeout(() => setPhase('fadeout'), 1900);
    const t3 = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setPhase('done');
    }, 2200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center`}
      style={{
        background: 'hsl(280, 100%, 8%)',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.3s ease-out',
        pointerEvents: phase === 'fadeout' ? 'none' : 'auto',
      }}
    >
      {/* SVG stroke drawing */}
      <div
        className="relative flex items-center justify-center"
        style={{
          transform: phase === 'reveal' || phase === 'fadeout' ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.4s ease-out',
        }}
      >
        <svg
          viewBox="0 0 400 80"
          width="320"
          height="64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            opacity: phase === 'reveal' || phase === 'fadeout' ? 0 : 1,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          <style>{`
            @keyframes draw {
              from { stroke-dashoffset: var(--len); }
              to { stroke-dashoffset: 0; }
            }
            .stroke-path {
              stroke: hsl(32, 100%, 50%);
              stroke-width: 2;
              stroke-linecap: round;
              stroke-linejoin: round;
              fill: none;
              will-change: stroke-dashoffset;
            }
            .d1 { --len: 120; stroke-dasharray: 120; animation: draw 1.2s ease-out forwards; }
            .d2 { --len: 100; stroke-dasharray: 100; animation: draw 1.2s 0.1s ease-out forwards; stroke-dashoffset: 100; }
            .d3 { --len: 80; stroke-dasharray: 80; animation: draw 1.1s 0.15s ease-out forwards; stroke-dashoffset: 80; }
            .d4 { --len: 90; stroke-dasharray: 90; animation: draw 1.1s 0.2s ease-out forwards; stroke-dashoffset: 90; }
            .d5 { --len: 70; stroke-dasharray: 70; animation: draw 1s 0.25s ease-out forwards; stroke-dashoffset: 70; }
            .d6 { --len: 100; stroke-dasharray: 100; animation: draw 1.2s 0.3s ease-out forwards; stroke-dashoffset: 100; }
            .d7 { --len: 90; stroke-dasharray: 90; animation: draw 1.1s 0.15s ease-out forwards; stroke-dashoffset: 90; }
            .d8 { --len: 80; stroke-dasharray: 80; animation: draw 1s 0.2s ease-out forwards; stroke-dashoffset: 80; }
            .d9 { --len: 70; stroke-dasharray: 70; animation: draw 1s 0.25s ease-out forwards; stroke-dashoffset: 70; }
            .d10 { --len: 80; stroke-dasharray: 80; animation: draw 1s 0.3s ease-out forwards; stroke-dashoffset: 80; }
            .d11 { --len: 100; stroke-dasharray: 100; animation: draw 1.2s 0.35s ease-out forwards; stroke-dashoffset: 100; }
            .circle-path { --len: 126; stroke-dasharray: 126; animation: draw 1.3s 0.4s ease-out forwards; stroke-dashoffset: 126; stroke-width: 2.5; }
            .underline-path { --len: 200; stroke-dasharray: 200; animation: draw 0.8s 0.8s ease-out forwards; stroke-dashoffset: 200; stroke-width: 1; opacity: 0.5; }
          `}</style>

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
          {/* S */}
          <path className="stroke-path d9" d="M200,25 Q200,20 205,20 L215,20 Q220,20 220,25 Q220,32 210,35 Q195,38 195,45 Q195,50 200,50 L215,50 Q220,50 220,45" />
          {/* I */}
          <path className="stroke-path d10" d="M228,20 L228,50" />
          {/* O (the iconic circle/eye) */}
          <circle className="stroke-path circle-path" cx="252" cy="35" r="20" />
          {/* N */}
          <path className="stroke-path d11" d="M280,50 L280,20 L300,50 L300,20" />

          {/* Subtle underline */}
          <path className="stroke-path underline-path" d="M10,65 L300,65" />
        </svg>

        {/* Actual logo fade-in */}
        <img
          src="https://res.cloudinary.com/dcui0elwh/image/upload/v1763917799/logo2_transparent_jjpgv6.png"
          alt="Triple Vision Agency"
          width={320}
          height={64}
          className="absolute"
          style={{
            opacity: phase === 'reveal' || phase === 'fadeout' ? 1 : 0,
            transition: 'opacity 0.4s ease-in',
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;
