import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
] as const;

// Social Media Links - عدّل الـ URLs حسب شركتك
const socialLinks = [
  { 
    name: 'Facebook', 
    icon: Facebook, 
    url: 'https://facebook.com/triplevision',
    color: 'hover:text-[#1877F2]',
    label: 'Visit our Facebook page'
  },
  { 
    name: 'Twitter', 
    icon: Twitter, 
    url: 'https://twitter.com/triplevision',
    color: 'hover:text-[#1DA1F2]',
    label: 'Visit our Twitter profile'
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    url: 'https://instagram.com/triplevision',
    color: 'hover:text-[#E4405F]',
    label: 'Visit our Instagram page'
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    url: 'https://linkedin.com/company/triplevision',
    color: 'hover:text-[#0A66C2]',
    label: 'Visit our LinkedIn company page'
  },
  { 
    name: 'Youtube', 
    icon: Youtube, 
    url: 'https://youtube.com/@triplevision',
    color: 'hover:text-[#FF0000]',
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
    // Show social bar after scrolling a bit
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

  // ARIA values - using explicit string values
  const menuButtonLabel = isMobileMenuOpen 
    ? 'Close navigation menu' 
    : 'Open navigation menu';

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label="Triple Vision - Home"
          >
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
              className="h-10 w-auto"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Button 
              variant="hero" 
              size="default" 
              onClick={onContactClick}
              className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="md:hidden relative z-10 p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md transition-transform hover:scale-110"
            aria-label={menuButtonLabel}
            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
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
                  <X className="w-6 h-6 text-foreground" />
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
          </button>
        </div>
      </motion.nav>

      {/* Floating Social Bar - Desktop Only */}
      <AnimatePresence>
        {showSocialBar && (
          <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 z-40"
            aria-label="Social media links"
          >
            <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-full p-3 shadow-lg">
              <nav className="flex flex-col gap-4" aria-label="Social media navigation">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-muted-foreground transition-all duration-300 ${social.color} hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-2`}
                    aria-label={social.label}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
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
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden"
            onClick={(e) => {
              // Close menu if clicking the backdrop
              if (e.target === e.currentTarget) {
                setIsMobileMenuOpen(false);
              }
            }}
          >
            <motion.div 
              className="flex flex-col items-center justify-center h-full gap-8 px-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-8" aria-label="Main navigation">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ 
                      delay: index * 0.08,
                      type: 'spring',
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`text-2xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-4 py-2 ${
                        location.pathname === link.path
                          ? 'text-primary'
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Get Started Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
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
                  className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Get Started
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  delay: (navLinks.length + 1) * 0.08,
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }}
                className="flex gap-6 mt-4"
                aria-label="Social media navigation"
              >
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
                    className={`text-muted-foreground transition-all duration-300 ${social.color} hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-2`}
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </motion.nav>

              {/* Social Links Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (navLinks.length + 2) * 0.08 }}
                className="text-xs text-muted-foreground mt-2"
              >
                Follow us on social media
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;