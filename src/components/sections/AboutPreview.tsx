import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Zap,
    title: 'Creative Excellence',
    description: 'Award-winning designs that captivate and convert.',
  },
  {
    icon: Users,
    title: 'Client-Focused',
    description: 'Your vision is our mission. We listen, we deliver.',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: '200+ successful projects across industries.',
  },
];

const AboutPreview = () => {
  return (
    <section className="section-padding bg-background-secondary relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Where Creativity Meets{' '}
              <span className="text-gradient">Strategy</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Triple Vision Agency is a premium creative powerhouse specializing in 
              media production, branding, and digital experiences. We transform bold 
              ideas into captivating realities that leave lasting impressions.
            </p>

            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="outline" size="lg" className="group">
                Learn More About Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden card-glass p-8">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center relative">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,140,0,0.2),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,140,0,0.15),transparent_50%)]" />
                
                {/* Stats Display */}
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-20 -left-20 w-40 h-40 border border-primary/20 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-20 -right-20 w-60 h-60 border border-primary/10 rounded-full"
                  />
                  
                  <div className="stat-number mb-2">8+</div>
                  <p className="text-foreground font-medium text-xl">Years of Excellence</p>
                  <p className="text-muted-foreground mt-2">Crafting digital experiences</p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-primary rounded-2xl p-6 shadow-lg shadow-primary/30"
            >
              <p className="text-4xl font-bold text-primary-foreground">200+</p>
              <p className="text-primary-foreground/80 text-sm">Projects Delivered</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
