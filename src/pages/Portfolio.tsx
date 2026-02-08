import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, X, Eye, Heart, Share2, ExternalLink, Sparkles } from 'lucide-react';
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
    fullDescription: 'We created a stunning cinematic brand film that captures the essence of luxury and sophistication. The project involved extensive location scouting, high-end production equipment, and a talented team of professionals.',
    color: 'from-orange-500 to-red-500',
    views: 1243,
    likes: 89,
    client: 'Luxe Fashion House',
    year: '2024',
    tags: ['Cinematography', 'Brand Film', 'Luxury'],
  },
  {
    id: 2,
    title: 'Tech Summit 2024',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    video: false,
    description: 'Complete event coverage for annual tech conference.',
    fullDescription: 'Comprehensive event documentation including keynote speeches, panel discussions, and networking sessions. Multi-camera setup with live streaming capabilities.',
    color: 'from-purple-500 to-pink-500',
    views: 2156,
    likes: 134,
    client: 'Tech Innovators Inc',
    year: '2024',
    tags: ['Event Coverage', 'Live Streaming', 'Photography'],
  },
  {
    id: 3,
    title: 'Artisan Coffee Rebrand',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    video: false,
    description: 'Full brand identity redesign for specialty coffee chain.',
    fullDescription: 'Complete brand overhaul including logo design, color palette, typography, packaging, and brand guidelines. Created a modern, approachable identity that honors the artisan coffee tradition.',
    color: 'from-green-500 to-emerald-500',
    views: 987,
    likes: 76,
    client: 'Artisan Coffee Co.',
    year: '2023',
    tags: ['Logo Design', 'Packaging', 'Brand Guidelines'],
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    video: false,
    description: 'Custom e-commerce solution with advanced features.',
    fullDescription: 'Built a scalable e-commerce platform with custom product configurator, real-time inventory management, and integrated payment gateway. Optimized for performance and SEO.',
    color: 'from-indigo-500 to-violet-500',
    views: 1567,
    likes: 112,
    client: 'Fashion Retail Group',
    year: '2024',
    tags: ['React', 'Node.js', 'E-commerce'],
  },
  {
    id: 5,
    title: 'Wellness App Campaign',
    category: 'Digital Media',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    video: true,
    description: 'Social media campaign for health and wellness app.',
    fullDescription: 'Multi-platform social media campaign featuring user testimonials, educational content, and influencer partnerships. Resulted in 300% increase in app downloads.',
    color: 'from-blue-500 to-cyan-500',
    views: 3421,
    likes: 267,
    client: 'WellnessHub',
    year: '2024',
    tags: ['Social Media', 'Video Content', 'Influencer Marketing'],
  },
  {
    id: 6,
    title: 'Restaurant Documentary',
    category: 'Media Production',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    video: true,
    description: 'Behind-the-scenes documentary for Michelin-star restaurant.',
    fullDescription: 'An intimate documentary showcasing the passion, dedication, and artistry behind a Michelin-starred restaurant. Featured on multiple streaming platforms.',
    color: 'from-amber-500 to-orange-500',
    views: 2890,
    likes: 198,
    client: 'Le Jardin Restaurant',
    year: '2023',
    tags: ['Documentary', 'Food Photography', 'Storytelling'],
  },
  {
    id: 7,
    title: 'Fintech Brand Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    video: false,
    description: 'Modern brand identity for innovative fintech startup.',
    fullDescription: 'Created a fresh, trustworthy brand identity that balances innovation with reliability. Includes complete visual system, motion graphics, and UI components.',
    color: 'from-teal-500 to-green-500',
    views: 1789,
    likes: 143,
    client: 'PayFlow Technologies',
    year: '2024',
    tags: ['Fintech', 'Logo Design', 'UI/UX'],
  },
  {
    id: 8,
    title: 'Music Festival Coverage',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    video: true,
    description: 'Multi-day festival documentation and live content.',
    fullDescription: 'Complete coverage of a 3-day music festival including stage performances, backstage interviews, and crowd reactions. Delivered daily highlight reels for social media.',
    color: 'from-pink-500 to-rose-500',
    views: 4123,
    likes: 321,
    client: 'Summer Sounds Festival',
    year: '2024',
    tags: ['Music', 'Live Events', 'Video Production'],
  },
  {
    id: 9,
    title: 'Corporate Website Redesign',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    video: false,
    description: 'Modern website overhaul for Fortune 500 company.',
    fullDescription: 'Complete redesign of corporate website with focus on user experience, accessibility, and mobile-first approach. Integrated CMS and analytics dashboard.',
    color: 'from-indigo-500 to-purple-500',
    views: 2234,
    likes: 187,
    client: 'Global Corp Industries',
    year: '2024',
    tags: ['UX/UI', 'CMS', 'Responsive Design'],
  },
  {
    id: 10,
    title: 'Product Launch Video',
    category: 'Media Production',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    video: true,
    description: 'High-energy product reveal for tech startup.',
    fullDescription: 'Created an exciting product launch video featuring 3D animations, motion graphics, and dynamic camera work. Video went viral with over 5M views across platforms.',
    color: 'from-cyan-500 to-blue-500',
    views: 5234,
    likes: 432,
    client: 'InnoTech Labs',
    year: '2024',
    tags: ['3D Animation', 'Motion Graphics', 'Product Video'],
  },
  {
    id: 11,
    title: 'Luxury Hotel Branding',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    video: false,
    description: 'Complete brand identity for boutique hotel chain.',
    fullDescription: 'Developed a sophisticated brand identity that reflects the luxury and elegance of the hotel experience. Includes logo, stationery, signage, and digital assets.',
    color: 'from-yellow-500 to-orange-500',
    views: 1456,
    likes: 98,
    client: 'Azure Hotels & Resorts',
    year: '2023',
    tags: ['Hospitality', 'Luxury Branding', 'Print Design'],
  },
  {
    id: 12,
    title: 'Social Media Content Series',
    category: 'Digital Media',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    video: true,
    description: 'Monthly content creation for fashion influencer.',
    fullDescription: 'Produced a series of engaging social media content including reels, stories, and carousel posts. Increased engagement by 450% and follower count by 80K.',
    color: 'from-rose-500 to-pink-500',
    views: 6789,
    likes: 521,
    client: 'StyleIcon Magazine',
    year: '2024',
    tags: ['Instagram', 'TikTok', 'Content Strategy'],
  },
  {
    id: 13,
    title: 'Charity Gala Coverage',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    video: false,
    description: 'Professional photography for annual charity event.',
    fullDescription: 'Captured memorable moments from a high-profile charity gala including candid shots, group photos, and event details. Delivered 500+ edited images within 48 hours.',
    color: 'from-violet-500 to-purple-500',
    views: 1890,
    likes: 156,
    client: 'Hope Foundation',
    year: '2024',
    tags: ['Event Photography', 'Charity', 'Professional'],
  },
  {
    id: 14,
    title: 'Mobile App Development',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    video: false,
    description: 'Cross-platform mobile app for food delivery service.',
    fullDescription: 'Built a feature-rich mobile application with real-time tracking, in-app payments, and AI-powered recommendations. Available on both iOS and Android.',
    color: 'from-emerald-500 to-teal-500',
    views: 3456,
    likes: 289,
    client: 'QuickBite Delivery',
    year: '2024',
    tags: ['React Native', 'Mobile App', 'Real-time'],
  },
  {
    id: 15,
    title: 'Automotive Commercial',
    category: 'Media Production',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    video: true,
    description: 'Cinematic TV commercial for luxury car brand.',
    fullDescription: 'Produced a visually stunning 60-second commercial featuring breathtaking landscapes, dynamic driving shots, and emotional storytelling. Aired during prime time slots.',
    color: 'from-slate-500 to-gray-500',
    views: 7823,
    likes: 645,
    client: 'Prestige Motors',
    year: '2023',
    tags: ['Automotive', 'TV Commercial', 'Cinematography'],
  },
  {
    id: 16,
    title: 'Startup Brand Package',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
    video: false,
    description: 'Full branding suite for tech startup launch.',
    fullDescription: 'Created a complete brand identity including logo variations, color system, typography, brand guidelines, business cards, and pitch deck templates.',
    color: 'from-blue-500 to-indigo-500',
    views: 2145,
    likes: 176,
    client: 'CloudSync Technologies',
    year: '2024',
    tags: ['Startup', 'Brand Identity', 'Pitch Deck'],
  },
  {
    id: 17,
    title: 'YouTube Content Production',
    category: 'Digital Media',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80',
    video: true,
    description: 'Weekly video series for educational YouTube channel.',
    fullDescription: 'Managed full production of weekly educational videos including scripting, filming, editing, and thumbnail design. Channel grew from 50K to 500K subscribers.',
    color: 'from-red-500 to-orange-500',
    views: 8934,
    likes: 712,
    client: 'EduMasters Online',
    year: '2024',
    tags: ['YouTube', 'Education', 'Video Editing'],
  },
  {
    id: 18,
    title: 'Trade Show Booth Design',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80',
    video: false,
    description: 'Interactive booth design for international trade show.',
    fullDescription: 'Designed and executed a 20x30 booth featuring interactive displays, product demonstrations, and VR experiences. Generated over 2,000 qualified leads.',
    color: 'from-cyan-500 to-teal-500',
    views: 2567,
    likes: 203,
    client: 'Industrial Solutions Inc',
    year: '2023',
    tags: ['Trade Show', 'Booth Design', 'Interactive'],
  },
];

