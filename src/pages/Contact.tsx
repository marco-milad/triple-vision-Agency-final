import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, Sparkles, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const services = [
  { value: 'media-production', label: 'Media Production' },
  { value: 'event-planning', label: 'Event Planning & Coverage' },
  { value: 'digital-media', label: 'Digital Media Services' },
  { value: 'graphics-branding', label: 'Graphics & Branding' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'pr-media', label: 'PR & Media Monitoring' },
  { value: 'other', label: 'Other' },
];

const contactInfo = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Cairo, Egypt',
    detail: 'Creative District, Suite 100',
    color: 'from-pink-500 to-purple-500',
    iconColor: 'text-pink-500',
    bgColor: 'bg-pink-500/10 border-pink-500/20 group-hover:bg-pink-500/20',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@triplevision.agency',
    href: 'mailto:hello@triplevision.agency',
    color: 'from-primary to-orange-500',
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10 border-primary/20 group-hover:bg-primary/20',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+20 109 832 4080',
    href: 'tel:+201098324080',
    color: 'from-orange-500 to-pink-500',
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10 border-orange-500/20 group-hover:bg-orange-500/20',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us',
    href: 'https://wa.me/201098324080',
    color: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10 border-green-500/20 group-hover:bg-green-500/20',
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.fullName.trim() || !formState.email.trim() || !formState.message.trim()) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // WhatsApp fallback since no backend
    const message = encodeURIComponent(
      `Hi! I'm ${formState.fullName}.\n\nService: ${formState.service || 'Not specified'}\n\nMessage: ${formState.message}`
    );
    window.open(`https://wa.me/201098324080?text=${message}`, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setFormState({ fullName: '', email: '', service: '', message: '' });
    }, 3000);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[100px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-6 leading-[1.1]"
          >
            Contact{' '}
            <span className="bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Us
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Let's create something powerful together. We'd love to hear about your project.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 h-1.5 w-32 mx-auto bg-gradient-to-r from-primary via-orange-500 to-pink-500 rounded-full shadow-lg shadow-primary/50"
          />
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group"
              >
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block p-6 rounded-2xl border-2 border-border/50 bg-background/60 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 h-full"
                  >
                    <ContactInfoContent info={info} />
                  </a>
                ) : (
                  <div className="p-6 rounded-2xl border-2 border-border/50 bg-background/60 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 h-full">
                    <ContactInfoContent info={info} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Form + Map Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                Send Us a{' '}
                <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  Message
                </span>
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll get back to you within{' '}
                    <span className="text-primary font-bold">24 hours</span>.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-foreground font-semibold text-sm">
                        Full Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder="Your name"
                        value={formState.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                        maxLength={100}
                        className="bg-muted/30 border-2 border-border/50 focus:border-primary transition-all h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-foreground font-semibold text-sm">
                        Email <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        value={formState.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        maxLength={255}
                        className="bg-muted/30 border-2 border-border/50 focus:border-primary transition-all h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-service" className="text-foreground font-semibold text-sm">
                      Subject / Service
                    </Label>
                    <Select value={formState.service} onValueChange={(v) => handleInputChange('service', v)}>
                      <SelectTrigger className="bg-muted/30 border-2 border-border/50 focus:border-primary h-11">
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-foreground font-semibold text-sm">
                      Message <span className="text-primary">*</span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us about your project..."
                      value={formState.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      maxLength={2000}
                      rows={5}
                      className="bg-muted/30 border-2 border-border/50 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full relative overflow-hidden"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                Find{' '}
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Us
                </span>
              </h2>
              <p className="text-muted-foreground text-sm mb-8">Visit us at our office in Cairo, Egypt.</p>

              <div className="rounded-2xl overflow-hidden border-2 border-border/50 shadow-2xl">
                <iframe
                  title="Triple Vision Agency Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6553509872404!2d31.23569761511768!3d30.04441598188344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c59f846d9b%3A0x6e1b2e0f1c8b4e0a!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                  width="100%"
                  height="400"
                  style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ContactInfoContent = ({ info }: { info: (typeof contactInfo)[number] }) => (
  <>
    <div className={`w-12 h-12 rounded-xl border ${info.bgColor} flex items-center justify-center mb-4 transition-colors`}>
      <info.icon className={`w-6 h-6 ${info.iconColor}`} />
    </div>
    <p className="text-xs text-muted-foreground/60 font-semibold uppercase tracking-wider mb-1">{info.label}</p>
    <p className="text-foreground font-bold text-sm">{info.value}</p>
    {info.detail && <p className="text-muted-foreground text-xs mt-1">{info.detail}</p>}
  </>
);

export default Contact;
