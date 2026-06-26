'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Activity, DollarSign, BrainCircuit, BarChart3, TrendingUp, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';
import styles from './HeroSection.module.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  duration: number;
  delayY: number;
  delayX: number;
}

export function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -50]);
  
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Generate particles client-side only
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 10 + 10,
      delayY: Math.random() * -200,
      delayX: Math.random() * 100 - 50
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Particles effect for background depth */}
      {particles.length > 0 && (
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

      <div className={styles.container}>
        
        {/* Left Content */}
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.topBadge}>
            <span>🚀</span> AI-Powered Trading Journal & Analytics Platform
          </div>

          <h1 className={styles.title}>
            Trade Smarter. Analyze Every Move. <br />
            <span className={styles.titleGradient}>Grow with Confidence.</span>
          </h1>
          
          <p className={styles.subtitle}>
            WolfXCharts Pro helps traders record every trade, measure performance, manage risk, and improve consistency with institutional-grade analytics, interactive dashboards, and AI-powered insights. Built for traders who rely on data, not emotions.
          </p>
          
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>
              Start Free
              <ArrowRight size={18} className={styles.btnIcon} />
            </button>
            <button className={styles.secondaryBtn}>
              View Live Dashboard
            </button>
          </div>

          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <BrainCircuit size={16} className={styles.trustIcon} />
              AI Performance Analysis
            </div>
            <div className={styles.trustItem}>
              <BarChart3 size={16} className={styles.trustIcon} />
              Unlimited Trade Journal
            </div>
            <div className={styles.trustItem}>
              <TrendingUp size={16} className={styles.trustIcon} />
              Portfolio Analytics
            </div>
            <div className={styles.trustItem}>
              <Globe size={16} className={styles.trustIcon} />
              Indian Market Ready
            </div>
            <div className={styles.trustItem}>
              <Lock size={16} className={styles.trustIcon} />
              Secure Cloud Storage
            </div>
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
            {/* Main Candlestick Chart Card */}
            <motion.div 
              className={`${styles.glassCard} ${styles.cardMain}`}
              animate={{ y: ['-50%', '-52%', '-50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>NIFTY 50</div>
                  <div className={styles.cardValue}>24,150.80</div>
                </div>
                <div className={`${styles.cardChange} ${styles.positive}`}>+1.24%</div>
              </div>
              <div className={styles.chartPlaceholder} />
            </motion.div>

            {/* Today's P&L */}
            <motion.div 
              className={`${styles.glassCard} ${styles.cardPnL}`}
              style={{ y: y2 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Today&apos;s P&amp;L</div>
                <DollarSign size={16} className={styles.cardIcon} />
              </div>
              <div className={styles.cardValue}>₹12,450</div>
              <div className={`${styles.cardChange} ${styles.positive}`}>+3.4% from avg</div>
            </motion.div>

            {/* Win Rate */}
            <motion.div 
              className={`${styles.glassCard} ${styles.cardWinRate}`}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Win Rate</div>
                <Activity size={16} className={styles.cardIcon} />
              </div>
              <div className={styles.cardValue}>72.4%</div>
              <div className={`${styles.cardChange} ${styles.positive}`}>Improving</div>
            </motion.div>

            {/* AI Insight */}
            <motion.div 
              className={`${styles.glassCard} ${styles.cardAI}`}
              style={{ y: y3 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>AI Insight</div>
                <BrainCircuit size={16} className={styles.trustIcon} />
              </div>
              <div className={styles.aiInsightText}>
                You perform best during <span className={styles.aiHighlight}>10:00 - 11:30 AM</span>. Consider sizing up trades in this window to maximize your edge.
              </div>
            </motion.div>

            {/* Recent Trades */}
            <motion.div 
              className={`${styles.glassCard} ${styles.cardRecent}`}
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Recent Trades</div>
              </div>
              <div className={styles.tradeRow}>
                <div>
                  <div className={styles.tradeSymbol}>RELIANCE CE</div>
                  <div className={styles.tradeTime}>10:45 AM</div>
                </div>
                <div className={`${styles.tradeProfit} ${styles.positive}`}>+₹4,200</div>
              </div>
              <div className={styles.tradeRow}>
                <div>
                  <div className={styles.tradeSymbol}>HDFCBANK PE</div>
                  <div className={styles.tradeTime}>11:20 AM</div>
                </div>
                <div className={`${styles.tradeProfit} ${styles.negative}`}>-₹1,150</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