// Skeleton Component
const ProjectSkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] border-2 border-border/50 bg-background-secondary">
    {/* Shimmer Effect */}
    <div 
      className="absolute inset-0" 
      style={{ 
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s infinite'
      }} 
    />
    <style>{`
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
    
    <div className="absolute inset-0 p-6 flex flex-col justify-end">
      <div className="w-24 h-6 bg-muted rounded-full mb-3 animate-pulse" />
      <div className="w-3/4 h-8 bg-muted rounded mb-2 animate-pulse" />
      <div className="w-full h-4 bg-muted rounded animate-pulse" />
    </div>
  </div>
);

// Project Card Component
const ProjectCard = ({ project, index, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className="relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer border-2 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl"
      >
        {/* Ripple Effect */}
        <motion.span 
          className="absolute inset-0 rounded-2xl bg-primary/5"
          initial={{ scale: 0, opacity: 0 }}
          animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Image with Loading State */}
        <div className="absolute inset-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={project.image}
            alt={`${project.title} - ${project.category} project preview`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            } group-hover:scale-110`}
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

        {/* Color Accent with Animation */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay`}
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Video Indicator */}
        {project.video && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
            className="absolute top-4 right-4 z-10"
            aria-label="Video content"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-xl border-2 border-white/20 group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" aria-hidden="true" />
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
          <motion.p 
            className="text-muted-foreground text-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="flex items-center gap-4 text-xs text-muted-foreground mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {project.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {project.likes}
            </span>
          </motion.div>

          {/* View Link */}
          <motion.div 
            className="flex items-center gap-2 text-primary font-bold text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span>View Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>

        {/* Corner Decoration */}
        <motion.div 
          className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${project.color} blur-2xl`}
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-2 border-border/50 rounded-3xl shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border-2 border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative w-full aspect-video overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={`${project.title} - ${project.category} project for ${project.client}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          {/* Video Play Button */}
          {project.video && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-2xl border-4 border-white/20"
                aria-label={`Play video for ${project.title}`}
              >
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Category Badge */}
          <span className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${project.color} text-white text-sm font-bold shadow-lg mb-4`}>
            {project.category}
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4" id="project-modal-title">
            {project.title}
          </h2>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6 pb-6 border-b border-border/50">
            <div>
              <span className="text-xs uppercase font-semibold">Client</span>
              <p className="text-foreground font-bold">{project.client}</p>
            </div>
            <div>
              <span className="text-xs uppercase font-semibold">Year</span>
              <p className="text-foreground font-bold">{project.year}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {project.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {project.likes}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleShare}
              aria-label="Share this project"
              className="border-2"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const { openContact } = useContact();

  // Simulate loading when category changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
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

      {/* Filter Section - Improved Mobile */}
      <section className="py-6 md:py-12 px-6 bg-background-secondary border-y-2 border-border/50 sticky top-0 z-40 backdrop-blur-xl">
        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        <div className="container mx-auto">
          {/* Mobile: Horizontal Scroll */}
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex md:flex-wrap md:justify-center gap-2 md:gap-3 min-w-max md:min-w-0"
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
                  aria-label={`Filter projects by ${category}`}
                  aria-pressed={selectedCategory === category}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
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
        </div>
      </section>

      {/* Projects Grid - Improved Mobile Grid */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {isLoading ? (
              // Skeleton Loading
              [...Array(9)].map((_, i) => (
                <ProjectSkeleton key={i} />
              ))
            ) : (
              // Actual Projects
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </AnimatePresence>
            )}
          </motion.div>

          {/* No Results Message */}
          {!isLoading && filteredProjects.length === 0 && (
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

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-6 bg-gradient-to-br from-background-secondary via-background to-background-secondary border-y-2 border-border/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { number: '350+', label: 'Projects Completed' },
              { number: '80+', label: 'Happy Clients' },
              { number: '25+', label: 'Awards Won' },
              { number: '98%', label: 'Satisfaction Rate' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 md:p-6 rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
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

      {/* CTA Section */}
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

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

    </Layout>
  );
};

export default Portfolio;