'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    opacity: number;
    delayY: number;
    delayX: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const newParticles = [...Array(30)].map((_, i) => ({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth * 0.6 : 800),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
        opacity: Math.random() * 0.5 + 0.1,
        delayY: Math.random() * -300,
        delayX: Math.random() * 150 - 75,
        duration: Math.random() * 15 + 10
      }));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParticles(newParticles);
    }
  }, [mounted]);

  return (
    <div className={styles.layout}>
      {/* Left Side: Brand Experience */}
      <div className={styles.brandSide}>
        <div className={styles.backgroundWrapper}>
          <div className={styles.gridBackground} />
          {/* We can keep AnimatedBackground if it adds value, but the grid + particles cover most of the request */}
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
          <div className={styles.brandText}>
            <motion.h1 
              className={styles.tagline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The Ultimate <br/>
              <span className={styles.gradientText}>Trading Dashboard.</span>
            </motion.h1>
            
            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Keep a daily record of every setup, track your trading performance, and build professional consistency using realistic market data.
            </motion.p>

            <motion.div 
              className={styles.statsGrid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className={styles.statItem}>
                <div className={styles.statValue}>100K+</div>
                <div className={styles.statLabel}>Trades Recorded</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>₹500Cr+</div>
                <div className={styles.statLabel}>Trade Volume Analyzed</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>95%</div>
                <div className={styles.statLabel}>Performance Accuracy</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>10K+</div>
                <div className={styles.statLabel}>Community Members</div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className={styles.bottomText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Trade Smarter • Stay Disciplined • Grow Consistently
          </motion.div>

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
