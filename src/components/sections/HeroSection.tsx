import { motion, type TargetAndTransition, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Rocket, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

interface HeroSectionProps {
  onContactClick: () => void;
  onShowreelClick?: () => void;
}

// ✅ Constants outside component - REDUCED
const CARD_COLORS = [
  'from-primary/20 to-orange-500/10',
  'from-orange-500/20 to-pink-500/10',
  'from-pink-500/20 to-purple-500/10',
] as const;

const CARD_POSITIONS = [
  { top: '25%', left: '8%' },
  { top: '50%', left: '8%' },
  { top: '25%', right: '8%' },
] as const;

const TRUST_INDICATORS = [
  { icon: Star, label: '600+ Projects', color: 'from-primary to-orange-500' },
  { icon: Award, label: '250+ Clients', color: 'from-orange-500 to-pink-500' },
  { icon: Sparkles, label: '11+ Years', color: 'from-pink-500 to-purple-500' },
] as const;

const GRID_STYLE = {
  backgroundImage: `
    linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px'
} as const;

const HeroSection = ({ onContactClick, onShowreelClick }: HeroSectionProps) => {
  const { ref: intersectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  const containerRef = useRef<HTMLElement>(null);
  const rafIdRef = useRef<number | null>(null);
  
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Device detection with RAF throttling and debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkDevice = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        rafIdRef.current = requestAnimationFrame(() => {
          const mobile = window.innerWidth < 768;
          setIsMobile(mobile);
          const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          const cores = navigator.hardwareConcurrency || 1;
          setIsLowPerformance(isMobileDevice && cores <= 4);
          rafIdRef.current = null;
        });
      }, 150);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      clearTimeout(timeoutId);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Reduced card count from 6 to 3
  const cardCount = useMemo(() => 
    isLowPerformance ? 0 : isMobile ? 0 : 3
  , [isLowPerformance, isMobile]);

  const shouldAnimate = useMemo(() => 
    inView && !prefersReducedMotion && !isLowPerformance
  , [inView, prefersReducedMotion, isLowPerformance]);

  const getAnimationProps = useCallback((animation: TargetAndTransition): TargetAndTransition | Record<string, never> => {
    return shouldAnimate ? animation : {};
  }, [shouldAnimate]);

  const blurClass = useMemo(() => 
    isMobile ? 'blur-[30px]' : 'blur-[60px]'
  , [isMobile]);

  const setRefs = useCallback((node: HTMLElement | null) => {
    containerRef.current = node;
    intersectionRef(node);
  }, [intersectionRef]);

  return (
    <motion.section 
      ref={setRefs}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background will-change-transform"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '100vh' }}
      aria-label="Hero section"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Background Elements - REDUCED from 3 blobs to 2 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 ${blurClass} will-change-transform`}
          style={{ 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            animation: shouldAnimate ? 'heroRotate 25s linear infinite, heroPulse 4s ease-in-out infinite' : 'none'
          }}
        />
        
        <div
          className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-orange-500/20 to-pink-500/20 ${blurClass} will-change-transform`}
          style={{ 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            animation: shouldAnimate ? 'heroRotateReverse 20s linear infinite' : 'none'
          }}
        />

        {/* Static Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={GRID_STYLE} />

        {/* ❌ REMOVED: Floating Particles */}
        {/* ❌ REMOVED: Floating Icons */}

        {/* Floating 3D Cards - REDUCED from 6 to 3 */}
        {cardCount > 0 && shouldAnimate && Array.from({ length: cardCount }, (_, i) => (
          <div
            key={i}
            style={{
              ...CARD_POSITIONS[i],
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              animation: `heroCardFloat ${6 + i}s ease-in-out infinite ${i * 0.5}s`
            }}
            className={`absolute w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${CARD_COLORS[i]} backdrop-blur-sm border border-primary/20 shadow-2xl will-change-transform`}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", type: 'spring' as const }}
            className="mb-8 md:mb-10"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-orange-500/10 to-pink-500/10 backdrop-blur-xl shadow-2xl shadow-primary/20 group relative overflow-hidden"
            >
              {!isMobile && shouldAnimate && (
                <div
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 will-change-transform"
                  style={{ animation: 'heroShimmer 3s linear infinite 2s' }}
                />
              )}
              
              <div 
                className="will-change-transform"
                style={{ 
                  transform: 'translateZ(0)',
                  animation: shouldAnimate ? 'heroSpin 3s linear infinite' : 'none'
                }}
              >
                <Zap className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              
              <span className="text-primary text-sm md:text-base font-black uppercase tracking-wider relative z-10">
                Premium Creative Agency
              </span>
              
              <Rocket className="w-5 h-5 text-orange-500" aria-hidden="true" />
            </motion.div>
          </motion.div>

          {/* Main Headline - ❌ REMOVED Title Glow */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-6"
          >
            <span className="inline-block text-foreground">Transform Your </span>
            <br className="hidden sm:block" />
            <span className="inline-block bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Vision
            </span>
            <br />
            <span className="inline-block text-foreground">Into </span>
            <span className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-primary bg-clip-text text-transparent">
              Reality
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed px-4"
          >
            We craft{' '}
            <span className="text-primary font-bold relative inline-block group">
              cinematic experiences
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </span>
            {' '}and{' '}
            <span className="text-orange-500 font-bold relative inline-block group">
              immersive storytelling
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </span>
            {' '}that captivate audiences and elevate your brand to new heights.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="hero"
                size="xl"
                onClick={onContactClick}
                className="group w-full sm:w-auto relative overflow-hidden shadow-2xl shadow-primary/30"
                aria-label="Start your project with us"
              >
                {!isMobile && shouldAnimate && (
                  <div
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 will-change-transform"
                    style={{ animation: 'heroShimmer 2s linear infinite 1s' }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="hero-outline"
                size="xl"
                onClick={() => onShowreelClick?.()}
                className="group w-full sm:w-auto relative backdrop-blur-xl border-2 shadow-2xl overflow-hidden"
                aria-label="Watch our showreel video"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="w-5 h-5" aria-hidden="true" />
                  Watch Showreel
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {TRUST_INDICATORS.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-3 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-0.5 shadow-xl group-hover:shadow-2xl transition-all`}>
                  <div className="w-full h-full rounded-xl bg-background/95 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <span className="text-foreground font-bold text-sm md:text-base">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Bottom Line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden="true" 
      />

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 rounded-br-full bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-tl-full bg-gradient-to-tl from-orange-500/5 to-transparent" />

      {/* ✅ CSS Keyframes - Removed unused animations */}
      <style>{`
        @keyframes heroRotate {
          from { transform: translateZ(0) rotate(0deg) scale(1); }
          50% { transform: translateZ(0) rotate(180deg) scale(1.2); }
          to { transform: translateZ(0) rotate(360deg) scale(1); }
        }
        
        @keyframes heroRotateReverse {
          from { transform: translateZ(0) rotate(360deg) scale(1); }
          50% { transform: translateZ(0) rotate(180deg) scale(1.15); }
          to { transform: translateZ(0) rotate(0deg) scale(1); }
        }
        
        @keyframes heroCardFloat {
          0%, 100% { transform: translateZ(0) translateY(0) rotate(0deg); }
          50% { transform: translateZ(0) translateY(-25px) rotate(10deg); }
        }
        
        @keyframes heroSpin {
          from { transform: translateZ(0) rotate(0deg); }
          to { transform: translateZ(0) rotate(360deg); }
        }
        
        @keyframes heroPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes heroShimmer {
          from { transform: translateX(-150%) skewX(-12deg); }
          to { transform: translateX(150%) skewX(-12deg); }
        }
      `}</style>
    </motion.section>
  );
};

export default React.memo(HeroSection, (prevProps, nextProps) => {
  return prevProps.onContactClick === nextProps.onContactClick &&
         prevProps.onShowreelClick === nextProps.onShowreelClick;
});