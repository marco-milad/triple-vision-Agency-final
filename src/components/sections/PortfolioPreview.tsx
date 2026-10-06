import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectImage from '@/components/ProjectImage';
import { featuredProjects } from '@/data/portfolio';
import { getServiceBySlug } from '@/data/services';

const items = featuredProjects(4);

const PortfolioPreview = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-background-secondary via-background to-background-secondary relative overflow-hidden">
      {/* Background - reduced blur */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[80px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Work</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-4 leading-[1.1]">
              Featured{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Explore our latest work and see how we bring <span className="text-primary font-semibold">bold ideas</span> to life.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Button variant="outline" size="lg" className="group relative overflow-hidden" asChild>
              <Link to="/portfolio">
                <span className="relative z-10">View All Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/work/${project.slug}`} className="block group">
                <motion.div
                  className="relative overflow-hidden rounded-2xl aspect-[4/3] border-2 border-border/50 bg-background/50"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0">
                    <ProjectImage
                      src={project.cover}
                      alt={project.coverAlt ?? `${project.title} for ${project.client}`}
                      label={project.client}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />

                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-3 self-start">
                      <span className="text-primary text-xs md:text-sm font-semibold">
                        {getServiceBySlug(project.services[0])?.title}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-2 group-hover:text-primary transition-colors drop-shadow-lg">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mb-4 font-medium">
                      {project.client}
                    </p>
                    <span className="flex items-center gap-2 text-foreground font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      View Project
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(PortfolioPreview);
