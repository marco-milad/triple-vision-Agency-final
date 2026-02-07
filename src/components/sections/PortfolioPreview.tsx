import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles, Play, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSectionInView } from '@/hooks/use-in-view-animation';

const portfolioItems = [
  {
    title: 'Brand Film Production',
    category: 'Media Production',
    client: 'Premium Tech Co.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    color: 'from-orange-500/20 to-red-500/20',
    gradient: 'from-orange-500 to-red-500',
    type: 'video',
  },
  {
    title: 'Tech Summit 2024',
    category: 'Event Coverage',
    client: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    color: 'from-purple-500/20 to-pink-500/20',
    gradient: 'from-purple-500 to-pink-500',
    type: 'image',
  },
  {
    title: 'Luxe Brand Identity',
    category: 'Branding',
    client: 'Luxury Brand',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    color: 'from-blue-500/20 to-cyan-500/20',
    gradient: 'from-blue-500 to-cyan-500',
    type: 'image',
  },
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    client: 'Retail Giant',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    color: 'from-green-500/20 to-emerald-500/20',
    gradient: 'from-green-500 to-emerald-500',
    type: 'web',
  },
];

const PortfolioPreview = () => {
  const { ref: sectionRef, isInView } = useSectionInView();

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-br from-background-secondary via-background to-background-secondary relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px]" style={{ animationPlayState: isInView ? 'running' : 'paused' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      {/* Animated Grid */}
      <motion.div
        animate={isInView ? { backgroundPosition: ['0px 0px', '60px 60px'] } : undefined}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Work
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-4 leading-[1.1]">
              Featured{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Explore our latest work and see how we bring <span className="text-primary font-semibold">bold ideas</span> to life.
            </p>
          </div>
          
          <Link to="/portfolio">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="group relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative z-10">View All Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to="/portfolio" className="block group">
                <motion.div 
                  className="relative overflow-hidden rounded-2xl aspect-[4/3] border-2 border-border/50 bg-background/50"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />

                  {/* Type Icon Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    className="absolute top-6 right-6 z-20"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-xl backdrop-blur-sm`}>
                      {item.type === 'video' && <Play className="w-6 h-6 text-white fill-white" />}
                      {item.type === 'image' && <Eye className="w-6 h-6 text-white" />}
                      {item.type === 'web' && <ExternalLink className="w-5 h-5 text-white" />}
                    </div>
                  </motion.div>

                  {/* Hover Overlay with Icon */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center"
                    >
                      <ExternalLink className="w-7 h-7 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-3">
                        <span className="text-primary text-xs md:text-sm font-semibold">
                          {item.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-2 group-hover:text-primary transition-colors drop-shadow-lg">
                        {item.title}
                      </h3>

                      {/* Client */}
                      <p className="text-white/80 text-sm md:text-base mb-4 font-medium">
                        Client: {item.client}
                      </p>

                      {/* View Project Link */}
                      <motion.div 
                        className="flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <span>View Project</span>
                        <motion.div
                          animate={isInView ? { x: [0, 4, 0] } : undefined}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-12 border-t border-border/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '200+', label: 'Projects Completed' },
              { value: '50+', label: 'Satisfied Clients' },
              { value: '15+', label: 'Industry Awards' },
              { value: '8+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default PortfolioPreview;