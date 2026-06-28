'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            🚀 AI Powered Trading Journal
          </motion.div>

          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Trade Better.<br />
            <span className="text-gradient">Grow Smarter.</span>
          </motion.h1>

          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Professional trading journal and analytics platform built to help traders track performance, manage risk, and improve every decision.
          </motion.p>

          <motion.div 
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/register" className="btn-primary">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link href="#dashboard" className="btn-secondary">
              View Dashboard
            </Link>
          </motion.div>

          <motion.p 
            className={styles.trustText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Trusted by serious traders and investing communities.
          </motion.p>
        </motion.div>

        {/* Floating Dashboard Preview */}
        <motion.div 
          className={styles.dashboardWrapper}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className={styles.dashboardPreview}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <Image 
              src="/images/Dashbaord.png" 
              alt="WolfXCharts Dashboard" 
              width={1200} 
              height={800} 
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
