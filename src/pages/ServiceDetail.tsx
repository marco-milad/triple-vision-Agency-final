import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Video, Calendar, Share2, Palette, Code, Radio } from 'lucide-react';
import { useContact } from '@/contexts/ContactContext';

const servicesData = {
  'media-production': {
    icon: Video,
    title: 'Media Production',
    tagline: 'Cinematic storytelling that captivates and converts.',
    description: 'Our media production team crafts compelling visual narratives that bring your brand to life. From concept to final cut, we deliver cinematic experiences that resonate with your audience.',
    color: 'from-orange-500 to-red-500',
    offerings: [
      { title: 'Commercial Videos', description: 'High-impact ads that drive conversions and brand awareness.' },
      { title: 'Corporate Films', description: 'Professional company profiles and internal communications.' },
      { title: 'Documentaries', description: 'In-depth storytelling that showcases your brand\'s journey.' },
      { title: 'Motion Graphics', description: 'Animated content that explains complex ideas simply.' },
      { title: 'Product Videos', description: 'Showcase your products with stunning visual presentations.' },
      { title: 'Social Media Content', description: 'Short-form video optimized for social platforms.' },
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'We dive deep into your brand, goals, and target audience.' },
      { step: 2, title: 'Concept & Script', description: 'Creative development and storyboarding for your vision.' },
      { step: 3, title: 'Production', description: 'Professional filming with state-of-the-art equipment.' },
      { step: 4, title: 'Post-Production', description: 'Editing, color grading, and final delivery.' },
    ],
    portfolio: [
      { title: 'Luxe Fashion Film', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80' },
      { title: 'Tech Product Launch', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80' },
      { title: 'Brand Documentary', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80' },
    ],
  },
  'event-planning': {
    icon: Calendar,
    title: 'Event Planning & Coverage',
    tagline: 'Unforgettable events, flawlessly executed.',
    description: 'From intimate gatherings to large-scale productions, we handle every detail of your event while capturing it beautifully for lasting impact.',
    color: 'from-purple-500 to-pink-500',
    offerings: [
      { title: 'Corporate Events', description: 'Conferences, seminars, and team-building experiences.' },
      { title: 'Product Launches', description: 'Memorable reveals that generate buzz and excitement.' },
      { title: 'Live Event Coverage', description: 'Real-time documentation for social and marketing.' },
      { title: 'Virtual Events', description: 'Professional hybrid and online event production.' },
      { title: 'Galas & Award Shows', description: 'Elegant celebrations with premium production value.' },
      { title: 'Trade Show Presence', description: 'Stand design, staffing, and content creation.' },
    ],
    process: [
      { step: 1, title: 'Planning', description: 'Detailed event strategy and timeline development.' },
      { step: 2, title: 'Logistics', description: 'Venue, vendors, and resource coordination.' },
      { step: 3, title: 'Execution', description: 'Seamless on-site management and coverage.' },
      { step: 4, title: 'Delivery', description: 'Post-event content and analysis delivery.' },
    ],
    portfolio: [
      { title: 'Tech Summit 2024', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
      { title: 'Product Launch Gala', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80' },
      { title: 'Music Festival', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80' },
    ],
  },
  'digital-media': {
    icon: Share2,
    title: 'Digital Media Services',
    tagline: 'Strategic content that builds communities.',
    description: 'We develop and execute comprehensive digital media strategies that grow your audience, increase engagement, and drive conversions across all platforms.',
    color: 'from-blue-500 to-cyan-500',
    offerings: [
      { title: 'Social Media Strategy', description: 'Data-driven approach to platform growth.' },
      { title: 'Content Creation', description: 'Scroll-stopping content for every platform.' },
      { title: 'Community Management', description: 'Engaged audiences through meaningful interactions.' },
      { title: 'Influencer Campaigns', description: 'Strategic partnerships with relevant creators.' },
      { title: 'Paid Social Advertising', description: 'Targeted campaigns that maximize ROI.' },
      { title: 'Analytics & Reporting', description: 'Data insights to optimize performance.' },
    ],
    process: [
      { step: 1, title: 'Audit', description: 'Comprehensive analysis of current digital presence.' },
      { step: 2, title: 'Strategy', description: 'Custom roadmap aligned with business goals.' },
      { step: 3, title: 'Execution', description: 'Content creation and campaign management.' },
      { step: 4, title: 'Optimization', description: 'Continuous improvement based on data.' },
    ],
    portfolio: [
      { title: 'Wellness App Campaign', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80' },
      { title: 'E-commerce Growth', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80' },
      { title: 'B2B Lead Gen', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
    ],
  },
  'graphics-branding': {
    icon: Palette,
    title: 'Graphics & Branding',
    tagline: 'Visual identities that leave lasting impressions.',
    description: 'We create comprehensive brand identities that communicate your values, connect with your audience, and differentiate you from the competition.',
    color: 'from-green-500 to-emerald-500',
    offerings: [
      { title: 'Logo Design', description: 'Distinctive marks that represent your brand.' },
      { title: 'Brand Guidelines', description: 'Comprehensive standards for consistent execution.' },
      { title: 'Print Design', description: 'Business cards, brochures, and marketing collateral.' },
      { title: 'Packaging Design', description: 'Shelf-ready designs that drive purchases.' },
      { title: 'Environmental Design', description: 'Signage and space branding solutions.' },
      { title: 'Digital Assets', description: 'Social templates, presentations, and more.' },
    ],
    process: [
      { step: 1, title: 'Research', description: 'Deep dive into your market and competition.' },
      { step: 2, title: 'Concept Development', description: 'Multiple creative directions for exploration.' },
      { step: 3, title: 'Refinement', description: 'Polishing the chosen direction to perfection.' },
      { step: 4, title: 'Brand System', description: 'Complete guidelines and asset delivery.' },
    ],
    portfolio: [
      { title: 'Artisan Coffee Rebrand', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80' },
      { title: 'Fintech Identity', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
      { title: 'Luxury Packaging', image: 'https://images.unsplash.com/photo-1605289355680-75fb41239154?w=800&q=80' },
    ],
  },
  'web-development': {
    icon: Code,
    title: 'Web Development',
    tagline: 'Digital experiences that perform and convert.',
    description: 'We build stunning, high-performance websites and web applications that deliver exceptional user experiences and drive business results.',
    color: 'from-indigo-500 to-violet-500',
    offerings: [
      { title: 'Custom Websites', description: 'Tailored solutions for unique business needs.' },
      { title: 'E-Commerce Platforms', description: 'Online stores that maximize conversions.' },
      { title: 'Web Applications', description: 'Complex functionality with intuitive interfaces.' },
      { title: 'UI/UX Design', description: 'User-centered design that delights and converts.' },
      { title: 'CMS Integration', description: 'Easy content management for your team.' },
      { title: 'Performance Optimization', description: 'Lightning-fast sites that rank higher.' },
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'Understanding requirements and user needs.' },
      { step: 2, title: 'Design', description: 'Wireframes, prototypes, and visual design.' },
      { step: 3, title: 'Development', description: 'Clean code and robust architecture.' },
      { step: 4, title: 'Launch & Support', description: 'Deployment, training, and ongoing maintenance.' },
    ],
    portfolio: [
      { title: 'E-Commerce Platform', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
      { title: 'SaaS Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
      { title: 'Portfolio Site', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80' },
    ],
  },
  'pr-media-monitoring': {
    icon: Radio,
    title: 'PR & Media Monitoring',
    tagline: 'Strategic communications that shape perception.',
    description: 'We develop and execute PR strategies while monitoring your brand\'s presence across all media channels to protect and enhance your reputation.',
    color: 'from-amber-500 to-orange-500',
    offerings: [
      { title: 'Press Releases', description: 'Compelling announcements that get coverage.' },
      { title: 'Media Relations', description: 'Building relationships with key journalists.' },
      { title: 'Crisis Management', description: 'Swift response to protect your reputation.' },
      { title: 'Brand Monitoring', description: 'Real-time tracking of mentions and sentiment.' },
      { title: 'Thought Leadership', description: 'Positioning executives as industry experts.' },
      { title: 'Media Training', description: 'Preparing spokespeople for interviews.' },
    ],
    process: [
      { step: 1, title: 'Assessment', description: 'Analyzing current reputation and opportunities.' },
      { step: 2, title: 'Strategy', description: 'Developing messaging and outreach plan.' },
      { step: 3, title: 'Execution', description: 'Media outreach and content distribution.' },
      { step: 4, title: 'Monitoring', description: 'Tracking coverage and adjusting strategy.' },
    ],
    portfolio: [
      { title: 'Product Launch PR', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80' },
      { title: 'Crisis Response', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80' },
      { title: 'Executive Profiling', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80' },
    ],
  },
};

const relatedServices = [
  { slug: 'media-production', title: 'Media Production' },
  { slug: 'event-planning', title: 'Event Planning' },
  { slug: 'digital-media', title: 'Digital Media' },
  { slug: 'graphics-branding', title: 'Graphics & Branding' },
  { slug: 'web-development', title: 'Web Development' },
  { slug: 'pr-media-monitoring', title: 'PR & Media Monitoring' },
];

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openContact } = useContact();

  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Service not found</p>
        </div>
      </Layout>
    );
  }

  const Icon = service.icon;
  const otherServices = relatedServices.filter((s) => s.slug !== slug);

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
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${service.color} mb-8`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {service.title}
            </h1>
            <p className="text-primary text-xl font-medium mb-4">
              {service.tagline}
            </p>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {service.description}
            </p>
            <Button variant="hero" size="xl" onClick={() => openContact(slug)} className="group">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our {service.title} Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.offerings.map((offering, index) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-glass p-6"
              >
                <CheckCircle className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">{offering.title}</h3>
                <p className="text-muted-foreground text-sm">{offering.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-background-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How We Work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {index < service.process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured {service.title} Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {service.portfolio.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute inset-0 p-6 flex items-end">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Triple Vision */}
      <section className="section-padding bg-background-secondary">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Triple Vision Advantage
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Experienced team with 8+ years in the industry</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Proven track record with 200+ successful projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">End-to-end service from concept to delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Dedicated project management and support</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card-glass p-10 text-center"
            >
              <div className="stat-number mb-4">98%</div>
              <p className="text-foreground font-medium text-xl mb-2">Client Satisfaction</p>
              <p className="text-muted-foreground">Based on post-project surveys</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss how our {service.title.toLowerCase()} services can help you achieve your goals.
            </p>
            <Button variant="hero" size="xl" onClick={() => openContact(slug)} className="group">
              Request a Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 px-6 bg-background-secondary border-t border-border/30">
        <div className="container mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-8 text-center">
            Explore Other Services
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {otherServices.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>
                <Button variant="outline" size="default">
                  {s.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ServiceDetail;
