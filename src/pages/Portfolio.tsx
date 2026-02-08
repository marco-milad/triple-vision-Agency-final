import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, ExternalLink, Sparkles } from 'lucide-react';
import { useContact } from '@/contexts/ContactContext';

const categories = ['All', 'Media Production', 'Branding', 'Web Development', 'Events', 'Digital Media'];

const projects = [
  {
    id: 1,
    title: 'Luxe Fashion Brand Film',
    category: 'Media Production',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    video: true,
    description: 'A cinematic brand film for a luxury fashion house.',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 2,
    title: 'Tech Summit 2024',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    video: false,
    description: 'Complete event coverage for annual tech conference.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Artisan Coffee Rebrand',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    video: false,
    description: 'Full brand identity redesign for specialty coffee chain.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    video: false,
    description: 'Custom e-commerce solution with advanced features.',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    id: 5,
    title: 'Wellness App Campaign',
    category: 'Digital Media',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    video: true,
    description: 'Social media campaign for health and wellness app.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 6,
    title: 'Restaurant Documentary',
    category: 'Media Production',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    video: true,
    description: 'Behind-the-scenes documentary for Michelin-star restaurant.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 7,
    title: 'Fintech Brand Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    video: false,
    description: 'Modern brand identity for innovative fintech startup.',
    color: 'from-teal-500 to-green-500',
  },
  {
    id: 8,
    title: 'Music Festival Coverage',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    video: true,
    description: 'Multi-day festival documentation and live content.',
    color: 'from-pink-500 to-rose-500',
  },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { openContact } = useContact();

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

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
                Our Work
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-6 leading-[1.1]">
              Featured{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
            >
              Explore our portfolio of award-winning projects across media production, 
              branding, web development, and more.
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

      {/* Filter Section - Enhanced */}
      <section className="py-12 px-6 bg-background-secondary border-y-2 border-border/50 sticky top-0 z-40 backdrop-blur-xl">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category, idx) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/30'
                    : 'bg-background border-2 border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-primary/5'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid - Enhanced */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 100
                  }}
                  className="group relative"
                >
                  {/* Card Container */}
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer border-2 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-xl"
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

                    {/* Color Accent */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay`} />

                    {/* Video Indicator */}
                    {project.video && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                        className="absolute top-4 right-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-xl border-2 border-white/20">
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </div>
                      </motion.div>
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      {/* Category Badge */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                        className="mb-3"
                      >
                        <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-white text-xs font-bold shadow-lg`}>
                          {project.category}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {project.description}
                      </p>

                      {/* View Link */}
                      <div className="flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        <span>View Project</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Corner Decoration */}
                    <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-16 px-6 bg-gradient-to-br from-background-secondary via-background to-background-secondary border-y-2 border-border/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '200+', label: 'Projects Completed' },
              { number: '50+', label: 'Happy Clients' },
              { number: '15+', label: 'Awards Won' },
              { number: '98%', label: 'Satisfaction Rate' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="section-padding bg-background relative overflow-hidden">
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
            {/* Static Glow */}
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary/20 via-orange-500/20 to-pink-500/20 blur-3xl opacity-40" />

            <div className="relative p-12 md:p-16 rounded-3xl border-2 border-primary/20 bg-background/90 backdrop-blur-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
                Ready to{' '}
                <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Start Your Project?
                </span>
              </h2>
              
              <p className="text-muted-foreground text-lg md:text-xl mb-10">
                Let's create something extraordinary together.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="hero" size="xl" onClick={() => openContact()} className="group">
                  <span className="flex items-center gap-3">
                    Get Started Today
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

export default Portfolio;