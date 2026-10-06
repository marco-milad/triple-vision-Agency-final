import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import ProjectImage from '@/components/ProjectImage';
import { Button } from '@/components/ui/button';
import { getProjectBySlug, nextProject } from '@/data/portfolio';
import { getServiceBySlug } from '@/data/services';
import { useContact } from '@/contexts/ContactContext';

/** Case study page for a single project. */
const WorkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openContact } = useContact();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/portfolio" replace />;

  const next = nextProject(project.slug);
  const projectServices = project.services
    .map((serviceSlug) => getServiceBySlug(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <Layout>
      <Seo title={`${project.title} — ${project.client}`} description={project.summary} />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 relative overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8">{project.summary}</p>

            <div className="flex flex-wrap items-center gap-2">
              {projectServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
                >
                  {service.title}
                </Link>
              ))}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-orange-500 text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  Visit live site
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover */}
      <section className="px-6 pb-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[16/9] rounded-3xl overflow-hidden border-2 border-border/50 shadow-2xl"
          >
            <ProjectImage
              src={project.cover}
              alt={project.coverAlt ?? `${project.title} for ${project.client}`}
              label={`${project.client} — cover artwork`}
              size="hero"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Facts */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Client', value: project.client },
              { label: project.category ? 'Type' : 'Industry', value: project.category ?? project.industry },
              project.year
                ? { label: 'Year', value: project.year }
                : { label: 'Services', value: projectServices.map((service) => service.title).join(', ') },
            ].map((fact) => (
              <div
                key={fact.label}
                className="p-6 rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm"
              >
                <p className="text-xs text-muted-foreground/60 font-semibold uppercase tracking-wider mb-2">
                  {fact.label}
                </p>
                <p className="text-foreground font-bold">{fact.value}</p>
              </div>
            ))}
          </div>

          {project.stack && project.stack.length > 0 && (
            <div className="mt-6">
              <p className="text-xs text-muted-foreground/60 font-semibold uppercase tracking-wider mb-3">Built with</p>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 text-muted-foreground text-xs font-semibold"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* The written case study */}
      {project.sections?.map((section, index) => (
        <section
          key={`${section.type}-${index}`}
          className={`section-padding relative overflow-hidden ${
            index % 2 === 0
              ? 'bg-background'
              : 'bg-gradient-to-br from-background-secondary via-background to-background-secondary'
          }`}
        >
          <div className="container mx-auto relative z-10 max-w-5xl">
            {section.title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-6"
              >
                {section.title}
              </motion.h2>
            )}

            {section.body?.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 max-w-3xl"
              >
                {paragraph}
              </motion.p>
            ))}

            {section.items && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {section.items.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden"
                  >
                    {item.figure && (
                      <div className="aspect-[16/10] overflow-hidden border-b-2 border-border/50 bg-background-secondary">
                        <img
                          src={item.figure.src}
                          alt={item.figure.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-black text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {section.figure && (
              <motion.figure
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="mt-10"
              >
                <div className="rounded-2xl overflow-hidden border-2 border-border/50 bg-background-secondary">
                  <img
                    src={section.figure.src}
                    alt={section.figure.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover object-top"
                  />
                </div>
                {section.figure.caption && (
                  <figcaption className="text-muted-foreground/70 text-sm mt-3 text-center">
                    {section.figure.caption}
                  </figcaption>
                )}
              </motion.figure>
            )}
          </div>
        </section>
      ))}

      {/* Gallery */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-8">
            The{' '}
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Work</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(project.gallery.length > 0
              ? project.gallery
              : Array.from({ length: 4 }, () => null)
            ).map((image, index) => (
              <motion.figure
                key={image?.src ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-border/50 bg-background-secondary"
              >
                <ProjectImage
                  src={image?.src ?? null}
                  alt={image?.alt ?? `${project.title} — image ${index + 1}`}
                  label={`Artwork ${index + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Next project + CTA */}
      <section className="section-padding bg-gradient-to-br from-background-secondary via-background to-background-secondary border-t-2 border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Button variant="outline" size="lg" className="group" asChild>
              <Link to="/portfolio">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                All work
              </Link>
            </Button>

            <Link
              to={`/work/${next.slug}`}
              className="group text-center md:text-right"
            >
              <p className="text-xs text-muted-foreground/60 font-semibold uppercase tracking-wider mb-1">
                Next project
              </p>
              <p className="text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                {next.title}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </p>
            </Link>
          </div>

          <div className="mt-16 text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button variant="hero" size="xl" onClick={() => openContact(project.services[0])} className="group">
                <span className="flex items-center gap-3">
                  Start a project like this
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WorkDetail;
