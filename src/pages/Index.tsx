import { lazy, Suspense, useCallback } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import { useContact } from '@/contexts/ContactContext';

const AboutPreview = lazy(() => import('@/components/sections/AboutPreview'));
const CEOSection = lazy(() => import('@/components/sections/CEOSection'));
const ServicesOverview = lazy(() => import('@/components/sections/ServicesOverview'));
const PortfolioPreview = lazy(() => import('@/components/sections/PortfolioPreview'));
const WhyTripleVision = lazy(() => import('@/components/sections/WhyTripleVision'));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));
const StatsSection = lazy(() => import('@/components/sections/StatsSection'));
const CTASection = lazy(() => import('@/components/sections/CTASection'));
const PowerPartners = lazy(() => import('@/components/sections/PowerPartners'));

const SectionPlaceholder = ({ height = '600px' }: { height?: string }) => (
  <div style={{ minHeight: height }} className="bg-background" />
);

const Index = () => {
  const { openContact } = useContact();

  const handleContactClick = useCallback(() => {
    openContact();
  }, [openContact]);

  return (
    <Layout>
      <HeroSection onContactClick={handleContactClick} />
      <Suspense fallback={<SectionPlaceholder height="800px" />}>
        <AboutPreview />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height="700px" />}>
        <CEOSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height="800px" />}>
        <ServicesOverview />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height="700px" />}>
        <PortfolioPreview />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height="700px" />}>
        <WhyTripleVision />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height="800px" />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height="400px" />}>
        <PowerPartners />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height="300px" />}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height="600px" />}>
        <CTASection onContactClick={handleContactClick} />
      </Suspense>
    </Layout>
  );
};

export default Index;
