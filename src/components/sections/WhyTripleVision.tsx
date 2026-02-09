import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Rocket, Shield, Sparkles, ArrowRight } from 'lucide-react';

const values = [
  { icon: Target, title: 'Precision Focus', description: 'Every pixel, every frame, every detail matters. We obsess over quality so you don\'t have to.', color: 'from-primary to-orange-500', delay: 0 },
  { icon: Lightbulb, title: 'Creative Innovation', description: 'We push boundaries and challenge conventions to create work that stands out.', color: 'from-orange-500 to-pink-500', delay: 0.1 },
  { icon: Rocket, title: 'Fast Delivery', description: 'Premium quality doesn\'t mean slow. We deliver exceptional work on time, every time.', color: 'from-pink-500 to-purple-500', delay: 0.2 },
  { icon: Shield, title: 'Trusted Partner', description: 'We build lasting relationships. Your success is our success.', color: 'from-purple-500 to-primary', delay: 0.3 },
];

const WhyTripleVision = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      {/* Background - reduced blur, no particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[60px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-6 leading-[1.1]">
            The Triple Vision{' '}
            <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">Difference</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed"
          >
            We're not just another creative agency. We're your strategic partner in building a brand that commands attention.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="mt-8 h-1.5 w-32 mx-auto bg-gradient-to-r from-primary via-orange-500 to-pink-500 rounded-full shadow-lg shadow-primary/50"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: value.delay, type: 'spring', stiffness: 100 }}
              className="group relative"
            >
              <div className="relative h-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${value.color} blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
                />

                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full p-8 rounded-2xl border-2 border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-300"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}
                  />

                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ duration: 0.3, type: 'spring' }}
                    className="relative mb-6 inline-block"
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.color} blur-lg opacity-50`} />
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} p-0.5 shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                      <div className="w-full h-full rounded-2xl bg-background/95 backdrop-blur-xl flex items-center justify-center">
                        <value.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Static sparkle instead of animated */}
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                  </motion.div>

                  <div className="relative">
                    <h3 className="text-xl md:text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {value.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${value.color} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: value.delay + 0.3, type: 'spring' }}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-600 border-2 border-background shadow-xl flex items-center justify-center"
              >
                <span className="text-white font-black text-sm">0{index + 1}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary via-orange-500 to-pink-500 text-white font-bold shadow-2xl shadow-primary/50 cursor-pointer group"
          >
            <span>Ready to Get Started?</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(WhyTripleVision);
