import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Calendar, Share2, Palette, Code, Radio, CheckCircle } from 'lucide-react';
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
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,140,0,0.1),transparent_50%)]" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Creative Solutions for <span className="text-gradient">Every Need</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              From concept to execution, we offer comprehensive creative services 
              that elevate your brand and drive real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/services/${service.slug}`} className="block group h-full">
                  <div className="card-glass card-hover p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-primary font-medium mt-auto">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss your project and find the perfect solution together.
            </p>
            <Button variant="hero" size="xl" onClick={() => openContact()} className="group">
              Get a Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
};

export default Services;
