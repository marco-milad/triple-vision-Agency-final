import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useContact } from '@/contexts/ContactContext';
import { services, getServiceBySlug, legacyServiceRedirects } from '@/data/services';
import { company, yearsInBusiness } from '@/data/company';
import { projectsByService } from '@/data/portfolio';
import ProjectImage from '@/components/ProjectImage';
import NotFound from '@/pages/NotFound';
import Seo from '@/components/Seo';


const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openContact } = useContact();

  const service = getServiceBySlug(slug);
  const legacyTarget = slug ? legacyServiceRedirects[slug] : undefined;

  // Old links keep working (Vercel redirects in production, this covers the SPA).
  if (legacyTarget) return <Navigate to={legacyTarget} replace />;
  if (!service) return <NotFound />;

  const Icon = service.icon;
  const portfolio = projectsByService(service.slug);
  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <Layout>
      <Seo title={service.title} description={service.summary} />
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
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
              className="relative inline-block mb-8"
            >
              {/* Icon Glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} blur-2xl opacity-40`} />
              
              <div className={`relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${service.color} shadow-2xl`}>
                <Icon className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-4 leading-[1.1]">
              {service.title}
            </h1>
            
            <p className="text-primary text-xl md:text-2xl font-bold mb-6">
              {service.tagline}
            </p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              {service.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button variant="hero" size="xl" onClick={() => openContact(slug)} className="group">
                <span className="flex items-center gap-3">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
              className={`mt-10 h-1.5 w-32 mx-auto bg-gradient-to-r ${service.color} rounded-full shadow-lg`}
            />
          </motion.div>
        </div>
      </section>

      {/* What We Offer - hidden until offerings are confirmed */}
      {service.offerings.length > 0 && (
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                What We Offer
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
              Our{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                {service.title}
              </span>{' '}
              Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.offerings.map((offering, index) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">
                  {offering.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{offering.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      )}

      {/* Our Process - hidden until the process is confirmed */}
      {service.process.length > 0 && (
      <section className="section-padding bg-gradient-to-br from-background-secondary via-background to-background-secondary relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Process
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
              How We{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Work
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative group"
              >
                {/* Step Number */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 shadow-xl`}
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <span className="text-3xl font-black text-primary">{step.step}</span>
                  </div>
                </motion.div>

                <h3 className="text-xl md:text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{step.description}</p>

                {/* Connecting Line */}
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      )}

      {/* Portfolio */}
      {portfolio.length > 0 && (
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Work
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
              Featured{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <Link to={`/work/${project.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ProjectImage
                      src={project.cover}
                      alt={`${project.title} for ${project.client}`}
                      label={project.client}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5 bg-background/60 backdrop-blur-sm">
                    <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{project.client}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      )}

      {/* Why Triple Vision - Enhanced */}
      <section className="section-padding bg-gradient-to-br from-background-secondary via-background to-background-secondary">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Why Choose Us
                </span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-8">
                The Triple Vision{' '}
                <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  Advantage
                </span>
              </h2>

              <ul className="space-y-5">
                {[
                  `Experienced team, ${yearsInBusiness()}+ years in the industry`,
                  `Proven track record with ${company.stats.projects}+ successful projects`,
                  'End-to-end service from concept to delivery',
                  'Dedicated project management and support'
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + idx * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-base md:text-lg group-hover:text-foreground transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative p-12 md:p-16 rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-orange-500/10 backdrop-blur-xl text-center">
                <div className="text-7xl md:text-8xl font-black bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent mb-4">
                  98%
                </div>
                <p className="text-foreground font-bold text-xl md:text-2xl mb-2">Client Satisfaction</p>
                <p className="text-muted-foreground">Based on post-project surveys</p>
              </div>
            </motion.div>
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
                  Get Started?
                </span>
              </h2>
              
              <p className="text-muted-foreground text-lg md:text-xl mb-10">
                Let's discuss how our {service.title.toLowerCase()} services can help you achieve your goals.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="hero" size="xl" onClick={() => openContact(slug)} className="group">
                  <span className="flex items-center gap-3">
                    Request a Quote
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services - Enhanced */}
      <section className="py-16 px-6 bg-gradient-to-br from-background-secondary to-background border-t-2 border-border/50">
        <div className="container mx-auto">
          <h3 className="text-2xl md:text-3xl font-black text-foreground mb-10 text-center">
            Explore{' '}
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              Other Services
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {otherServices.map((s, idx) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={`/services/${s.slug}`}>
                  <Button variant="outline" size="default" className="font-bold">
                    {s.title}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ServiceDetail;