import { motion, type TargetAndTransition } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

interface HeroSectionProps {
  onContactClick: () => void;
  onShowreelClick?: () => void;
}

const HeroSection = ({ onContactClick, onShowreelClick }: HeroSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Check for mobile device and low performance
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Check for low performance devices
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const cores = navigator.hardwareConcurrency || 1;
      const isLowEnd = isMobileDevice && cores <= 4;
      setIsLowPerformance(isLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Loading state for smooth entrance
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Number of floating cards based on device
  const cardCount = isLowPerformance ? 0 : isMobile ? 2 : 5;

  // Animation configurations based on preferences
  const getAnimationProps = (animation: TargetAndTransition): TargetAndTransition | Record<string, never> => {
    return prefersReducedMotion || isLowPerformance ? {} : animation;
  };

  // Get optimized blur value based on device performance
  const getBlurValue = (desktop: number, mobile: number, lowEnd: number) => {
    if (isLowPerformance) return `blur-[${lowEnd}px]`;
    if (isMobile) return `blur-[${mobile}px]`;
    return `blur-[${desktop}px]`;
  };

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
      aria-label="Hero section"
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* 3D Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Layer 1 - Deepest */}
        <motion.div className="absolute inset-0">
          <motion.div
            animate={getAnimationProps({
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            })}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 ${getBlurValue(120, 60, 30)}`}
          />
        </motion.div>

        {/* Layer 2 - Middle */}
        <motion.div className="absolute inset-0">
          <motion.div
            animate={getAnimationProps({
              rotate: [360, 0],
              scale: [1, 1.1, 1],
            })}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-orange-500/20 to-pink-500/20 ${getBlurValue(140, 70, 35)}`}
          />
        </motion.div>

        {/* Layer 3 - Closest */}
        <motion.div className="absolute inset-0">
          <motion.div
            animate={getAnimationProps({
              y: [0, -30, 0],
              x: [0, 20, 0],
            })}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-transparent ${getBlurValue(100, 50, 25)}`}
          />
        </motion.div>

        {/* Animated Grid */}
        <motion.div
          animate={getAnimationProps({
            backgroundPosition: ['0px 0px', '60px 60px'],
          })}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,140,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,140,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating 3D Cards */}
        {cardCount > 0 && [...Array(cardCount)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              willChange: 'transform',
              top: `${20 + i * 15}%`,
              left: `${10 + i * 18}%`,
              transform: 'translateZ(50px)',
            }}
            animate={getAnimationProps({
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            })}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className={`absolute w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/10 backdrop-blur-sm border border-primary/20 shadow-2xl`}
          />
        ))}
      </div>

      {/* Main Content with 3D Transform */}
      <motion.div 
        className="container mx-auto px-6 py-20 relative z-10"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, z: -50 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 md:mb-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary/30 bg-gradient-to-r from-primary/20 to-purple-500/20 backdrop-blur-xl text-primary text-sm font-bold shadow-2xl"
              whileHover={{ scale: 1.05, z: 20 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={getAnimationProps({ rotate: 360 })}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-4 h-4" aria-hidden="true" />
              </motion.div>
              Premium 3D Creative Agency
              <Rocket className="w-4 h-4" aria-hidden="true" />
            </motion.span>
          </motion.div>

          {/* 3D Text with Layers */}
          <div className="relative mb-6 md:mb-8" style={{ transformStyle: 'preserve-3d' }}>
            {/* Shadow Layer */}
            {!prefersReducedMotion && !isLowPerformance && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight blur-sm tracking-wider"
                style={{ transform: 'translateZ(-30px)', wordSpacing: '0.5em' }}
              >
                <span className="text-primary">WHERE </span>
                <span className="text-primary">CREATIVITY MEETS</span>
                <br />
                <span className="text-primary">TECHNOLOGY</span>
              </motion.h1>
            )}

            {/* Main Text Layer */}
            <motion.h1
              initial={{ opacity: 0, y: 30, z: -100 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-wider"
              style={{ transformStyle: 'preserve-3d', wordSpacing: '0.5em' }}
            >
              <motion.span 
                className="inline-block text-foreground"
                whileHover={{ scale: 1.05, z: 30 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                WHERE{' '}
              </motion.span>
              <motion.span 
                className="inline-block bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05, z: 30 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                CREATIVITY
              </motion.span>
              <br />
              <motion.span 
                className="inline-block text-foreground"
                whileHover={{ scale: 1.05, z: 30 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                MEETS{' '}
              </motion.span>
              <motion.span 
                className="inline-block bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05, z: 30 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                TECHNOLOGY
              </motion.span>
            </motion.h1>

          </div>

          {/* Subheadline with 3D Effect */}
          <motion.p
            initial={{ opacity: 0, y: 30, z: -50 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground/90 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed px-4 font-medium"
            style={{ transformStyle: 'preserve-3d' }}
          >
            We craft <span className="text-primary font-bold">immersive 3D experiences</span> and{' '}
            <span className="text-primary font-bold">cinematic storytelling</span> that captivate audiences 
            and elevate your brand to new heights.
          </motion.p>

          {/* 3D Interactive Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30, z: -50 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              whileHover={{ scale: 1.05, z: 50 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => onContactClick?.()}
                className="group w-full sm:w-auto relative overflow-hidden shadow-2xl"
                aria-label="Start your project with us"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={getAnimationProps({
                    x: [-100, 100],
                  })}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" 
                  aria-hidden="true"
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, z: 50 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Button
                variant="hero-outline"
                size="xl"
                onClick={() => onShowreelClick?.()}
                className="group w-full sm:w-auto relative backdrop-blur-xl border-2 shadow-2xl"
                aria-label="Watch our showreel video"
              >
                <motion.div
                  animate={getAnimationProps({ rotate: 360 })}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl"
                />
                <Play className="w-5 h-5 relative z-10" aria-hidden="true" />
                <span className="relative z-10">Watch Showreel</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Icons */}
          {!isMobile && !isLowPerformance && (
            <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
              {[Sparkles, Zap, Rocket].map((Icon, i) => (
                <motion.div
                  key={i}
                  style={{ 
                    willChange: 'transform',
                    top: `${30 + i * 20}%`,
                    right: `${10 + i * 15}%`,
                  }}
                  animate={getAnimationProps({
                    y: [0, -20, 0],
                    rotate: [0, 360],
                  })}
                  transition={{
                    duration: 5 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className={`absolute`}
                >
                  <Icon className="w-8 h-8 text-primary/30" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Decorative 3D Bottom Line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{ transform: 'translateZ(100px)' }}
        animate={getAnimationProps({
          scaleX: [0.8, 1, 0.8],
          opacity: [0.3, 0.8, 0.3],
        })}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        aria-hidden="true" 
      />
    </motion.section>
  );
};

export default HeroSection;