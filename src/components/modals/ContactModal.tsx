import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

const ContactModal = ({ isOpen, onClose, preSelectedService }: ContactModalProps) => {
  // Escape closes the modal.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[100px]" />
            </div>
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
          </motion.div>

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Contact form"
            >
              {/* Glow outside the overflow-hidden card */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary via-orange-500 to-pink-500 blur-xl opacity-30 pointer-events-none" />

              <div className="relative rounded-2xl sm:rounded-3xl border-2 border-border/50 bg-background/95 backdrop-blur-2xl shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-orange-500 to-pink-500 z-10" />

                {/* Header */}
                <div className="relative flex-shrink-0 p-4 sm:p-6 md:p-8 border-b-2 border-border/50 bg-background/95 backdrop-blur-xl">
                  <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-2 sm:mb-4"
                      >
                        <Sparkles className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          Let's Connect
                        </span>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-1 sm:mb-2"
                      >
                        Let's Work{' '}
                        <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                          Together
                        </span>
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground text-xs sm:text-sm md:text-base"
                      >
                        Tell us about your project and we'll bring it to life
                      </motion.p>
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring' }}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      aria-label="Close contact form"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 flex items-center justify-center group flex-shrink-0"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.button>
                  </div>
                </div>

                {/* Scrollable form */}
                <div className="overflow-y-auto flex-1 custom-scrollbar p-4 sm:p-6 md:p-8">
                  <ContactForm preSelectedService={preSelectedService} />
                </div>
              </div>
            </motion.div>
          </div>

          <style>{`
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,140,0,0.3); border-radius: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,140,0,0.5); }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
