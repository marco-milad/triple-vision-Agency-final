import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { services as officialServices } from '@/data/services';
import { company } from '@/data/company';

/**
 * The single contact form used by both the modal and the contact page.
 *
 * Enquiries go to WhatsApp: there is no backend and no email service. The
 * WhatsApp window is opened synchronously inside the submit handler so popup
 * blockers do not swallow it, and the success state is honest about the fact
 * that the visitor still has to press send inside WhatsApp.
 */

const serviceOptions = officialServices.map((service) => ({ value: service.slug, label: service.title }));

export interface ContactFormProps {
  /** Service slug to preselect, e.g. when opened from a service page. */
  preSelectedService?: string;
  /** Called after the visitor has been handed off to WhatsApp. */
  onSubmitted?: () => void;
}

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  service?: string;
  message?: string;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

const validateForm = (form: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!form.fullName.trim()) errors.fullName = 'Full name is required';

  // Email is optional — we reply on WhatsApp — but must look valid if given.
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email';

  if (!form.service) errors.service = 'Please select a service';

  if (!form.message.trim()) errors.message = 'Project details are required';
  else if (form.message.trim().length < 10)
    errors.message = 'Please provide more details (min 10 characters)';

  return errors;
};

const buildWhatsAppUrl = (form: FormState): string => {
  const serviceLabel = serviceOptions.find((option) => option.value === form.service)?.label ?? form.service;
  const lines = [
    `Hi ${company.name}! I'm ${form.fullName}${form.company.trim() ? ` from ${form.company}` : ''}.`,
    '',
    `Service: ${serviceLabel}`,
    ...(form.email.trim() ? [`Email: ${form.email}`] : []),
    ...(form.phone.trim() ? [`Phone: ${form.phone}`] : []),
    '',
    form.message,
  ];
  return `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
};

const FieldError = ({ message }: { message?: string }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        className="text-red-400 text-xs mt-1"
        role="alert"
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

const ContactForm = ({ preSelectedService, onSubmitted }: ContactFormProps) => {
  const [formState, setFormState] = useState<FormState>({
    ...INITIAL_FORM,
    service: preSelectedService ?? '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const url = buildWhatsAppUrl(formState);
    // Opened in the same tick as the click, so the browser treats it as a
    // user gesture rather than a popup.
    const opened = window.open(url, '_blank', 'noopener,noreferrer');

    setHandoffUrl(url);
    setPopupBlocked(!opened);
    onSubmitted?.();
  };

  if (handoffUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-12 px-4"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-2">
          {popupBlocked ? 'Almost there' : 'WhatsApp opened'}
        </h3>
        <p className="text-muted-foreground max-w-md mb-6">
          {popupBlocked
            ? 'Your browser blocked the new tab. Use the button below to open WhatsApp with your message ready to send.'
            : 'Your message is ready in WhatsApp — press send there and we will get back to you.'}
        </p>
        <a href={handoffUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="hero" size="lg" className="gap-2">
            <MessageCircle className="w-5 h-5" />
            Open WhatsApp
          </Button>
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="text-foreground font-semibold text-sm">
            Full Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="contact-name"
            placeholder="Your name"
            value={formState.fullName}
            maxLength={100}
            onChange={(event) => handleInputChange('fullName', event.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'contact-name-error' : undefined}
            className={`bg-muted/30 border-2 transition-all h-11 ${
              errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-border/50 focus:border-primary'
            }`}
          />
          <span id="contact-name-error">
            <FieldError message={errors.fullName} />
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-company" className="text-foreground font-semibold text-sm">
            Company
          </Label>
          <Input
            id="contact-company"
            placeholder="Your company"
            value={formState.company}
            maxLength={100}
            onChange={(event) => handleInputChange('company', event.target.value)}
            className="bg-muted/30 border-2 border-border/50 focus:border-primary transition-all h-11"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact-email" className="text-foreground font-semibold text-sm">
            Email
          </Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            value={formState.email}
            maxLength={255}
            onChange={(event) => handleInputChange('email', event.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={`bg-muted/30 border-2 transition-all h-11 ${
              errors.email ? 'border-red-400 focus:border-red-400' : 'border-border/50 focus:border-primary'
            }`}
          />
          <span id="contact-email-error">
            <FieldError message={errors.email} />
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-phone" className="text-foreground font-semibold text-sm">
            Phone
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="01X XXXX XXXX"
            value={formState.phone}
            maxLength={30}
            onChange={(event) => handleInputChange('phone', event.target.value)}
            className="bg-muted/30 border-2 border-border/50 focus:border-primary transition-all h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-service" className="text-foreground font-semibold text-sm">
          Service Interested In <span className="text-primary">*</span>
        </Label>
        <Select value={formState.service} onValueChange={(value) => handleInputChange('service', value)}>
          <SelectTrigger
            id="contact-service"
            aria-invalid={!!errors.service}
            className={`bg-muted/30 border-2 transition-all h-11 ${
              errors.service ? 'border-red-400' : 'border-border/50 focus:border-primary'
            }`}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={errors.service} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-foreground font-semibold text-sm">
          Project Details <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your project, goals, and timeline..."
          value={formState.message}
          rows={4}
          maxLength={2000}
          onChange={(event) => handleInputChange('message', event.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`bg-muted/30 border-2 resize-none transition-all text-sm sm:text-base ${
            errors.message ? 'border-red-400 focus:border-red-400' : 'border-border/50 focus:border-primary'
          }`}
        />
        <span id="contact-message-error">
          <FieldError message={errors.message} />
        </span>
      </div>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full relative group overflow-hidden shadow-2xl hover:shadow-primary/50 transition-shadow duration-300 h-12 sm:h-14"
      >
        <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 font-bold text-sm sm:text-base md:text-lg">
          <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          <span>Send via WhatsApp</span>
        </span>
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Opens WhatsApp with your message ready to send. Prefer email?{' '}
        <a href={`mailto:${company.contact.email}`} className="text-primary hover:underline">
          {company.contact.email}
        </a>
      </p>
    </form>
  );
};

export default ContactForm;
