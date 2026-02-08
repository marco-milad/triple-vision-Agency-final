import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Calendar, Share2, Palette, Code, Radio, CheckCircle, Sparkles } from 'lucide-react';
import { useContact } from '@/contexts/ContactContext';

const services = [
  {
    icon: Video,
    title: 'Media Production',
    slug: 'media-production',
    description: 'Cinematic video production, commercials, documentaries, and brand films that captivate audiences.',
    features: ['Commercial Videos', 'Corporate Films', 'Documentaries', 'Motion Graphics'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Calendar,
    title: 'Event Planning & Coverage',
    slug: 'event-planning',
    description: 'End-to-end event planning and professional coverage for memorable experiences.',
    features: ['Corporate Events', 'Product Launches', 'Live Coverage', 'Post-Event Content'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Share2,
    title: 'Digital Media Services',
    slug: 'digital-media',
    description: 'Strategic social media management and content creation to grow your digital presence.',
    features: ['Social Media Strategy', 'Content Creation', 'Community Management', 'Analytics & Reporting'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Palette,
    title: 'Graphics & Branding',
    slug: 'graphics-branding',
    description: 'Comprehensive brand identity design that makes your business unforgettable.',
    features: ['Logo Design', 'Brand Guidelines', 'Print Design', 'Packaging Design'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Code,
    title: 'Web Development',
    slug: 'web-development',
    description: 'Custom websites and web applications that deliver exceptional user experiences.',
    features: ['Custom Websites', 'E-Commerce', 'Web Applications', 'UI/UX Design'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Radio,
    title: 'PR & Media Monitoring',
    slug: 'pr-media-monitoring',
    description: 'Strategic PR campaigns and real-time media monitoring for brand reputation.',
    features: ['Press Releases', 'Media Relations', 'Crisis Management', 'Brand Monitoring'],
    color: 'from-amber-500 to-orange-500',
  },
];

const Services = () => {
  const { openContact } = useContact();

  return (
    <Layout>
      {/* Hero Section - Enhanced */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Services
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-6 leading-[1.1]">
              Creative Solutions for{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Every Need
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
            >
              From concept to execution, we offer comprehensive creative services 
              that elevate your brand and drive real results.
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              className="mt-8 h-1.5 w-32 mx-auto bg-gradient-to-r from-primary via-orange-500 to-pink-500 rounded-full shadow-lg shadow-primary/50"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Enhanced */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                className="group relative"
              >
                <Link to={`/services/${service.slug}`} className="block h-full">
                  {/* Card Container */}
                  <div className="relative h-full">
                    {/* Hover Glow - Static */}
                    <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />

                    {/* Main Card */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full p-8 rounded-2xl border-2 border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Background Pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-300"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
                          `,
                          backgroundSize: '20px 20px'
                        }}
                      />

                      {/* Icon Container */}
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ duration: 0.3, type: 'spring' }}
                        className="relative mb-6 inline-block"
                      >
                        {/* Icon Glow */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-lg opacity-40`} />
                        
                        {/* Icon Box */}
                        <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-2xl`}>
                          <service.icon className="w-10 h-10 text-white" />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="relative flex-1 flex flex-col">
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-3 mb-6 flex-grow">
                          {service.features.map((feature, idx) => (
                            <motion.li
                              key={feature}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                              className="flex items-center gap-3 text-sm text-muted-foreground group/item"
                            >
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors">
                                <CheckCircle className="w-3 h-3 text-primary" />
                              </div>
                              <span className="group-hover/item:text-foreground transition-colors">
                                {feature}
                              </span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Learn More Link */}
                        <div className="flex items-center gap-2 text-primary font-bold text-sm">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>

                      {/* Corner Decoration */}
                      <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

                      {/* Number Badge */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-orange-500/20 border border-primary/30 flex items-center justify-center">
                        <span className="text-xs font-black text-primary">0{index + 1}</span>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="section-padding bg-gradient-to-br from-background-secondary via-background to-background-secondary relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[140px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Static Glow Behind Card */}
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary/20 via-orange-500/20 to-pink-500/20 blur-3xl opacity-40" />

            <div className="relative p-12 md:p-16 rounded-3xl border-2 border-primary/20 bg-background/90 backdrop-blur-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
                Not Sure Which Service{' '}
                <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                  You Need?
                </span>
              </h2>
              
              <p className="text-muted-foreground text-lg md:text-xl mb-10">
                Let's discuss your project and find the perfect solution together.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={() => openContact()} 
                  className="group"
                >
                  <span className="flex items-center gap-3">
                    Get a Free Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
};

export default Services;