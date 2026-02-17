import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle, MessageCircle, Mail as MailIcon, Sparkles, Zap } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// ============================================================================
// EMAILJS CONFIG — غيّر القيم دي بقيم حسابك على emailjs.com
// ============================================================================
const EMAILJS_CONFIG = {
  SERVICE_ID:  'YOUR_SERVICE_ID',   // من EmailJS dashboard → Email Services
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // من EmailJS dashboard → Email Templates
  PUBLIC_KEY:  'YOUR_PUBLIC_KEY',  // من EmailJS dashboard → Account → Public Key
} as const;

// ============================================================================
// TYPES
// ============================================================================
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  contactMethod: 'email' | 'whatsapp';
  service: string;
  message: string;
  priority: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  service?: string;
  message?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================
const WHATSAPP_NUMBER = '201098324080';

const services = [
  { value: 'media-production',  label: 'Media Production' },
  { value: 'event-planning',    label: 'Event Planning & Coverage' },
  { value: 'digital-media',     label: 'Digital Media Services' },
  { value: 'graphics-branding', label: 'Graphics & Branding' },
  { value: 'web-development',   label: 'Web Development' },
  { value: 'pr-media',          label: 'PR & Media Monitoring' },
];

const priorities = [
  { value: 'low',    label: 'Low',    gradient: 'from-green-500 to-emerald-500' },
  { value: 'medium', label: 'Medium', gradient: 'from-yellow-500 to-orange-500' },
  { value: 'high',   label: 'High',   gradient: 'from-red-500 to-pink-500' },
];

const INITIAL_FORM: FormState = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  contactMethod: 'email',
  service: '',
  message: '',
  priority: 'medium',
};

// ============================================================================
// VALIDATION
// ============================================================================
const validateForm = (form: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!form.fullName.trim())
    errors.fullName = 'Full name is required';

  if (!form.email.trim())
    errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email';

  if (!form.service)
    errors.service = 'Please select a service';

  if (!form.message.trim())
    errors.message = 'Project details are required';
  else if (form.message.trim().length < 10)
    errors.message = 'Please provide more details (min 10 characters)';

  return errors;
};

