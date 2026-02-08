import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Video, Calendar, Share2, Palette, Code, Radio, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSectionInView } from '@/hooks/use-in-view-animation';

const services = [
  {
    icon: Video,
    title: 'Media Production',
    description: 'Cinematic video production, commercials, and brand films that tell your story.',
    path: '/services/media-production',
    color: 'from-orange-500 to-red-500',
    badge: 'Popular',
  },
  {
    icon: Calendar,
    title: 'Event Planning',
    description: 'Seamless event planning and coverage for unforgettable experiences.',
    path: '/services/event-planning',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Share2,
    title: 'Digital Media',
    description: 'Social media management, content creation, and digital marketing.',
    path: '/services/digital-media',
    color: 'from-blue-500 to-cyan-500',
    badge: 'Trending',
  },
  {
    icon: Palette,
    title: 'Graphics & Branding',
    description: 'Logo design, brand identity, and visual systems that stand out.',
    path: '/services/graphics-branding',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites and web applications that perform and convert.',
    path: '/services/web-development',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Radio,
    title: 'PR & Media Monitoring',
    description: 'Strategic PR campaigns and real-time media monitoring.',
    path: '/services/pr-media-monitoring',
    color: 'from-amber-500 to-orange-500',
  },
];

const ServicesOverview = () => {
  const { ref: sectionRef, isInView } = useSectionInView();

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-br from-background via-background to-background-secondary relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/10 blur-[120px]" style={{ animationPlayState: isInView ? 'running' : 'paused' }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[100px]" />
      </div>

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

      {/* Floating Decorative Elements */}
      <motion.div
        animate={isInView ? { y: [0, -20, 0], rotate: [0, 5, 0] } : undefined}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm border border-primary/20 hidden lg:block"
      />
      <motion.div
        animate={isInView ? { y: [0, 20, 0], rotate: [0, -5, 0] } : undefined}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-10 w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/10 to-pink-500/10 backdrop-blur-sm border border-primary/20 hidden lg:block"
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-6 leading-[1.1]">
            Creative Solutions for{' '}
            <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Bold Brands
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            From concept to execution, we offer <span className="text-foreground font-semibold">comprehensive creative services</span>
            {' '}that elevate your brand and drive <span className="text-primary font-semibold">real results</span>.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={service.path} className="block group h-full">
                <motion.div 
                  className="relative p-8 h-full rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Badge if available */}
                  {service.badge && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-orange-500 text-white text-xs font-bold">
                        <Star className="w-3 h-3" />
                        {service.badge}
                      </div>
                    </motion.div>
                  )}

                  {/* Icon with Gradient Border */}
                  <div className="relative mb-6">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-0.5`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                    </motion.div>
                    
                    {/* Decorative Circle */}
                    <motion.div
                      className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Link with Arrow */}
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      Learn More
                      <motion.div
                        animate={isInView ? { x: [0, 4, 0] } : undefined}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link to="/services">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="group relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative z-10">Explore All Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats Bar */}
      
      </div>
    </section>
  );
};

export default React.memo(ServicesOverview);