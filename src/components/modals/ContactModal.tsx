import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle, MessageCircle, Mail as MailIcon, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

const services = [
  { value: 'media-production', label: 'Media Production' },
  { value: 'event-planning', label: 'Event Planning & Coverage' },
  { value: 'digital-media', label: 'Digital Media Services' },
  { value: 'graphics-branding', label: 'Graphics & Branding' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'pr-media', label: 'PR & Media Monitoring' },
];

const priorities = [
  { value: 'low', label: 'Low', color: 'bg-green-500', gradient: 'from-green-500 to-emerald-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500', gradient: 'from-yellow-500 to-orange-500' },
  { value: 'high', label: 'High', color: 'bg-red-500', gradient: 'from-red-500 to-pink-500' },
];

const ContactModal = ({ isOpen, onClose, preSelectedService }: ContactModalProps) => {
  const [formState, setFormState] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    service: preSelectedService || '',
    message: '',
    priority: 'medium',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (formState.contactMethod === 'whatsapp') {
      const message = encodeURIComponent(
        `Hi! I'm ${formState.fullName} from ${formState.company}.\n\nService: ${formState.service}\nPriority: ${formState.priority}\n\nMessage: ${formState.message}`
      );
      window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setFormState({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        contactMethod: 'email',
        service: '',
        message: '',
        priority: 'medium',
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[100px]" />
            </div>

            {/* Static Grid */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
          </motion.div>

          {/* Centered Modal - محسّن للشاشات الصغيرة */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-auto"
            >
            {/* Modal Glow */}
            <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary via-orange-500 to-pink-500 blur-xl opacity-30" />
            
            {/* Modal Content Container */}
            <div className="relative rounded-2xl sm:rounded-3xl border-2 border-border/50 bg-background/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-orange-500 to-pink-500" />

              {/* Header - محسّن للشاشات الصغيرة */}
              <div className="relative sticky top-0 z-10 p-4 sm:p-6 md:p-8 border-b-2 border-border/50 bg-background/98 backdrop-blur-xl">
                {/* Header Background Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
                
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-2 sm:mb-4"
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

                  {/* Close Button - محسّن للشاشات الصغيرة */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    aria-label="Close contact form"
                    className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 flex items-center justify-center group flex-shrink-0"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.button>
                </div>
              </div>

              {/* Content - Scrollable - محسّن للشاشات الصغيرة */}
              <div className="overflow-y-auto max-h-[calc(95vh-100px)] sm:max-h-[calc(90vh-120px)] custom-scrollbar">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    // Success State - محسّن للشاشات الصغيرة
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center"
                    >
                      {/* Success Icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', delay: 0.2, duration: 0.6 }}
                        className="relative mb-6 sm:mb-8"
                      >
                        {/* Glow */}
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute inset-0 rounded-full bg-green-500/30 blur-2xl"
                        />
                        
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
                        </div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-2 sm:mb-3"
                      >
                        Message Sent!
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-muted-foreground text-base sm:text-lg max-w-md px-4"
                      >
                        Thank you for reaching out. We'll get back to you within{' '}
                        <span className="text-primary font-bold">24 hours</span>.
                      </motion.p>

                      {/* Success Confetti */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-primary"
                          initial={{ 
                            x: 0, 
                            y: 0,
                            scale: 0,
                          }}
                          animate={{ 
                            x: Math.cos(i * 60 * Math.PI / 180) * 100,
                            y: Math.sin(i * 60 * Math.PI / 180) * 100,
                            scale: [0, 1, 0],
                            opacity: [1, 1, 0],
                          }}
                          transition={{ 
                            duration: 1,
                            delay: 0.3,
                          }}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    // Form - محسّن للشاشات الصغيرة
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6"
                    >
                      {/* Personal Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-foreground font-semibold text-sm">
                            Full Name <span className="text-primary">*</span>
                          </Label>
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            value={formState.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            required
                            className="bg-muted/30 border-2 border-border/50 focus:border-primary transition-all h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-foreground font-semibold text-sm">
                            Company
                          </Label>
                          <Input
                            id="company"
                            placeholder="Your Company"
                            value={formState.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="bg-muted/30 border-2 border-border/50 focus:border-primary transition-all h-11"
                          />
                        </div>
                      </motion.div>

                      {/* Contact Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-foreground font-semibold text-sm">
                            Email <span className="text-primary">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formState.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className="bg-muted/30 border-2 border-border/50 focus:border-primary transition-all h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-foreground font-semibold text-sm">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (234) 567-890"
                            value={formState.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="bg-muted/30 border-2 border-border/50 focus:border-primary transition-all h-11"
                          />
                        </div>
                      </motion.div>

                      {/* Preferred Contact Method - محسّن للشاشات الصغيرة */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                      >
                        <Label className="text-foreground font-semibold text-sm">
                          Preferred Contact Method
                        </Label>
                        <RadioGroup
                          value={formState.contactMethod}
                          onValueChange={(value) => handleInputChange('contactMethod', value)}
                          className="grid grid-cols-2 gap-3 sm:gap-4"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              formState.contactMethod === 'email'
                                ? 'border-primary bg-primary/10'
                                : 'border-border/50 bg-muted/30 hover:border-primary/50'
                            }`}
                          >
                            <RadioGroupItem value="email" id="contact-email" className="flex-shrink-0" />
                            <Label htmlFor="contact-email" className="flex items-center gap-1.5 sm:gap-2 cursor-pointer flex-1 min-w-0">
                              <MailIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">Email</span>
                            </Label>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              formState.contactMethod === 'whatsapp'
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-border/50 bg-muted/30 hover:border-green-500/50'
                            }`}
                          >
                            <RadioGroupItem value="whatsapp" id="contact-whatsapp" className="flex-shrink-0" />
                            <Label htmlFor="contact-whatsapp" className="flex items-center gap-1.5 sm:gap-2 cursor-pointer flex-1 min-w-0">
                              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">WhatsApp</span>
                            </Label>
                          </motion.div>
                        </RadioGroup>
                      </motion.div>

                      {/* Service Selection */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                      >
                        <Label className="text-foreground font-semibold text-sm">
                          Service Interested In <span className="text-primary">*</span>
                        </Label>
                        <Select
                          value={formState.service}
                          onValueChange={(value) => handleInputChange('service', value)}
                          required
                        >
                          <SelectTrigger className="bg-muted/30 border-2 border-border/50 focus:border-primary h-11">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.value} value={service.value}>
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      {/* Priority - محسّن للشاشات الصغيرة */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-3"
                      >
                        <Label className="text-foreground font-semibold text-sm">
                          Priority Level
                        </Label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {priorities.map((priority) => (
                            <motion.button
                              key={priority.value}
                              type="button"
                              onClick={() => handleInputChange('priority', priority.value)}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              aria-label={`Set priority to ${priority.label}`}
                              className={`relative flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all ${
                                formState.priority === priority.value
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border/50 bg-muted/30 hover:border-primary/50'
                              }`}
                            >
                              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${priority.gradient} shadow-lg`} />
                              <span className="text-xs sm:text-sm font-bold">{priority.label}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      {/* Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="message" className="text-foreground font-semibold text-sm">
                          Project Details <span className="text-primary">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project, goals, and timeline..."
                          value={formState.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          rows={4}
                          className="bg-muted/30 border-2 border-border/50 focus:border-primary resize-none transition-all text-sm sm:text-base"
                        />
                      </motion.div>

                      {/* Submit Button - محسّن للشاشات الصغيرة */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Button
                          type="submit"
                          variant="hero"
                          size="lg"
                          className="w-full relative group overflow-hidden shadow-2xl hover:shadow-primary/50 transition-all duration-300 h-12 sm:h-14"
                          disabled={isSubmitting}
                        >
                          {/* Animated Background Gradient */}
                          <motion.div
                            animate={{
                              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 via-pink-500 to-primary bg-[length:200%_100%] opacity-90 group-hover:opacity-100 transition-opacity"
                          />

                          {/* Button Shimmer Effect */}
                          {!isSubmitting && (
                            <motion.div
                              animate={{
                                x: ['-150%', '150%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: 0.5,
                              }}
                              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                            />
                          )}

                          {/* Outer Glow Effect on Hover */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute -inset-2 bg-gradient-to-r from-primary via-orange-500 to-pink-500 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"
                          />

                          <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-white font-bold text-sm sm:text-base md:text-lg">
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                </motion.div>
                                <span className="hidden sm:inline">Sending Your Message...</span>
                                <span className="sm:hidden">Sending...</span>
                              </>
                            ) : (
                              <>
                                <motion.div
                                  whileHover={{ scale: 1.3, rotate: -15, x: 3 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                </motion.div>
                                <span>Send Message</span>
                                <motion.div
                                  animate={{
                                    scale: [1, 1.3, 1],
                                    rotate: [0, 10, -10, 0],
                                    opacity: [1, 0.7, 1],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                                </motion.div>
                              </>
                            )}
                          </span>

                          {/* Pulse Ring Effect */}
                          {!isSubmitting && (
                            <motion.div
                              animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.6, 0, 0.6],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                              }}
                              className="absolute inset-0 rounded-xl border-4 border-white/60"
                            />
                          )}

                          {/* Corner Sparkles */}
                          {!isSubmitting && (
                            <>
                              <motion.div
                                animate={{
                                  opacity: [0, 1, 0],
                                  scale: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatDelay: 0.5,
                                }}
                                className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"
                              />
                              <motion.div
                                animate={{
                                  opacity: [0, 1, 0],
                                  scale: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatDelay: 0.7,
                                  delay: 0.3,
                                }}
                                className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full"
                              />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
            </motion.div>
          </div>

          {/* Custom Scrollbar Styles */}
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 140, 0, 0.3);
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 140, 0, 0.5);
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;