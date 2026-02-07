import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Sparkles, TrendingUp, Award, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Marketing Director',
    company: 'TechFlow Inc.',
    avatar: '',
    rating: 5,
    review: 'Triple Vision transformed our brand identity completely. Their cinematic approach to our product videos increased our engagement by 300%. Absolutely phenomenal work!',
    metric: '300% Engagement',
    color: 'from-primary to-orange-500',
  },
  {
    name: 'James Okonkwo',
    role: 'CEO',
    company: 'Horizon Ventures',
    avatar: '',
    rating: 5,
    review: 'Working with Triple Vision was a game-changer. They understood our vision from day one and delivered beyond expectations. The team is incredibly professional and creative.',
    metric: 'Game Changer',
    color: 'from-orange-500 to-pink-500',
  },
  {
    name: 'Emily Chen',
    role: 'Brand Manager',
    company: 'Luxe Lifestyle',
    avatar: '',
    rating: 5,
    review: 'The attention to detail is unmatched. From concept to execution, every frame was crafted with precision. Our campaign went viral thanks to their exceptional storytelling.',
    metric: 'Went Viral',
    color: 'from-pink-500 to-purple-500',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Founder',
    company: 'StartUp Labs',
    avatar: '',
    rating: 5,
    review: 'Their creative vision and technical expertise helped us launch our product with a bang. The ROI was incredible - we got 500% more sign-ups than projected!',
    metric: '500% ROI',
    color: 'from-purple-500 to-blue-500',
  },
  {
    name: 'Aisha Kamau',
    role: 'Creative Director',
    company: 'Design Studios',
    avatar: '',
    rating: 5,
    review: 'As a creative professional myself, I\'m incredibly picky. Triple Vision exceeded all expectations. Their storytelling ability is world-class.',
    metric: 'World-Class',
    color: 'from-blue-500 to-primary',
  },
  {
    name: 'David Thompson',
    role: 'VP Marketing',
    company: 'Global Brands Inc.',
    avatar: '',
    rating: 5,
    review: 'We\'ve worked with many agencies, but Triple Vision stands out. They delivered a campaign that generated over 2M impressions in the first week alone!',
    metric: '2M+ Impressions',
    color: 'from-primary to-pink-500',
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.05,
            type: 'spring'
          }}
        >
          <Star
            className={`w-5 h-5 ${
              index < rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get visible testimonials (3 at a time)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], displayIndex: i });
    }
    return visible;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className="section-padding bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      {/* Animated Grid Background */}
      <motion.div
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 25,
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

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container mx-auto relative z-10">
        {/* Section Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
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
              Testimonials
            </span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-6 leading-[1.1]">
            What Our{' '}
            <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed"
          >
            Don't just take our word for it. Here's what industry leaders have to say 
            about working with Triple Vision Agency.
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="mt-8 h-1.5 w-32 mx-auto bg-gradient-to-r from-primary via-orange-500 to-pink-500 rounded-full shadow-lg shadow-primary/50"
          />
        </motion.div>

        {/* Testimonials Slider Container */}
        <div className="relative mb-16">
          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center -mx-4 lg:-mx-8">
                {/* Previous Button */}
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 border-2 border-primary/30 shadow-2xl shadow-primary/50 flex items-center justify-center group hover:shadow-primary/70 transition-all duration-300"
                >
                  <ChevronLeft className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:scale-125 transition-transform" />
                </motion.button>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-pink-600 border-2 border-orange-500/30 shadow-2xl shadow-orange-500/50 flex items-center justify-center group hover:shadow-orange-500/70 transition-all duration-300"
                >
                  <ChevronRight className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:scale-125 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {getVisibleTestimonials().map((testimonial) => (
                <motion.div
                  key={`${testimonial.name}-${currentIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className="group relative h-full"
                >
                  {/* Card Glow Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${testimonial.color} blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
                  />

                  {/* Main Card */}
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full p-8 rounded-2xl border-2 border-border/50 bg-background/90 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Background Pattern */}
                    <div 
                      className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-300"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }}
                    />

                    {/* Quote Icon - Animated */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative mb-6"
                    >
                      <Quote className="w-12 h-12 text-primary/40" />
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
                    </motion.div>

                    {/* Review Text */}
                    <p className="relative text-foreground/90 leading-relaxed mb-6 flex-grow text-sm md:text-base">
                      "{testimonial.review}"
                    </p>

                    {/* Rating - Animated */}
                    <div className="relative mb-6">
                      <StarRating rating={testimonial.rating} />
                    </div>

                    {/* Metric Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className={`relative mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.color} text-white font-bold text-xs shadow-lg`}
                    >
                      <TrendingUp className="w-4 h-4" />
                      {testimonial.metric}
                    </motion.div>

                    {/* Client Info */}
                    <div className="relative flex items-center gap-4 pt-6 border-t-2 border-border/50">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Avatar className={`w-14 h-14 border-2 border-primary/30 ring-4 ring-primary/10 shadow-xl`}>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className={`bg-gradient-to-br ${testimonial.color} text-white font-black text-lg`}>
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <h4 className="text-foreground font-black text-base group-hover:text-primary transition-colors">
                          {testimonial.name}
                        </h4>
                        <p className="text-muted-foreground text-xs md:text-sm font-medium">
                          {testimonial.role}
                        </p>
                        <p className="text-primary text-xs font-semibold">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* Corner Decoration */}
                    <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${testimonial.color} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
                    
                    {/* Verified Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4, type: 'spring' }}
                      className="absolute top-4 right-4"
                    >
                      <div className="relative">
                        <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-500/20" />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-green-500/30 blur-md"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center items-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-12 bg-gradient-to-r from-primary to-orange-500' 
                    : 'w-2 bg-muted-foreground/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badge - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-br from-primary/10 via-orange-500/10 to-pink-500/10 border-2 border-primary/30 backdrop-blur-xl shadow-2xl shadow-primary/20"
          >
            {/* Avatars Stack */}
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.6 + i * 0.1,
                    type: 'spring'
                  }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  className="relative"
                >
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                      i === 0 ? 'from-primary to-orange-500' :
                      i === 1 ? 'from-orange-500 to-pink-500' :
                      i === 2 ? 'from-pink-500 to-purple-500' :
                      i === 3 ? 'from-purple-500 to-blue-500' :
                      'from-blue-500 to-primary'
                    } border-3 border-background flex items-center justify-center shadow-lg transition-transform`}
                  >
                    <span className="text-xs font-black text-white">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Text */}
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-foreground font-black text-base md:text-lg">
                Trusted by <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">50+</span> clients worldwide
              </span>
            </div>

            {/* Sparkle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { label: '5-Star Reviews', value: '98%', icon: Star },
            { label: 'Client Retention', value: '95%', icon: TrendingUp },
            { label: 'Projects Delivered', value: '200+', icon: Award },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;