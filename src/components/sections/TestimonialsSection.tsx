import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Marketing Director',
    company: 'TechFlow Inc.',
    avatar: '',
    rating: 5,
    review: 'Triple Vision transformed our brand identity completely. Their cinematic approach to our product videos increased our engagement by 300%. Absolutely phenomenal work!',
  },
  {
    name: 'James Okonkwo',
    role: 'CEO',
    company: 'Horizon Ventures',
    avatar: '',
    rating: 5,
    review: 'Working with Triple Vision was a game-changer. They understood our vision from day one and delivered beyond expectations. The team is incredibly professional and creative.',
  },
  {
    name: 'Emily Chen',
    role: 'Brand Manager',
    company: 'Luxe Lifestyle',
    avatar: '',
    rating: 5,
    review: 'The attention to detail is unmatched. From concept to execution, every frame was crafted with precision. Our campaign went viral thanks to their exceptional storytelling.',
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? 'text-primary fill-primary' : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what industry leaders have to say 
            about working with Triple Vision Agency.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="card-glass card-hover p-8 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/30 mb-4" />

                {/* Review Text */}
                <p className="text-foreground/90 leading-relaxed mb-6 flex-grow">
                  "{testimonial.review}"
                </p>

                {/* Rating */}
                <div className="mb-6">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <Avatar className="w-12 h-12 border-2 border-primary/30">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-foreground font-semibold group-hover:text-primary transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 border-2 border-background flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-primary-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-foreground font-medium ml-2">
              Trusted by <span className="text-primary">50+</span> clients worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
