import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const portfolioItems = [
  {
    title: 'Brand Film Production',
    category: 'Media Production',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'Tech Summit 2024',
    category: 'Event Coverage',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'Luxe Brand Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    color: 'from-green-500/20 to-emerald-500/20',
  },
];

const PortfolioPreview = () => {
  return (
    <section className="section-padding bg-background-secondary relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,140,0,0.05),transparent_50%)]" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <Link to="/portfolio">
            <Button variant="outline" className="group">
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <span className="text-primary text-sm font-medium mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-foreground opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="font-medium">View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
