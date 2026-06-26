'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, DollarSign, BrainCircuit } from 'lucide-react';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const [mounted, setMounted] = useState(false);

  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = [...Array(10)].map((_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth * 0.4 : 500),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      opacity: Math.random() * 0.5 + 0.1,
      delayY: Math.random() * -200,
      delayX: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={styles.layout}>
      {/* Left Side: Brand Experience */}
      <div className={styles.brandSide}>
        <div className={styles.backgroundWrapper}>
          <AnimatedBackground />
        </div>

        {/* Particles */}
        {mounted && particles.length > 0 && (
          <div className={styles.particles}>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className={styles.particle}
                initial={{ 
                  x: p.x, 
                  y: p.y,
                  opacity: p.opacity
                }}
                animate={{ 
                  y: [null, p.delayY],
                  x: [null, p.delayX]
                }}
                transition={{ 
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        )}

        <div className={styles.brandContent}>
          <Link href="/" className={styles.logo}>
            WolfXCharts Pro
          </Link>
          <div className={styles.brandText}>
            <h1 className={styles.tagline}>
              The Operating System <br/>
              for <span className={styles.gradientText}>Serious Traders</span>
            </h1>
            <p className={styles.description}>
              Record every trade, measure performance, manage risk, and improve consistency with institutional-grade analytics.
            </p>
          </div>

          <div className={styles.mockupContainer}>
            <motion.div 
              className={styles.dashboardMockup}
              initial={{ opacity: 0, y: 50, rotateX: 5 }}
              animate={{ opacity: 1, y: 0, rotateX: 5 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              {/* Abstract Chart UI */}
              <div className={styles.mockupHeader}>
                <div className={styles.mockupTitle}>NIFTY 50</div>
                <div className={styles.mockupValue}>24,150.80 <span className={styles.positive}>+1.24%</span></div>
              </div>
              <div className={styles.chartArea}>
                <svg viewBox="0 0 100 40" className={styles.chartLine}>
                  <polyline points="0,30 20,25 40,35 60,15 80,20 100,5" fill="none" stroke="var(--accent-blue)" strokeWidth="2" />
                </svg>
              </div>
            </motion.div>

            <motion.div 
              className={styles.floatingCard}
              style={{ top: '20%', right: '-15%' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className={styles.cardIcon}><DollarSign size={14} /></div>
              <div>
                <div className={styles.cardLabel}>Today's P&L</div>
                <div className={styles.cardStat}>₹12,450</div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.floatingCard}
              style={{ bottom: '30%', left: '-10%' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className={styles.cardIcon} style={{ color: 'var(--accent-purple)' }}><BrainCircuit size={14} /></div>
              <div>
                <div className={styles.cardLabel}>AI Edge</div>
                <div className={styles.cardStat}>10:00 AM Best Time</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Side: Authentication Form Container */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          {children}
        </div>
      </div>
    </div>
  );
}
