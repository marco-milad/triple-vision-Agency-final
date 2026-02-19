import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: 250, suffix: '+', label: 'Projects Completed' },
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 11, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '', label: 'Team Members' },
];

interface CounterProps {
  value: number;
  suffix: string;
}

const Counter = ({ value, suffix }: CounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, { duration: 2, ease: 'easeOut' });
      return animation.stop;
    }
  }, [isInView, value, count]);

  useEffect(() => {
    return rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });
  }, [rounded]);

  return (
    <span ref={ref} className="stat-number">
      {displayValue}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(StatsSection);
