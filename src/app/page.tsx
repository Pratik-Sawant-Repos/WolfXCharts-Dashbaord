import React from 'react';
import { Navigation } from '@/components/landing/Navigation';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';
import { HeroSection } from '@/components/landing/HeroSection';
import { WhySection } from '@/components/landing/WhySection';
import { InteractivePreview } from '@/components/landing/InteractivePreview';
import { AnalyticsShowcase } from '@/components/landing/AnalyticsShowcase';
import { 
  CommunitySection, 
  PricingSection, 
  FAQSection, 
  CTASection 
} from '@/components/landing/ConversionSections';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <Navigation />
      
      <main style={{ position: 'relative', background: 'var(--bg-primary)' }}>
        <AnimatedBackground />
        <HeroSection />
        <WhySection />
        <InteractivePreview />
        <AnalyticsShowcase />
        <CommunitySection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
