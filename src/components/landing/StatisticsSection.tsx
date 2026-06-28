'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import styles from './StatisticsSection.module.css';

function Counter({ from, to, duration, suffix = '' }: { from: number; to: number; duration: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = value.toFixed(0) + suffix;
          }
        },
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

const stats = [
  { value: 100, suffix: 'K+', label: 'Trades Recorded' },
  { value: 95, suffix: '%', label: 'Performance Accuracy' },
  { value: 24, suffix: '/7', label: 'Market Tracking' },
  { value: 10, suffix: '+', label: 'Analytics Modules' }
];

export function StatisticsSection() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className={styles.statValue}>
                <Counter from={0} to={stat.value} duration={2} suffix={stat.suffix} />
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
