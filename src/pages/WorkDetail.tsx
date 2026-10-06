import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import ProjectImage from '@/components/ProjectImage';
import Figure, { isPortrait } from '@/components/work/Figure';
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

  const wideShots = project.gallery.filter((image) => !isPortrait(image));
  const phoneShots = project.gallery.filter(isPortrait);

  /**
   * Social campaign work is a run of finished artwork rather than a product to
   * explain, so it reads best the way the boards were made: the brief to one
   * side, then every piece full width, in order, at its own shape and with
   * nothing between.
   */
  const stacked = project.galleryStyle === 'stacked';
  const facts = project.facts ?? [
    { label: 'Client', value: project.client },
    { label: 'Industry', value: project.industry },
    ...(project.year ? [{ label: 'Year', value: project.year }] : []),
    { label: 'Services', value: projectServices.map((service) => service.title).join(', ') },
  ];
  const stackedImages = [
    ...(project.cover
      ? [{
          src: project.cover,
          alt: project.coverAlt ?? `${project.title} for ${project.client}`,
          width: project.coverWidth,
          height: project.coverHeight,
        }]
      : []),
    ...project.gallery,
  ];

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
            className={stacked ? 'grid lg:grid-cols-12 gap-x-12 gap-y-10' : 'max-w-4xl'}
          >
            <div className={stacked ? 'lg:col-span-5' : ''}>
              {project.category && (
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">{project.category}</p>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 leading-[1.1]">
                {project.title}
              </h1>

              {/* The brief, beside the title rather than in a strip below it. */}
              {stacked && (
                <dl className="mt-10 pt-8 border-t border-border/50 space-y-6">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs text-muted-foreground/60 font-semibold uppercase tracking-wider mb-1.5">
                        {fact.label}
                      </dt>
                      <dd className="text-foreground font-semibold">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className={stacked ? 'lg:col-span-6 lg:col-start-7' : ''}>
              <p className="text-muted-foreground text-lg md:text-xl mb-8">{project.summary}</p>

              {/* Honest while the real artwork is still coming. */}
              {project.placeholder && (
                <p className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-xl border border-border/50 bg-muted/20 text-muted-foreground/80 text-sm">
                  Sample layout — the artwork and names on this page are stand-ins.
                </p>
              )}

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
            </div>
          </motion.div>
        </div>
      </section>

      {/* The campaign, run end to end with nothing between the pieces */}
      {stacked && stackedImages.length > 0 && (
        <section className="bg-background-secondary">
          <div className="mx-auto max-w-[1400px]">
            {stackedImages.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            ))}
          </div>
        </section>
      )}

      {/* Cover, at its own shape */}
      {!stacked && (
      <section className="px-6 pb-16">
        <div className="container mx-auto max-w-5xl">
          {project.cover ? (
            <Figure
              image={{
                src: project.cover,
                alt: project.coverAlt ?? `${project.title} for ${project.client}`,
                width: project.coverWidth,
                height: project.coverHeight,
              }}
            />
          ) : (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-border/50">
              <ProjectImage
                src={null}
                alt={`${project.title} for ${project.client}`}
                label={`${project.client} — cover artwork`}
                size="hero"
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </section>
      )}

      {/* Facts */}
      {!stacked && (
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 rounded-2xl overflow-hidden border-2 border-border/50">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-background p-5">
                <dt className="text-xs text-muted-foreground/60 font-semibold uppercase tracking-wider mb-2">
                  {fact.label}
                </dt>
                <dd className="text-foreground font-bold text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {project.stack && project.stack.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground/60 font-semibold uppercase tracking-wider mr-2">
                Built with
              </span>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 text-muted-foreground text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      {/* The written case study */}
      {project.sections?.map((section, index) => (
        <section
          key={`${section.type}-${index}`}
          className={`py-16 md:py-24 px-6 relative ${
            index % 2 === 1 ? 'bg-background-secondary/40' : 'bg-background'
          }`}
        >
          <div className="container mx-auto max-w-5xl">
            {section.title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-6 max-w-3xl"
              >
                {section.title}
              </motion.h2>
            )}

            {section.body?.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5 max-w-3xl"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Each feature sits beside the screen that shows it. */}
            {section.items && (
              <div className="mt-12 space-y-16">
                {section.items.map((item, i) => (
                  <div
                    key={item.title}
                    className={`grid gap-8 items-center ${item.figure ? 'lg:grid-cols-2' : ''}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5 }}
                      className={item.figure && i % 2 === 1 ? 'lg:order-2' : ''}
                    >
                      <h3 className="text-xl md:text-2xl font-black text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                    </motion.div>

                    {item.figure && <Figure image={item.figure} className={i % 2 === 1 ? 'lg:order-1' : ''} />}
                  </div>
                ))}
              </div>
            )}

            {section.figure && <Figure image={section.figure} className="mt-10" />}
          </div>
        </section>
      ))}

      {/* Everything else, at full width */}
      {!stacked && wideShots.length > 0 && (
        <section className="py-16 md:py-24 px-6 bg-background">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-10">
              {project.galleryHeading ? (
                <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  {project.galleryHeading}
                </span>
              ) : (
                <>
                  More{' '}
                  <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                    screens
                  </span>
                </>
              )}
            </h2>

            <div className="space-y-10">
              {wideShots.map((image) => (
                <Figure key={image.src} image={image} />
              ))}
            </div>
          </div>
        </section>
      )}

      {!stacked && phoneShots.length > 0 && (
        <section className="py-16 md:py-24 px-6 bg-background-secondary/40">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-10">
              On a{' '}
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">phone</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {phoneShots.map((image) => (
                <Figure key={image.src} image={image} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Placeholder state for projects whose artwork has not arrived yet */}
      {project.gallery.length === 0 && !project.sections?.length && (
        <section className="py-16 px-6 bg-background">
          <div className="container mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-border/50"
              >
                <ProjectImage
                  src={null}
                  alt={`${project.title} — image ${index + 1}`}
                  label={`Artwork ${index + 1}`}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        </section>
      )}

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

            <Link to={`/work/${next.slug}`} className="group text-center md:text-right">
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
