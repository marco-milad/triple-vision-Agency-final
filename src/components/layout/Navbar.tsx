import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, Youtube, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
] as const;

// Social Media Links
const socialLinks = [
  { 
    name: 'Facebook', 
    icon: Facebook, 
    url: 'https://facebook.com/triplevision',
    color: 'hover:text-[#1877F2]',
    bgColor: 'hover:bg-[#1877F2]',
    label: 'Visit our Facebook page'
  },
  { 
    name: 'Twitter', 
    icon: Twitter, 
    url: 'https://twitter.com/triplevision',
    color: 'hover:text-[#1DA1F2]',
    bgColor: 'hover:bg-[#1DA1F2]',
    label: 'Visit our Twitter profile'
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    url: 'https://instagram.com/triplevision',
    color: 'hover:text-[#E4405F]',
    bgColor: 'hover:bg-[#E4405F]',
    label: 'Visit our Instagram page'
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    url: 'https://linkedin.com/company/triplevision',
    color: 'hover:text-[#0A66C2]',
    bgColor: 'hover:bg-[#0A66C2]',
    label: 'Visit our LinkedIn company page'
  },
  { 
    name: 'Youtube', 
    icon: Youtube, 
    url: 'https://youtube.com/@triplevision',
    color: 'hover:text-[#FF0000]',
    bgColor: 'hover:bg-[#FF0000]',
    label: 'Visit our YouTube channel'
  },
] as const;

interface NavbarProps {
  onContactClick: () => void;
}

const Navbar = ({ onContactClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSocialBar, setShowSocialBar] = useState(false);
  const location = useLocation();

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    setIsScrolled(scrolled);
    setShowSocialBar(window.scrollY > 300);
  }, []);

  // Handle scroll event
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // ARIA attributes
  const menuButtonLabel = isMobileMenuOpen 
    ? 'Close navigation menu' 
    : 'Open navigation menu';
  const menuExpanded = isMobileMenuOpen;

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-2xl border-b border-border/50 shadow-xl shadow-primary/5'
            : 'bg-transparent'
        }`}
      >
        {/* Decorative Top Border */}
        {isScrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        )}

        <div className={`container mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}>
          {/* Logo */}
          <Link 
            to="/" 
            className="relative z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md group"
            aria-label="Triple Vision - Home"
          >
            <div className="relative">
              {/* Logo Glow */}
              <motion.div
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-xl bg-primary/30 blur-xl opacity-0 group-hover:opacity-50"
              />
              <motion.img
                src={logo}
                alt="Triple Vision Logo"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = document.createElement('span');
                  fallback.textContent = 'Triple Vision';
                  fallback.className = 'text-xl font-bold text-primary';
                  target.parentElement?.appendChild(fallback);
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="h-10 w-auto relative z-10"
                loading="eager"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`relative text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-3 py-2 group ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <>
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-orange-500 to-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-orange-500 to-primary rounded-full blur-sm"
                      />
                    </>
                  )}
                  {/* Hover Effect */}
                  {location.pathname !== link.path && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <Button 
                variant="hero" 
                size="default" 
                onClick={onContactClick}
                className="relative group overflow-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {/* Button Shimmer */}
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
                <span className="relative flex items-center gap-2">
                  Get Started
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <motion.button
            type="button"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative z-10 w-12 h-12 rounded-xl border-2 border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300"
            aria-label={menuButtonLabel}
            aria-expanded={menuExpanded}
            aria-haspopup="true"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Floating Social Bar - Desktop Only - Enhanced */}
      <AnimatePresence>
        {showSocialBar && (
          <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40"
            aria-label="Social media links"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-orange-500/20 blur-xl" />
              
              {/* Main Container */}
              <div className="relative bg-background/90 backdrop-blur-2xl border-2 border-border/50 rounded-full p-4 shadow-2xl">
                <nav className="flex flex-col gap-3" aria-label="Social media navigation">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, type: 'spring' }}
                      whileHover={{ scale: 1.2, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative w-11 h-11 rounded-xl border-2 border-border/50 bg-background/50 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:text-white hover:border-transparent ${social.bgColor} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group`}
                      aria-label={social.label}
                    >
                      {/* Icon Glow on Hover */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 bg-current" />
                      <social.icon className="w-5 h-5 relative z-10" />
                    </motion.a>
                  ))}
                </nav>
                
                {/* Decorative Line */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mt-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                />
                
                {/* Label */}
                <p className="mt-3 text-xs text-center text-muted-foreground font-semibold">
                  Follow
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Menu - Enhanced */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl md:hidden overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsMobileMenuOpen(false);
              }
            }}
          >
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px] animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[120px]" />
            </div>

            {/* Animated Grid */}
            <motion.div
              animate={{
                backgroundPosition: ['0px 0px', '40px 40px'],
              }}
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
                backgroundSize: '40px 40px'
              }}
            />

            <motion.div 
              className="relative flex flex-col items-center justify-center h-full gap-10 px-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-6" aria-label="Main navigation">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.8 }}
                    transition={{ 
                      delay: index * 0.08,
                      type: 'spring',
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`relative text-3xl font-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-6 py-3 group ${
                        location.pathname === link.path
                          ? 'text-primary'
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      {link.name}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="activeMobileTab"
                          className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-orange-500 to-pink-500 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Get Started Button */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ 
                  delay: navLinks.length * 0.08,
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }}
              >
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={onContactClick}
                  className="relative group overflow-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-2xl shadow-primary/30"
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 0.5,
                    }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                  <span className="relative flex items-center gap-2">
                    Get Started
                    <Sparkles className="w-5 h-5" />
                  </span>
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  delay: (navLinks.length + 1) * 0.08,
                  type: 'spring'
                }}
                className="mt-4"
              >
                <p className="text-xs text-muted-foreground text-center mb-4 font-semibold uppercase tracking-wider">
                  Follow Us
                </p>
                <nav className="flex gap-4" aria-label="Social media navigation">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: (navLinks.length + 1.5 + index * 0.1) * 0.08,
                        type: 'spring',
                        stiffness: 400,
                        damping: 20
                      }}
                      whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-xl border-2 border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground transition-all duration-300 hover:text-white hover:border-transparent ${social.bgColor} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;