'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, LineChart, ShieldCheck, Cpu, LayoutTemplate, Briefcase } from 'lucide-react';
import styles from './WhySection.module.css';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Professional Trade Journal',
    desc: 'Log every detail of your trades instantly. Upload screenshots, tag setups, and review your daily performance without manual spreadsheets.',
  },
  {
    icon: LineChart,
    title: 'Advanced Analytics',
    desc: 'Visualize your equity curve, win rate, and risk-reward ratio dynamically. Let the data reveal your most profitable trading patterns.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Management Dashboard',
    desc: 'Monitor your drawdown limits, track your position sizing, and ensure you never blow up an account with proactive risk alerts.',
  },
  {
    icon: Cpu,
    title: 'AI Trade Review',
    desc: 'Our AI analyzes your trade history to identify emotional trading, over-leveraging, and specific setups where you consistently lose money.',
  },
  {
    icon: Briefcase,
    title: 'Portfolio Insights',
    desc: 'Track multiple trading accounts and strategies in one unified view. Compare the performance of different asset classes effortlessly.',
  },
  {
    icon: LayoutTemplate,
    title: 'Beautiful Reports',
    desc: 'Generate stunning, comprehensive PDF reports for your investors or personal review at the end of every week or month.',
  },
];

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function WhySection() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Everything You Need to Become a Better Trader</h2>
          <p className={styles.subtitle}>
            Replace your clunky spreadsheets and scattered notes with a unified operating system built specifically for the demands of the Indian stock market.
          </p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div key={idx} className={styles.card} variants={cardVariant}>
                <div className={styles.iconWrapper}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>{feat.title}</h3>
                  <p className={styles.cardDesc}>{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
