import React from 'react';
import { Navigation } from '@/components/landing/Navigation';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { ShowcaseSection } from '@/components/landing/ShowcaseSection';
import { StatisticsSection } from '@/components/landing/StatisticsSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <Navigation />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <StatisticsSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
