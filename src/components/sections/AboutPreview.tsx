import { motion, useInView } from 'framer-motion';
import { ArrowRight, Award, Users, Zap, Sparkles, TrendingUp, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';

const Counter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        if (progress < 1) {
          setDisplayValue(Math.floor(value * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      animationFrame = requestAnimationFrame(animate);
      return () => { if (animationFrame) cancelAnimationFrame(animationFrame); };
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const features = [
  { icon: Zap, title: 'Creative Excellence', description: 'Award-winning designs that captivate and convert your audience.' },
  { icon: Target, title: 'Strategic Approach', description: 'Data-driven strategies that deliver measurable results.' },
  { icon: Users, title: 'Client-Focused', description: 'Your vision is our mission. We listen, collaborate, and deliver.' },
  { icon: Award, title: 'Proven Track Record', description: '200+ successful projects across diverse industries.' },
];

const stats = [
  { value: 200, suffix: '+', label: 'Projects Completed' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 15, suffix: '+', label: 'Team Members' },
];

const AboutPreview = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-background via-background to-background-secondary relative overflow-hidden">
      {/* Background - reduced blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-primary/10 blur-[80px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[80px]" />
      
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Triple Vision</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-6 leading-[1.1]">
              Where Creativity Meets{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">Innovation</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              Triple Vision Agency is a <span className="text-foreground font-semibold">premium creative powerhouse</span> specializing in 
              3D animation, media production, branding, and digital experiences. We don't just create content—we craft 
              <span className="text-primary font-semibold"> immersive stories</span> that captivate audiences and drive real business results.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="group relative p-5 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-bold text-sm mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/about">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="group relative overflow-hidden">
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-orange-500/20 to-pink-500/20 backdrop-blur-xl">
                {/* Static gradient instead of animated */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,140,0,0.3), transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,105,180,0.2), transparent 50%)',
                  }}
                />

                {/* Static rings instead of rotating */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-primary/20 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-primary/10 rounded-full" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <TrendingUp className="w-16 h-16 text-primary mb-6 mx-auto" />
                    <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent mb-3">
                      <Counter value={8} suffix="+" duration={2.5} />
                    </div>
                    <p className="text-foreground font-bold text-xl md:text-2xl mb-2">Years of Excellence</p>
                    <p className="text-muted-foreground">Crafting Digital Masterpieces</p>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-6 shadow-2xl shadow-primary/40"
            >
              <p className="text-5xl font-black text-white mb-1">
                <Counter value={200} suffix="+" duration={2.5} />
              </p>
              <p className="text-white/90 text-sm font-semibold">Projects Delivered</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-background to-background-secondary border-2 border-primary/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl"
            >
              <p className="text-4xl font-black text-primary mb-1">
                <Counter value={50} suffix="+" duration={2} />
              </p>
              <p className="text-muted-foreground text-sm font-semibold">Happy Clients</p>
            </motion.div>

            {/* Static decorative elements instead of floating */}
            <div className="absolute top-1/4 -right-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/10 backdrop-blur-sm border border-primary/20 shadow-xl" />
            <div className="absolute bottom-1/4 -left-8 w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/10 backdrop-blur-sm border border-primary/20 shadow-xl" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-border/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} duration={2 + index * 0.2} />
                </p>
                <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(AboutPreview);
