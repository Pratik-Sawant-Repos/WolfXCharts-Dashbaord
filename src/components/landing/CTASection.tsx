'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './CTASection.module.css';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <motion.div 
          className={styles.ctaCard}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Background Elements */}
          <div className={styles.glowBg}></div>

          <div className={styles.content}>
            <motion.h2 
              className={styles.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Your trading edge starts with better data.
            </motion.h2>

            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Track every decision. Improve every trade.
            </motion.p>

            <motion.div 
              className={styles.actions}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link href="/register" className={`btn-primary ${styles.startBtn}`}>
                Start Free <ArrowRight size={18} />
              </Link>
              <Link href="/demo" className={`btn-secondary ${styles.demoBtn}`}>
                Book Demo
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