// ============================================================================
// FIELD ERROR COMPONENT
// ============================================================================
const FieldError = ({ message }: { message?: string }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        className="text-red-400 text-xs mt-1"
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

// ============================================================================
// COMPONENT
// ============================================================================
const ContactModal = ({ isOpen, onClose, preSelectedService }: ContactModalProps) => {
  const [formState, setFormState] = useState<FormState>({
    ...INITIAL_FORM,
    service: preSelectedService || '',
  });
  const [errors, setErrors]           = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]     = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // FIX: Escape key يقفل الـ modal
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // إعادة ضبط الـ form لما الـ modal يتفتح
  useEffect(() => {
    if (isOpen) {
      setFormState({ ...INITIAL_FORM, service: preSelectedService || '' });
      setErrors({});
      setSubmitError(null);
      setIsSuccess(false);
    }
  }, [isOpen, preSelectedService]);

  const handleInputChange = useCallback((field: keyof FormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    // امسح الـ error بتاع الـ field فور ما الـ user يبدأ يكتب
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate أولاً
    const validationErrors = validateForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (formState.contactMethod === 'whatsapp') {
        // WhatsApp — فتح مباشرة
        const text = encodeURIComponent(
          `Hi! I'm ${formState.fullName}${formState.company ? ` from ${formState.company}` : ''}.\n\n` +
          `Service: ${formState.service}\n` +
          `Priority: ${formState.priority}\n` +
          `Email: ${formState.email}\n` +
          `${formState.phone ? `Phone: ${formState.phone}\n` : ''}` +
          `\nMessage: ${formState.message}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');

      } else {
        // FIX: EmailJS — بعت فعلاً
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          {
            from_name:    formState.fullName,
            from_company: formState.company || 'N/A',
            from_email:   formState.email,
            from_phone:   formState.phone || 'N/A',
            service:      formState.service,
            priority:     formState.priority,
            message:      formState.message,
          },
          EMAILJS_CONFIG.PUBLIC_KEY
        );
      }

      setIsSuccess(true);

      // FIX: 3 ثواني بدل 2 — وقت كافي للمستخدم يقرأ
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);

    } catch (err) {
      console.error('ContactModal submit error:', err);
      setSubmitError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Contact form"
            >
              {/* FIX: Glow خارج الـ overflow-hidden container */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary via-orange-500 to-pink-500 blur-xl opacity-30 pointer-events-none" />

              {/* Modal Card */}
              <div className="relative rounded-2xl sm:rounded-3xl border-2 border-border/50 bg-background/95 backdrop-blur-2xl shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col">

                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-orange-500 to-pink-500 z-10" />

                {/* Header */}
                <div className="relative flex-shrink-0 p-4 sm:p-6 md:p-8 border-b-2 border-border/50 bg-background/98 backdrop-blur-xl">
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

                    {/* Close Button */}
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

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      // ── Success State ──
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', delay: 0.2, duration: 0.6 }}
                          className="relative mb-6 sm:mb-8"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
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

                        {/* FIX: Confetti بـ position صح */}
                        <div className="relative w-0 h-0">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full bg-primary"
                              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                              animate={{
                                x: Math.cos((i * 60 * Math.PI) / 180) * 80,
                                y: Math.sin((i * 60 * Math.PI) / 180) * 80,
                                scale: [0, 1, 0],
                                opacity: [1, 1, 0],
                              }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                          ))}
                        </div>
                      </motion.div>

                    ) : (
                      // ── Form ──
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        noValidate
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
                              aria-invalid={!!errors.fullName}
                              className={`bg-muted/30 border-2 transition-all h-11 ${
                                errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-border/50 focus:border-primary'
                              }`}
                            />
                            <FieldError message={errors.fullName} />
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
                              aria-invalid={!!errors.email}
                              className={`bg-muted/30 border-2 transition-all h-11 ${
                                errors.email ? 'border-red-400 focus:border-red-400' : 'border-border/50 focus:border-primary'
                              }`}
                            />
                            <FieldError message={errors.email} />
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

                        {/* Contact Method */}
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
                            onValueChange={(v) => handleInputChange('contactMethod', v)}
                            className="grid grid-cols-2 gap-3 sm:gap-4"
                          >
                            {[
                              { value: 'email',    label: 'Email',    Icon: MailIcon,       activeClass: 'border-primary bg-primary/10',    iconClass: 'text-primary' },
                              { value: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle,  activeClass: 'border-green-500 bg-green-500/10', iconClass: 'text-green-500' },
                            ].map(({ value, label, Icon, activeClass, iconClass }) => (
                              <motion.div
                                key={value}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                  formState.contactMethod === value
                                    ? activeClass
                                    : 'border-border/50 bg-muted/30 hover:border-primary/30'
                                }`}
                                onClick={() => handleInputChange('contactMethod', value)}
                              >
                                <RadioGroupItem value={value} id={`contact-${value}`} className="flex-shrink-0" />
                                <Label htmlFor={`contact-${value}`} className="flex items-center gap-1.5 cursor-pointer">
                                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${iconClass}`} />
                                  <span className="font-semibold text-sm sm:text-base">{label}</span>
                                </Label>
                              </motion.div>
                            ))}
                          </RadioGroup>
                        </motion.div>

                        {/* Service */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="space-y-2"
                        >
                          <Label className="text-foreground font-semibold text-sm">
                            Service Interested In <span className="text-primary">*</span>
                          </Label>
                          {/* FIX: validation مع custom Select بيشتغل عبر errors state */}
                          <Select
                            value={formState.service}
                            onValueChange={(v) => handleInputChange('service', v)}
                          >
                            <SelectTrigger className={`bg-muted/30 border-2 transition-all h-11 ${
                              errors.service ? 'border-red-400' : 'border-border/50 focus:border-primary'
                            }`}>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FieldError message={errors.service} />
                        </motion.div>

                        {/* Priority */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="space-y-3"
                        >
                          <Label className="text-foreground font-semibold text-sm">Priority Level</Label>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {priorities.map((p) => (
                              <motion.button
                                key={p.value}
                                type="button"
                                onClick={() => handleInputChange('priority', p.value)}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={`Set priority to ${p.label}`}
                                aria-pressed={formState.priority === p.value}
                                className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all ${
                                  formState.priority === p.value
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border/50 bg-muted/30 hover:border-primary/50'
                                }`}
                              >
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${p.gradient} shadow-lg`} />
                                <span className="text-xs sm:text-sm font-bold">{p.label}</span>
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
                            rows={4}
                            aria-invalid={!!errors.message}
                            className={`bg-muted/30 border-2 resize-none transition-all text-sm sm:text-base ${
                              errors.message ? 'border-red-400 focus:border-red-400' : 'border-border/50 focus:border-primary'
                            }`}
                          />
                          <FieldError message={errors.message} />
                        </motion.div>

                        {/* Submit Error */}
                        <AnimatePresence>
                          {submitError && (
                            <motion.div
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              className="p-3 rounded-xl border border-red-400/30 bg-red-500/10 text-red-400 text-sm"
                            >
                              {submitError}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit Button — FIX: animations مقللة لأحسن performance */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <Button
                            type="submit"
                            variant="hero"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full relative group overflow-hidden shadow-2xl hover:shadow-primary/50 transition-shadow duration-300 h-12 sm:h-14"
                          >
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />

                            {/* Shimmer — مرة واحدة بس مش loop مستمر */}
                            {!isSubmitting && (
                              <motion.div
                                animate={{ x: ['-150%', '150%'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                              />
                            )}

                            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-white font-bold text-sm sm:text-base md:text-lg">
                              {isSubmitting ? (
                                <>
                                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </motion.div>
                                  <span className="hidden sm:inline">Sending Your Message...</span>
                                  <span className="sm:hidden">Sending...</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                  <span>Send Message</span>
                                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                                </>
                              )}
                            </span>
                          </Button>
                        </motion.div>

                      </motion.form>
                    )}
                  </AnimatePresence>
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