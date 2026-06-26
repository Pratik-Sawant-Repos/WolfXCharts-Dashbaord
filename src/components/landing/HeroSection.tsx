'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DollarSign, Activity } from 'lucide-react';
import styles from './HeroSection.module.css';

const BADGES = [
  'AI-Powered Analytics',
  'Professional Trade Journal',
  'Portfolio Performance Tracking',
  'Advanced Risk Management',
  'Built for Indian Markets',
];

export function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        
        {/* Left Content */}
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={styles.title}>
            Trade Smarter. Track Every Decision. <br />
            <span className={styles.titleGradient}>Improve Every Trade.</span>
          </h1>
          
          <p className={styles.subtitle}>
            WolfXCharts Pro is an advanced trading journal and performance analytics platform built for serious traders. Record every trade, monitor your performance, discover patterns, manage risk, and make data-driven decisions through institutional-grade analytics.
          </p>
          
          <div className={styles.actions}>
            <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Start Free
            </Button>
            <Button variant="secondary" size="lg">
              Explore Dashboard
            </Button>
          </div>

          <div className={styles.badges}>
            {BADGES.map((badge, idx) => (
              <motion.div 
                key={badge} 
                className={styles.badgeItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              >
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>{badge}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right 3D Dashboard Preview */}
        <div className={styles.previewArea}>
          <motion.div 
            className={styles.dashboardGroup}
            initial={{ opacity: 0, rotateY: 15, rotateX: 5, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: -5, rotateX: 5, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ y: y1 }}
          >
            {/* Main Dashboard Image */}
            <motion.div 
              className={styles.mainCard}
              style={{ x: '-50%', y: '-50%' }}
              animate={{ y: ['-50%', '-52%', '-50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image 
                src="/dashboard-preview.png" 
                alt="WolfXCharts Pro Dashboard" 
                width={800} 
                height={450}
                className={styles.mainCardImage}
                priority
              />
            </motion.div>

            {/* Floating Metric 1 */}
            <motion.div 
              className={styles.floatingCard1}
              style={{ y: y2 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <MetricCard 
                title="Weekly Profit" 
                value="₹45,250" 
                trend={12.4} 
                trendText="vs last week"
                icon={DollarSign}
                iconColor="green"
              />
            </motion.div>

            {/* Floating Metric 2 */}
            <motion.div 
              className={styles.floatingCard2}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <MetricCard 
                title="Win Rate" 
                value="72.4%" 
                trend={5.1} 
                trendText="improving"
                icon={Activity}
                iconColor="purple"
              />
            </motion.div>

          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
