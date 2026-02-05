import { motion } from 'framer-motion';
import { Target, Lightbulb, Rocket, Shield } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Precision Focus',
    description: 'Every pixel, every frame, every detail matters. We obsess over quality so you don\'t have to.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Innovation',
    description: 'We push boundaries and challenge conventions to create work that stands out.',
  },
  {
    icon: Rocket,
    title: 'Fast Delivery',
    description: 'Premium quality doesn\'t mean slow. We deliver exceptional work on time, every time.',
  },
  {
    icon: Shield,
    title: 'Trusted Partner',
    description: 'We build lasting relationships. Your success is our success.',
  },
];

const WhyTripleVision = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            The Triple Vision <span className="text-gradient">Difference</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We're not just another creative agency. We're your strategic partner 
            in building a brand that commands attention.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
              >
                <value.icon className="w-10 h-10 text-primary" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTripleVision;
