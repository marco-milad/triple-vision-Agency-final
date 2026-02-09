import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Rocket, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onContactClick: () => void;
}

const CTASection = ({ onContactClick }: CTASectionProps) => {
  return (
    <section className="section-padding bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      {/* Background - reduced blur, no rotating rings */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/5 blur-[60px]" />
        
        {/* Static rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-primary/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Static floating icons instead of animated */}
      {[
        { Icon: Zap, position: 'top-1/4 left-[10%]' },
        { Icon: Rocket, position: 'top-1/3 right-[15%]' },
        { Icon: Star, position: 'bottom-1/4 left-[15%]' },
        { Icon: Sparkles, position: 'bottom-1/3 right-[10%]' },
      ].map(({ Icon, position }, i) => (
        <div key={i} className={`absolute ${position} hidden lg:block`}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-500/10 border border-primary/20 flex items-center justify-center shadow-xl">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        </div>
      ))}

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Static glow instead of animated */}
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary via-orange-500 to-pink-500 blur-3xl opacity-20" />

            <div className="relative p-12 md:p-16 lg:p-20 rounded-3xl border-2 border-primary/20 bg-background/90 backdrop-blur-2xl overflow-hidden">
              <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }}
              />

              <div className="relative text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="inline-block mb-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-orange-500 blur-xl opacity-50" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-orange-500 p-0.5 shadow-2xl">
                      <div className="w-full h-full rounded-2xl bg-background/95 backdrop-blur-xl flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-6 leading-[1.1]"
                >
                  Ready to Create Something{' '}
                  <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">Extraordinary?</span>
                </motion.h2>

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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="hero"
                      size="xl"
                      onClick={onContactClick}
                      className="group relative overflow-hidden"
                    >
                      <span className="relative flex items-center gap-3">
                        Start Your Project
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="hero-outline" size="xl" className="group">
                      <span className="flex items-center gap-2">
                        Schedule a Call
                        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>

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
                        <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${i === 0 ? 'from-primary to-orange-500' : i === 1 ? 'from-orange-500 to-pink-500' : 'from-pink-500 to-purple-500'} border-2 border-background flex items-center justify-center shadow-lg`}>
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

              <div className="absolute top-0 left-0 w-32 h-32 rounded-br-[3rem] bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-[3rem] bg-gradient-to-tl from-orange-500/10 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(CTASection);
