import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import AboutPreview from '@/components/sections/AboutPreview';
import CEOSection from '@/components/sections/CEOSection';
import ServicesOverview from '@/components/sections/ServicesOverview';
import PortfolioPreview from '@/components/sections/PortfolioPreview';
import WhyTripleVision from '@/components/sections/WhyTripleVision';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import StatsSection from '@/components/sections/StatsSection';
import CTASection from '@/components/sections/CTASection';
import ContactModal from '@/components/modals/ContactModal';

const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <Layout>
      <HeroSection onContactClick={() => setIsContactOpen(true)} />
      <AboutPreview />
      <CEOSection />
      <ServicesOverview />
      <PortfolioPreview />
      <WhyTripleVision />
      <TestimonialsSection />
      <StatsSection />
      <CTASection onContactClick={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </Layout>
  );
};

export default Index;
