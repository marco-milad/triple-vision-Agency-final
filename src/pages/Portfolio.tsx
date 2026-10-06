import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import ProjectImage from '@/components/ProjectImage';
import { Button } from '@/components/ui/button';
import { useContact } from '@/contexts/ContactContext';
import { company } from '@/data/company';
import { projects, portfolioFilters } from '@/data/portfolio';
import { getServiceBySlug } from '@/data/services';

/** Filters come from the services that actually have work behind them. */
const filters = [{ slug: 'all', title: 'All' }, ...portfolioFilters()];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { openContact } = useContact();

  const visibleProjects =
    activeFilter === 'all' ? projects : projects.filter((project) => project.services.includes(activeFilter));

  return (
    <Layout>
      <Seo
        title="Portfolio"
        description="Selected work from Triple Vision Agency across social media, media production, branding and web development for clients across Egypt."
      />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Work</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-6 leading-[1.1]">
              Featured{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Explore our work across media production, social media, branding, web development and more.
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              className="mt-8 h-1.5 w-32 mx-auto bg-gradient-to-r from-primary via-orange-500 to-pink-500 rounded-full shadow-lg shadow-primary/50"
            />
          </motion.div>
        </div>
      </section>

      {/* Filters — offset below the fixed navbar so they stay visible when stuck */}
      <section className="py-6 md:py-8 px-6 bg-background-secondary border-y-2 border-border/50 sticky top-[72px] z-30 backdrop-blur-xl">
        <style>{`
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>

        <div className="container mx-auto">
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex md:flex-wrap md:justify-center gap-2 md:gap-3 min-w-max md:min-w-0">
              {filters.map((filter) => (
                <motion.button
                  key={filter.slug}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter.slug)}
                  aria-label={`Filter projects by ${filter.title}`}
                  aria-pressed={activeFilter === filter.slug}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    activeFilter === filter.slug
                      ? 'bg-gradient-to-r from-primary to-orange-500 text-primary-foreground shadow-lg shadow-primary/30'
                      : 'bg-background border-2 border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-primary/5'
                  }`}
                >
                  {filter.title}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.article
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group"
                >
                  <Link
                    to={`/work/${project.slug}`}
                    className="block rounded-2xl overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <ProjectImage
                        src={project.cover}
                        alt={project.coverAlt ?? `${project.title} for ${project.client}`}
                        label={project.client}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6 bg-background/60 backdrop-blur-sm">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.services.slice(0, 2).map((serviceSlug) => (
                          <span
                            key={serviceSlug}
                            className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold"
                          >
                            {getServiceBySlug(serviceSlug)?.title}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-xl font-black text-foreground mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground text-sm">{project.client}</p>
                      <p className="text-muted-foreground/70 text-xs mb-4">
                        {project.category ?? project.industry}
                      </p>

                      <span className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                        View project
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {visibleProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects in this category yet.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 px-6 bg-gradient-to-br from-background-secondary via-background to-background-secondary border-y-2 border-border/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { number: `${company.stats.projects}+`, label: 'Projects Completed' },
              { number: `${company.stats.clients}+`, label: 'Happy Clients' },
              { number: `${company.stats.industries}+`, label: 'Industries Served' },
              { number: `${company.stats.countries}+`, label: 'Countries' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 md:p-6 rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary/20 via-orange-500/20 to-pink-500/20 blur-3xl opacity-40" />

            <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl border-2 border-primary/20 bg-background/90 backdrop-blur-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-foreground mb-4 md:mb-6">
                Ready to{' '}
                <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Start Your Project?
                </span>
              </h2>

              <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-8 md:mb-10">
                Let's create something extraordinary together.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
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
