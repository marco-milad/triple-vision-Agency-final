import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactModal from '@/components/modals/ContactModal';
import { useContact } from '@/contexts/ContactContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isContactOpen, preSelectedService, openContact, closeContact } = useContact();

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContactClick={openContact} />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={closeContact} preSelectedService={preSelectedService} />
    </div>
  );
};

export default Layout;
