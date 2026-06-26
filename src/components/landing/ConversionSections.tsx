'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './ConversionSections.module.css';

export function CommunitySection() {
  return (
    <section className={styles.sectionAlt} id="community">
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>1.2M+</div>
            <div className={styles.statLabel}>Trades Tracked</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>15k+</div>
            <div className={styles.statLabel}>Active Traders</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>450k</div>
            <div className={styles.statLabel}>Reports Generated</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>₹2B+</div>
            <div className={styles.statLabel}>Capital Managed</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRICING_PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    features: ['Basic Trade Journal', 'Up to 100 trades/month', 'Standard Analytics', 'Web Access'],
    isPro: false,
    cta: 'Get Started'
  },
  {
    name: 'Pro',
    price: '₹999',
    period: '/month',
    features: ['Unlimited Trades', 'Advanced Analytics & Equity Curve', 'AI Trade Review', 'Custom Tags & Strategies', 'Priority Support'],
    isPro: true,
    cta: 'Start 14-Day Trial'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Multiple Portfolios', 'API Access', 'Dedicated Account Manager', 'Custom Integrations', 'White-label Reports'],
    isPro: false,
    cta: 'Contact Sales'
  }
];

export function PricingSection() {
  return (
    <section className={styles.section} id="pricing">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Simple, Transparent Pricing</h2>
          <p className={styles.subtitle}>Invest in your trading career with tools that pay for themselves.</p>
        </div>
        <div className={styles.pricingGrid}>
          {PRICING_PLANS.map((plan, idx) => (
            <div key={idx} className={`${styles.pricingCard} ${plan.isPro ? styles.pro : ''}`}>
              <div>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.planPrice}>
                  {plan.price}
                  {plan.period && <span className={styles.planPeriod}>{plan.period}</span>}
                </div>
              </div>
              <div className={styles.planFeatures}>
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className={styles.planFeature}>
                    <Check size={18} className={styles.featureIcon} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button variant={plan.isPro ? 'primary' : 'outline'} fullWidth size="lg">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Is WolfXCharts Pro suitable for beginners?", a: "While built for professionals, our intuitive design makes it easy for beginners to start tracking trades properly from day one, accelerating their learning curve." },
  { q: "Do you support all Indian brokers?", a: "We currently support direct import from Zerodha, Upstox, Groww, and Angel One. We also support manual CSV uploads for any other broker." },
  { q: "Is my trading data secure?", a: "Absolutely. We use bank-level encryption to store your trading data. We never share your data with third parties or brokers." },
  { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your Pro subscription at any time without any hidden fees or penalties." }
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className={styles.sectionAlt}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqList}>
          {FAQS.map((faq, idx) => (
            <div key={idx} className={styles.faqItem}>
              <button 
                className={styles.faqQuestion} 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                {faq.q}
                {openIdx === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.faqAnswer}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.title} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          Ready to Transform the Way You Trade?
        </h2>
        <p className={styles.subtitle} style={{ fontSize: '1.25rem', maxWidth: '600px' }}>
          Join elite traders who use data, discipline, and advanced analytics to improve every decision they make in the market.
        </p>
        <div className={styles.ctaActions}>
          <Button variant="primary" size="lg" icon={<ArrowRight size={20} />}>
            Start Free Today
          </Button>
          <Button variant="secondary" size="lg">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
