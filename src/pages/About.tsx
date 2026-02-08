import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Eye, Heart, Users, Sparkles, Award, TrendingUp } from 'lucide-react';
import { useContact } from '@/contexts/ContactContext';

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We pursue perfection in every project, no matter the scale.',
    color: 'from-primary to-orange-500',
  },
  {
    icon: Eye,
    title: 'Vision',
    description: 'We see beyond the obvious to create truly innovative solutions.',
    color: 'from-orange-500 to-pink-500',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Every project is fueled by genuine enthusiasm and dedication.',
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work with clients as true partners in their success.',
    color: 'from-purple-500 to-primary',
  },
];

const team = [
  { name: 'Alex Morgan', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Sarah Chen', role: 'Lead Designer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Marcus Johnson', role: 'Video Producer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Emily Rodriguez', role: 'Brand Strategist', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
];

const stats = [
  { icon: Award, number: '200+', label: 'Projects Completed' },
  { icon: Users, number: '50+', label: 'Happy Clients' },
  { icon: TrendingUp, number: '8+', label: 'Years Experience' },
];

const About = () => {
  const { openContact } = useContact();

  return (
    <Layout>
      {/* Hero Section - Enhanced */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px] animate-pulse"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px]"
          />
        </div>

        {/* Animated Grid */}
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
                Our Story
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-6 leading-[1.1]">
              Crafting{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Digital Excellence
              </span>
              <br />
              Since 2016
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
            >
              Triple Vision Agency was born from a passion for creating meaningful 
              visual experiences that connect brands with their audiences.
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

      {/* Story Section - Enhanced */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
                Our{' '}
                <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  What started as a small team of passionate creatives has grown into 
                  a <span className="text-primary font-semibold">full-service agency</span> serving clients across the globe. Our journey 
                  has been defined by innovation, creativity, and an unwavering 
                  commitment to excellence.
                </p>
                <p>
                  We've had the privilege of working with startups, Fortune 500 
                  companies, and everything in between. Each project has taught us 
                  something new and pushed us to <span className="text-orange-500 font-semibold">evolve our craft</span>.
                </p>
                <p>
                  Today, Triple Vision stands as a testament to what's possible when 
                  creativity meets strategy. We continue to push boundaries and 
                  redefine what's possible in <span className="text-pink-500 font-semibold">digital media and branding</span>.
                </p>
              </div>

              {/* Stats Row */}
              <div className="mt-8 flex flex-wrap gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-500 p-0.5">
                      <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-black text-foreground">{stat.number}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Image Glow */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 to-orange-500/30 blur-2xl"
              />

              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/20">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team at work"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.1, rotate: 3 }}
                className="absolute -bottom-8 -left-8 bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-6 shadow-2xl shadow-primary/50 border border-primary/30"
              >
                <p className="text-4xl font-black text-white">2016</p>
                <p className="text-white/90 text-sm font-semibold">Founded</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Enhanced */}
      <section className="section-padding bg-gradient-to-br from-background-secondary via-background to-background-secondary relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              {/* Card Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 to-orange-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
              />

              <div className="relative p-10 rounded-2xl border-2 border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-500 p-0.5 mb-6 shadow-xl"
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                  Our Vision
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  To be the leading creative agency that transforms how brands connect 
                  with their audiences through innovative, cinematic, and impactful 
                  digital experiences.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative"
            >
              {/* Card Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-500/30 to-pink-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
              />

              <div className="relative p-10 rounded-2xl border-2 border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 p-0.5 mb-6 shadow-xl"
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <Target className="w-8 h-8 text-orange-500" />
                  </div>
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                  Our Mission
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  To deliver exceptional creative solutions that exceed expectations, 
                  drive results, and help our clients achieve their vision through 
                  strategic storytelling and design excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values - Enhanced */}
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
                Our Values
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
              What{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Drives Us
              </span>
            </h2>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="mt-6 h-1.5 w-32 mx-auto bg-gradient-to-r from-primary via-orange-500 to-pink-500 rounded-full shadow-lg shadow-primary/50"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: 'spring'
                }}
                className="group relative"
              >
                {/* Card Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${value.color} blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
                />

                <div className="relative text-center p-8 rounded-2xl border-2 border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ duration: 0.3, type: 'spring' }}
                    className="relative mb-6 inline-block"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} p-0.5 shadow-xl`}>
                      <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                        <value.icon className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </motion.div>

                  <h3 className="text-xl md:text-2xl font-black text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced */}
      <section className="section-padding bg-gradient-to-br from-background-secondary via-background to-background-secondary relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
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
              <Users className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Team
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
              The{' '}
              <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Creative Minds
              </span>
            </h2>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="mt-6 h-1.5 w-32 mx-auto bg-gradient-to-r from-primary via-orange-500 to-pink-500 rounded-full shadow-lg shadow-primary/50"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: 'spring'
                }}
                className="group"
              >
                {/* Image Container */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Image Glow */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-orange-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-border/50 group-hover:border-primary/50 transition-all duration-300 shadow-xl mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  </div>
                </motion.div>

                <h3 className="text-lg md:text-xl font-black text-foreground group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary text-sm md:text-base font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Enhanced */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[140px] animate-pulse" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Glow Behind Card */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary via-orange-500 to-pink-500 blur-3xl opacity-30"
            />

            <div className="relative p-12 md:p-16 rounded-3xl border-2 border-primary/20 bg-background/90 backdrop-blur-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
                Ready to{' '}
                <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Work with Us?
                </span>
              </h2>
              
              <p className="text-muted-foreground text-lg md:text-xl mb-10">
                Let's create something extraordinary together.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={() => openContact()} 
                  className="group relative overflow-hidden"
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                  <span className="relative flex items-center gap-3">
                    Start Your Project
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
};

export default About;