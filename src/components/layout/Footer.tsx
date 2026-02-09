import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight, Sparkles, Heart } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Media Production', path: '/services/media-production' },
      { name: 'Event Planning', path: '/services/event-planning' },
      { name: 'Digital Media', path: '/services/digital-media' },
      { name: 'Graphics & Branding', path: '/services/graphics-branding' },
      { name: 'Web Development', path: '/services/web-development' },
      { name: 'PR & Media Monitoring', path: '/services/pr-media-monitoring' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Services', path: '/services' },
      { name: 'Contact Us', path: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-[#E4405F]' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-[#1DA1F2]' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-[#0077B5]' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-[#FF0000]' },
  ];

  return (
    <footer className="bg-gradient-to-br from-background via-background-secondary to-background border-t border-border/30 relative overflow-hidden">
      {/* Background - reduced blur, no particles */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[60px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="mb-6 block group">
                <motion.div whileHover={{ scale: 1.05 }} className="relative inline-block">
                  <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img src={logo} alt="Triple Vision" className="h-12 w-auto relative z-10" loading="lazy" />
                </motion.div>
              </Link>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                A premium creative agency delivering{' '}
                <span className="text-primary font-semibold">cinematic experiences</span> through 
                media production, branding, and digital innovation.
              </p>

              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:border-transparent ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-black text-foreground mb-6 text-lg flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-orange-500 rounded-full" />
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                  >
                    <Link to={link.path} className="text-muted-foreground text-sm hover:text-primary transition-all duration-300 flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-black text-foreground mb-6 text-lg flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full" />
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                  >
                    <Link to={link.path} className="text-muted-foreground text-sm hover:text-primary transition-all duration-300 flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-black text-foreground mb-6 text-lg flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
                Contact
              </h4>
              <ul className="space-y-5">
                <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.35 }} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground/60 mb-1 font-semibold uppercase tracking-wider">Email</p>
                    <a href="mailto:hello@triplevision.agency" className="text-muted-foreground text-sm hover:text-primary transition-colors font-medium">hello@triplevision.agency</a>
                  </div>
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.4 }} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground/60 mb-1 font-semibold uppercase tracking-wider">Phone</p>
                    <a href="tel:+1234567890" className="text-muted-foreground text-sm hover:text-primary transition-colors font-medium">+1 (234) 567-890</a>
                  </div>
                </motion.li>
                <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.45 }} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/20 transition-colors">
                    <MapPin className="w-5 h-5 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground/60 mb-1 font-semibold uppercase tracking-wider">Location</p>
                    <span className="text-muted-foreground text-sm font-medium">Creative District, Suite 100<br />New York, NY 10001</span>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 mb-8 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent origin-center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>© {currentYear} Triple Vision Agency. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> and{' '}
              <Sparkles className="w-3 h-3 text-primary inline" />
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">Privacy Policy</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">Terms of Service</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">Cookie Policy</a>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7, type: 'spring' }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-orange-600 border-2 border-primary/30 shadow-2xl shadow-primary/30 flex items-center justify-center text-white z-50 hover:shadow-primary/50 transition-all duration-300"
          aria-label="Back to top"
        >
          <ArrowRight className="w-6 h-6 -rotate-90" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
