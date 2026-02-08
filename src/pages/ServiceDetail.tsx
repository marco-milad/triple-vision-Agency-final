import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Video, Calendar, Share2, Palette, Code, Radio, Sparkles } from 'lucide-react';
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

      {/* What We Offer - Enhanced */}
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

      {/* Our Process - Enhanced */}
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

      {/* Portfolio - Enhanced */}
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
            {service.portfolio.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute inset-0 p-6 flex items-end">
                  <h3 className="text-lg md:text-xl font-black text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                  'Experienced team with 8+ years in the industry',
                  'Proven track record with 200+ successful projects',
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