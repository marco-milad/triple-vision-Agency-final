import { motion } from 'framer-motion';
import { Quote, Sparkles, Award, Users, TrendingUp, Linkedin, Instagram, Twitter, Mail } from 'lucide-react';
import ceoPortrait from '@/assets/ceo-portrait.jpg';
import { useSectionInView } from '@/hooks/use-in-view-animation';

const achievements = [
  { icon: Award, label: '200+ Projects', color: 'from-primary to-orange-500' },
  { icon: Users, label: '50+ Clients', color: 'from-orange-500 to-pink-500' },
  { icon: TrendingUp, label: '8+ Years', color: 'from-pink-500 to-purple-500' },
];

const socialLinks = [
  { 
    icon: Linkedin, 
    label: 'LinkedIn', 
    url: 'https://linkedin.com/in/mariondungu',
    color: 'hover:text-[#0077B5]'
  },
  { 
    icon: Instagram, 
    label: 'Instagram', 
    url: 'https://instagram.com/mariondungu',
    color: 'hover:text-[#E4405F]'
  },
  { 
    icon: Twitter, 
    label: 'Twitter', 
    url: 'https://twitter.com/mariondungu',
    color: 'hover:text-[#1DA1F2]'
  },
  { 
    icon: Mail, 
    label: 'Email', 
    url: 'mailto:mario@triplevision.agency',
    color: 'hover:text-primary'
  },
];

const CEOSection = () => {
  const { ref: sectionRef, isInView } = useSectionInView();

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px]" style={{ animationPlayState: isInView ? 'running' : 'paused' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      {/* Animated Grid Background */}
      <motion.div
        animate={isInView ? { backgroundPosition: ['0px 0px', '60px 60px'] } : undefined}
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

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Animated Decorative Rings */}
              <motion.div
                animate={isInView ? { rotate: 360 } : undefined}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 rounded-full border-2 border-primary/10"
              />
              <motion.div
                animate={isInView ? { rotate: -360 } : undefined}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-12 rounded-full border border-primary/5"
              />

              {/* Decorative Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-orange-500/10 to-pink-500/20 blur-2xl"
              />
              
              {/* Main Image Container */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border-2 border-primary/20"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={ceoPortrait}
                  alt="Mario Ndungu - CEO & Founder"
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover"
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                {/* Sparkle Effect on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"
                />
              </motion.div>

              {/* Floating Badge - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.1, rotate: 3 }}
                className="absolute -bottom-8 -right-8 bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-6 shadow-2xl shadow-primary/50 border border-primary/30"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-white" />
                  <p className="text-white font-black text-2xl">8+ Years</p>
                </div>
                <p className="text-white/90 text-sm font-semibold">Leading Innovation</p>
              </motion.div>

              {/* Achievement Icons - Floating */}
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={isInView ? { 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  } : undefined}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.5 + index * 0.1 },
                    scale: { duration: 0.5, delay: 0.5 + index * 0.1, type: 'spring' },
                    y: { duration: 3 + index, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 3 + index, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="absolute hidden lg:block"
                  style={{
                    top: `${20 + index * 25}%`,
                    left: index % 2 === 0 ? '-12%' : 'auto',
                    right: index % 2 === 1 ? '-12%' : 'auto',
                  }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} p-0.5 shadow-xl`}>
                    <div className="w-full h-full rounded-2xl bg-background/90 backdrop-blur-xl flex items-center justify-center">
                      <achievement.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Leadership
              </span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-8 leading-[1.1]">
              Meet Our{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Visionary Leader
              </span>
            </h2>

            {/* Quote - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mb-10 p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm"
            >
              <motion.div
                animate={isInView ? { rotate: [0, 5, 0], scale: [1, 1.1, 1] } : undefined}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Quote className="w-12 h-12 text-primary/40 absolute -top-4 -left-4" />
              </motion.div>
              <blockquote className="pl-6 text-lg md:text-xl text-foreground/90 italic leading-relaxed relative z-10">
                "Creativity is not just about making things look beautiful—it's about{' '}
                <span className="text-primary font-semibold not-italic">telling stories</span> that move people and create{' '}
                <span className="text-primary font-semibold not-italic">lasting impact</span>."
              </blockquote>
            </motion.div>

            {/* Name & Title - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                Mario Maged
              </h3>
              <p className="text-primary font-bold text-lg mb-4">CEO & Founder</p>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-xl border-2 border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Bio - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                With over <span className="text-foreground font-semibold">8 years of experience</span> in media production and creative direction, 
                Mario founded Triple Vision Agency with a singular mission: to transform bold 
                ideas into <span className="text-primary font-semibold">cinematic realities</span>.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                His passion for storytelling and unwavering commitment to 
                excellence has helped <span className="text-foreground font-semibold">200+ brands</span> elevate their presence and connect with 
                audiences on a deeper, more meaningful level.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-6"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${achievement.color} p-0.5`}>
                    <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                      <achievement.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <span className="text-foreground font-semibold text-sm">{achievement.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative Line - Enhanced */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
              className="mt-10 h-1.5 w-32 bg-gradient-to-r from-primary via-orange-500 to-pink-500 rounded-full origin-left shadow-lg shadow-primary/50"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;