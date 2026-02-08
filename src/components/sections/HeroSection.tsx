import { motion, type TargetAndTransition } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Rocket, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useParticlePositions } from '@/hooks/use-in-view-animation';

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
      
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const cores = navigator.hardwareConcurrency || 1;
      const isLowEnd = isMobileDevice && cores <= 4;
      setIsLowPerformance(isLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const cardCount = isLowPerformance ? 0 : isMobile ? 3 : 6;
  const particles = useParticlePositions(8);

  const getAnimationProps = (animation: TargetAndTransition): TargetAndTransition | Record<string, never> => {
    return prefersReducedMotion || isLowPerformance ? {} : animation;
  };

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background"
      aria-label="Hero section"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={getAnimationProps({
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          })}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-[120px] animate-pulse"
        />
        
        <motion.div
          animate={getAnimationProps({
            rotate: [360, 0],
            scale: [1, 1.15, 1],
          })}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-orange-500/20 to-pink-500/20 blur-[140px]"
        />

        <motion.div
          animate={getAnimationProps({
            y: [0, -30, 0],
            x: [0, 20, 0],
          })}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/15 to-transparent blur-[100px]"
        />

        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating Particles */}
        {!isLowPerformance && particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: p.left,
              top: p.top,
            }}
            animate={getAnimationProps({
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            })}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Floating 3D Cards */}
        {cardCount > 0 && [...Array(cardCount)].map((_, i) => {
          const colors = [
            'from-primary/20 to-orange-500/10',
            'from-orange-500/20 to-pink-500/10',
            'from-pink-500/20 to-purple-500/10',
            'from-purple-500/20 to-blue-500/10',
            'from-blue-500/20 to-primary/10',
            'from-primary/15 to-pink-500/15',
          ];
          
          return (
            <motion.div
              key={i}
              style={{
                top: `${15 + (i % 3) * 30}%`,
                left: `${5 + Math.floor(i / 3) * 45}%`,
              }}
              animate={getAnimationProps({
                y: [0, -25, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1],
              })}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              className={`absolute w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${colors[i]} backdrop-blur-sm border border-primary/20 shadow-2xl`}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-6 py-20 md:py-28 relative z-10"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated Badge - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", type: 'spring' }}
            className="mb-8 md:mb-10"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-orange-500/10 to-pink-500/10 backdrop-blur-xl shadow-2xl shadow-primary/20 group relative overflow-hidden"
            >
              {/* Badge Shimmer */}
              <motion.div
                animate={getAnimationProps({
                  x: ['-100%', '100%'],
                })}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2,
                }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
              />
              
              <motion.div
                animate={getAnimationProps({ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                })}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-5 h-5 text-primary" aria-hidden="true" />
              </motion.div>
              
              <span className="text-primary text-sm md:text-base font-black uppercase tracking-wider relative z-10">
                Premium Creative Agency
              </span>
              
              <Rocket className="w-5 h-5 text-orange-500" aria-hidden="true" />
            </motion.div>
          </motion.div>

          {/* Main Headline - Enhanced */}
          <div className="relative mb-8 md:mb-10">
            {/* Glow Effect Behind Text */}
            {!isLowPerformance && (
              <motion.div
                animate={getAnimationProps({
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.95, 1.05, 0.95],
                })}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 blur-3xl bg-gradient-to-r from-primary/20 via-orange-500/20 to-pink-500/20"
              />
            )}

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-6"
            >
              <motion.span 
                className="inline-block text-foreground"
                whileHover={{ scale: 1.02 }}
              >
                Transform Your{' '}
              </motion.span>
              <br className="hidden sm:block" />
              <motion.span 
                className="inline-block bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                animate={getAnimationProps({
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                })}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Vision
              </motion.span>
              <br />
              <motion.span 
                className="inline-block text-foreground"
                whileHover={{ scale: 1.02 }}
              >
                Into{' '}
              </motion.span>
              <motion.span 
                className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-primary bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                Reality
              </motion.span>
            </motion.h1>
          </div>

          {/* Subheadline - Enhanced */}
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

          {/* Interactive Buttons - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Primary Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => onContactClick?.()}
                className="group w-full sm:w-auto relative overflow-hidden shadow-2xl shadow-primary/30"
                aria-label="Start your project with us"
              >
                {/* Animated Gradient Background */}
                <motion.div
                  animate={getAnimationProps({
                    x: ['-100%', '100%'],
                  })}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Project
                  <motion.div
                    animate={getAnimationProps({ x: [0, 5, 0] })}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>

            {/* Secondary Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="hero-outline"
                size="xl"
                onClick={() => onShowreelClick?.()}
                className="group w-full sm:w-auto relative backdrop-blur-xl border-2 shadow-2xl overflow-hidden"
                aria-label="Watch our showreel video"
              >
                {/* Glow on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                />
                
                <span className="relative z-10 flex items-center gap-3">
                  <motion.div
                    animate={getAnimationProps({ 
                      scale: [1, 1.2, 1],
                    })}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                  Watch Showreel
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators - New */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {[
              { icon: Star, label: '200+ Projects', color: 'from-primary to-orange-500' },
              { icon: Award, label: '50+ Clients', color: 'from-orange-500 to-pink-500' },
              { icon: Sparkles, label: '8+ Years', color: 'from-pink-500 to-purple-500' },
            ].map((item, index) => (
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

          {/* Floating Icons - Desktop Only */}
          {!isMobile && !isLowPerformance && (
            <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true">
              {[
                { Icon: Sparkles, pos: { top: '20%', left: '10%' } },
                { Icon: Zap, pos: { top: '30%', right: '15%' } },
                { Icon: Rocket, pos: { bottom: '30%', left: '12%' } },
                { Icon: Star, pos: { bottom: '25%', right: '10%' } },
              ].map(({ Icon, pos }, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={pos}
                  animate={getAnimationProps({
                    y: [0, -20, 0],
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  })}
                  transition={{
                    duration: 5 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-orange-500/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-xl">
                    <Icon className="w-8 h-8 text-primary/50" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Decorative Bottom Line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={getAnimationProps({
          scaleX: [0.7, 1, 0.7],
          opacity: [0.3, 0.8, 0.3],
        })}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        aria-hidden="true" 
      />

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 rounded-br-full bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-tl-full bg-gradient-to-tl from-orange-500/5 to-transparent" />
    </motion.section>
  );
};

export default React.memo(HeroSection);