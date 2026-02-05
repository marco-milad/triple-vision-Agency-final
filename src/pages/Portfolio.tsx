import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, ExternalLink } from 'lucide-react';
import ContactModal from '@/components/modals/ContactModal';

const categories = ['All', 'Media Production', 'Branding', 'Web Development', 'Events', 'Digital Media'];

const projects = [
  {
    id: 1,
    title: 'Luxe Fashion Brand Film',
    category: 'Media Production',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    video: true,
    description: 'A cinematic brand film for a luxury fashion house.',
  },
  {
    id: 2,
    title: 'Tech Summit 2024',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    video: false,
    description: 'Complete event coverage for annual tech conference.',
  },
  {
    id: 3,
    title: 'Artisan Coffee Rebrand',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    video: false,
    description: 'Full brand identity redesign for specialty coffee chain.',
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    video: false,
    description: 'Custom e-commerce solution with advanced features.',
  },
  {
    id: 5,
    title: 'Wellness App Campaign',
    category: 'Digital Media',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    video: true,
    description: 'Social media campaign for health and wellness app.',
  },
  {
    id: 6,
    title: 'Restaurant Documentary',
    category: 'Media Production',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    video: true,
    description: 'Behind-the-scenes documentary for Michelin-star restaurant.',
  },
  {
    id: 7,
    title: 'Fintech Brand Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    video: false,
    description: 'Modern brand identity for innovative fintech startup.',
  },
  {
    id: 8,
    title: 'Music Festival Coverage',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    video: true,
    description: 'Multi-day festival documentation and live content.',
  },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isContactOpen, setIsContactOpen] = useState(false);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

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
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Explore our portfolio of award-winning projects across media production, 
              branding, web development, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6 bg-background border-b border-border/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Video Indicator */}
                  {project.video && (
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-primary text-sm font-medium mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-foreground opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span className="font-medium">View Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's create something extraordinary together.
            </p>
            <Button variant="hero" size="xl" onClick={() => setIsContactOpen(true)} className="group">
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </Layout>
  );
};

export default Portfolio;
