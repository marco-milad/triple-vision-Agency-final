import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

// Type declaration for gtag (inline)
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, string | number | boolean | undefined>
    ) => void;
    dataLayer?: unknown[];
  }
}

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = "404 - Page Not Found | Triple Vision Agency";
    
    // Add/Update meta robots tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      metaRobots.setAttribute('content', 'noindex, nofollow');
      document.head.appendChild(metaRobots);
    }

    // Log 404 errors for monitoring
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Optional: Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: '404 - Page Not Found',
      });
    }

    // Cleanup: Reset title and meta when component unmounts
    return () => {
      document.title = "Triple Vision Agency | Premium Creative Agency";
      const metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }
    };
  }, [location.pathname]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const numberVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background hero-gradient px-4 sm:px-6 overflow-hidden relative">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,140,0,0.08),transparent_50%)]" />
      
      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10 max-w-2xl mx-auto"
      >
        {/* 404 Number with Enhanced Animation */}
        <motion.div
          variants={numberVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-6"
        >
          <motion.h1
            className="text-[120px] sm:text-[160px] md:text-[200px] font-black text-gradient leading-none"
            style={{
              textShadow: '0 0 60px rgba(255, 140, 0, 0.3)',
            }}
          >
            404
          </motion.h1>
          
          {/* Glitch Effect Lines */}
          <motion.div
            animate={{
              opacity: [0, 1, 0],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="absolute inset-0 text-[120px] sm:text-[160px] md:text-[200px] font-black text-primary/20 leading-none"
            aria-hidden="true"
          >
            404
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-base sm:text-lg mb-8 max-w-md mx-auto px-4"
        >
          The page you're looking for doesn't exist or has been moved to a new location.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
        >
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="hero"
              size="lg"
              className="group w-full sm:w-auto"
            >
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Back to Home
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="group w-full sm:w-auto border-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </motion.div>

        {/* Additional Help Links */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Need help finding something?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              to="/services"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Search className="w-4 h-4" />
              Browse Services
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Route Info (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            variants={itemVariants}
            className="mt-8 p-4 bg-muted/50 rounded-lg text-xs text-muted-foreground font-mono"
          >
            Attempted route: <span className="text-primary">{location.pathname}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-10 right-10 w-4 h-4 border-2 border-primary/30 rounded-sm"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-10 left-10 w-6 h-6 border-2 border-orange-500/30 rounded-full"
        aria-hidden="true"
      />
    </div>
  );
};

export default NotFound;