'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './ShowcaseSection.module.css';

const tabs = [
  'Performance Dashboard',
  'Trading Journal',
  'Analytics',
  'Portfolio Management',
  'Market Intelligence'
];

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className={styles.showcaseSection}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Built for traders who take data seriously.</h2>
        </motion.div>

        <div className={styles.content}>
          {/* Tabs */}
          <motion.div 
            className={styles.tabs}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                className={`${styles.tab} ${activeTab === idx ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab}
                {activeTab === idx && (
                  <motion.div 
                    layoutId="activeTabIndicator" 
                    className={styles.activeIndicator}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Screenshot Display */}
          <motion.div 
            className={styles.screenshotContainer}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className={styles.screenshotPlaceholder}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.browserBar}>
                  <div className={styles.dotGroup}>
                    <span className={styles.dot} style={{ background: '#ef4444' }}></span>
                    <span className={styles.dot} style={{ background: '#f59e0b' }}></span>
                    <span className={styles.dot} style={{ background: '#22c55e' }}></span>
                  </div>
                </div>
                <Image 
                  src="/images/Dashbaord.png" 
                  alt="Dashboard Preview"
                  width={1200}
                  height={800}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
