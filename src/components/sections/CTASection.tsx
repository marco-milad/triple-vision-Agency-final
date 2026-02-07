import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Rocket, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSectionInView, useParticlePositions } from '@/hooks/use-in-view-animation';

interface CTASectionProps {
  onContactClick: () => void;
}

const CTASection = ({ onContactClick }: CTASectionProps) => {
  const { ref: sectionRef, isInView } = useSectionInView();
  const particles = useParticlePositions(20);

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-primary/10 blur-[140px]" style={{ animationPlayState: isInView ? 'running' : 'paused' }} />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/5 blur-[100px]" />
        
        {/* Animated Rings */}
        <motion.div
          animate={isInView ? { rotate: 360 } : undefined}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-primary/10 rounded-full"
        />
        <motion.div
          animate={isInView ? { rotate: -360 } : undefined}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full"
        />
        <motion.div
          animate={isInView ? { rotate: 360 } : undefined}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-orange-500/5 rounded-full"
        />
      </div>

      {/* Animated Grid Background */}
      <motion.div
        animate={isInView ? { backgroundPosition: ['0px 0px', '60px 60px'] } : undefined}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{ left: p.left, top: p.top }}
          animate={isInView ? {
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          } : undefined}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating Icons */}
      {[
        { Icon: Zap, position: 'top-1/4 left-[10%]', delay: 0 },
        { Icon: Rocket, position: 'top-1/3 right-[15%]', delay: 0.5 },
        { Icon: Star, position: 'bottom-1/4 left-[15%]', delay: 1 },
        { Icon: Sparkles, position: 'bottom-1/3 right-[10%]', delay: 1.5 },
      ].map(({ Icon, position, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${position} hidden lg:block`}
          animate={isInView ? {
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          } : undefined}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-500/10 backdrop-blur-xl border border-primary/20 flex items-center justify-center shadow-xl">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        </motion.div>
      ))}

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main Content Card */}
          <div className="relative">
            {/* Card Glow */}
            <motion.div
              animate={isInView ? {
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              } : undefined}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary via-orange-500 to-pink-500 blur-3xl opacity-30"
            />

            {/* Main Card */}
            <div className="relative p-12 md:p-16 lg:p-20 rounded-3xl border-2 border-primary/20 bg-background/90 backdrop-blur-2xl overflow-hidden">
              {/* Background Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }}
              />

              {/* Content */}
              <div className="relative text-center">
                {/* Icon Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="inline-block mb-8"
                >
                  <div className="relative">
                    {/* Icon Glow */}
                    <motion.div
                      animate={isInView ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      } : undefined}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-orange-500 blur-xl"
                    />
                    
                    {/* Icon Container */}
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-orange-500 p-0.5 shadow-2xl">
                      <div className="w-full h-full rounded-2xl bg-background/95 backdrop-blur-xl flex items-center justify-center">
                        <motion.div
                          animate={isInView ? {
                            rotate: [0, 10, 0],
                            scale: [1, 1.1, 1],
                          } : undefined}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Sparkles className="w-10 h-10 text-primary" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-6 leading-[1.1]"
                >
                  Ready to Create Something{' '}
                  <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                    Extraordinary?
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-muted-foreground text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                  Let's turn your vision into reality. Start your project today and 
                  experience the <span className="text-primary font-semibold">Triple Vision</span> difference.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
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
                      onClick={onContactClick}
                      className="group relative overflow-hidden"
                    >
                      {/* Button Shimmer Effect */}
                      <motion.div
                        animate={isInView ? { x: ['-100%', '100%'] } : undefined}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 1,
                        }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      />
                      <span className="relative flex items-center gap-3">
                        Start Your Project
                        <motion.div
                          animate={isInView ? { x: [0, 5, 0] } : undefined}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5" />
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
                      className="group"
                    >
                      <span className="flex items-center gap-2">
                        Schedule a Call
                        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                            i === 0 ? 'from-primary to-orange-500' :
                            i === 1 ? 'from-orange-500 to-pink-500' :
                            'from-pink-500 to-purple-500'
                          } border-2 border-background flex items-center justify-center shadow-lg`}
                        >
                          <Star className="w-4 h-4 text-white fill-white" />
                        </div>
                      ))}
                    </div>
                    <span className="font-semibold">200+ Projects Delivered</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Fast Turnaround</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Premium Quality</span>
                  </div>
                </motion.div>
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-32 h-32 rounded-br-[3rem] bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-[3rem] bg-gradient-to-tl from-orange-500/10 to-transparent" />
            </div>
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
