import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { company } from '@/data/company';

/**
 * Persistent WhatsApp entry point. WhatsApp is the agency's only live enquiry
 * channel, so it stays reachable from every page.
 *
 * Sits above the back-to-top button in the bottom-right corner.
 */
const WhatsAppButton = () => (
  <motion.a
    href={`https://wa.me/${company.contact.whatsapp}`}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: 0.8, type: 'spring' }}
    whileHover={{ scale: 1.1, y: -3 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-28 right-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-green-400/30 shadow-2xl shadow-green-500/30 flex items-center justify-center text-white z-50 hover:shadow-green-500/50 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
    aria-label="Chat with us on WhatsApp"
  >
    <MessageCircle className="w-6 h-6" />
  </motion.a>
);

export default WhatsAppButton;
