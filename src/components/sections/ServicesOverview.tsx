import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Video, Calendar, Share2, Palette, Code, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Video,
    title: 'Media Production',
    description: 'Cinematic video production, commercials, and brand films that tell your story.',
    path: '/services/media-production',
    color: 'from-orange-500 to-red-500',
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
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,140,0,0.03),transparent_70%)]" />

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
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Creative Solutions for{' '}
            <span className="text-gradient">Bold Brands</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to execution, we offer comprehensive creative services 
            that elevate your brand and drive results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={service.path} className="block group">
                <div className="card-glass card-hover p-8 h-full">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-primary font-medium">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <Button variant="outline" size="lg" className="group">
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
