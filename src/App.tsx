import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { ContactProvider } from "@/contexts/ContactContext";
import { lazy, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";

// Lazy-load all page components for route-level code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const WorkDetail = lazy(() => import("./pages/WorkDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Minimal loading fallback that matches the site's dark theme
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    {/* Respects the visitor's "reduce motion" system setting across the site. */}
    <MotionConfig reducedMotion="user">
        <ContactProvider>
          <Preloader />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/work/:slug" element={<WorkDetail />} />
                <Route path="/contact" element={<Contact />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ContactProvider>
    </MotionConfig>
  </HelmetProvider>
);

export default App;
