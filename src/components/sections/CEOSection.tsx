import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import ceoPortrait from '@/assets/ceo-portrait.jpg';

const CEOSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/30 blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Decorative Frame */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -inset-4 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent"
              />
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
                <img
                  src={ceoPortrait}
                  alt="CEO & Founder"
                  className="w-full aspect-[3/4] object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Floating Accent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-primary rounded-2xl p-4 shadow-lg shadow-primary/30"
              >
                <p className="text-primary-foreground font-bold text-lg">8+ Years</p>
                <p className="text-primary-foreground/80 text-sm">Leading Vision</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Meet Our <span className="text-gradient">Visionary</span>
            </h2>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative mb-8"
            >
              <Quote className="w-10 h-10 text-primary/30 absolute -top-2 -left-2" />
              <blockquote className="pl-8 text-xl md:text-2xl text-foreground/90 italic leading-relaxed">
                "Creativity is not just about making things look beautiful—it's about telling stories that move people and create lasting impact."
              </blockquote>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold text-foreground">Mario Ndungu</h3>
              <p className="text-primary font-medium">CEO & Founder</p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              With over 8 years of experience in media production and creative direction, 
              Mario founded Triple Vision Agency with a singular mission: to transform bold 
              ideas into cinematic realities. His passion for storytelling and commitment to 
              excellence has helped countless brands elevate their presence and connect with 
              audiences on a deeper level.
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 h-1 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full origin-left"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
