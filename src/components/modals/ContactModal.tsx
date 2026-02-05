import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle, MessageCircle, Mail as MailIcon } from 'lucide-react';
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
  { value: 'low', label: 'Low', color: 'bg-green-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'high', label: 'High', color: 'bg-red-500' },
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

    // Simulate submission
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-auto md:w-full md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur-sm">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Let's Work Together</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Tell us about your project
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-12 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <CheckCircle className="w-20 h-20 text-primary mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-6 space-y-6"
                >
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={formState.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                        className="bg-muted/30 border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="Your Company"
                        value={formState.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="bg-muted/30 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="bg-muted/30 border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (234) 567-890"
                        value={formState.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-muted/30 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-3">
                    <Label>Preferred Contact Method</Label>
                    <RadioGroup
                      value={formState.contactMethod}
                      onValueChange={(value) => handleInputChange('contactMethod', value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors cursor-pointer">
                        <RadioGroupItem value="email" id="contact-email" />
                        <Label htmlFor="contact-email" className="flex items-center gap-2 cursor-pointer">
                          <MailIcon className="w-4 h-4 text-primary" />
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors cursor-pointer">
                        <RadioGroupItem value="whatsapp" id="contact-whatsapp" />
                        <Label htmlFor="contact-whatsapp" className="flex items-center gap-2 cursor-pointer">
                          <MessageCircle className="w-4 h-4 text-green-500" />
                          WhatsApp
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label>Service Interested In *</Label>
                    <Select
                      value={formState.service}
                      onValueChange={(value) => handleInputChange('service', value)}
                      required
                    >
                      <SelectTrigger className="bg-muted/30 border-border">
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
                  </div>

                  {/* Priority */}
                  <div className="space-y-3">
                    <Label>Priority Level</Label>
                    <div className="flex gap-3">
                      {priorities.map((priority) => (
                        <button
                          key={priority.value}
                          type="button"
                          onClick={() => handleInputChange('priority', priority.value)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                            formState.priority === priority.value
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-muted/30 hover:border-primary/50'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${priority.color}`} />
                          <span className="text-sm font-medium">{priority.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project, goals, and timeline..."
                      value={formState.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={4}
                      className="bg-muted/30 border-border focus:border-primary resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
