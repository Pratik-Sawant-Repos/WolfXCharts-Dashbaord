'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import styles from './AnalyticsShowcase.module.css';

const mockEquityData = [
  { name: 'Jan', value: 100000 },
  { name: 'Feb', value: 105000 },
  { name: 'Mar', value: 102000 },
  { name: 'Apr', value: 115000 },
  { name: 'May', value: 112000 },
  { name: 'Jun', value: 125000 },
  { name: 'Jul', value: 140000 },
  { name: 'Aug', value: 138000 },
  { name: 'Sep', value: 155000 },
  { name: 'Oct', value: 160000 },
  { name: 'Nov', value: 158000 },
  { name: 'Dec', value: 175000 },
];

export function AnalyticsShowcase() {
  return (
    <section className={styles.section} id="analytics">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Institutional-Grade Analytics</h2>
          <p className={styles.subtitle}>
            Stop guessing what works. Our advanced analytics engine breaks down your trading performance to show you exactly where your edge lies.
          </p>
        </motion.div>

        <div className={styles.grid}>
          <motion.div 
            className={styles.chartCard}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Equity Curve</h3>
            </div>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockEquityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-surface-solid)', border: '1px solid var(--border-light)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--accent-purple)' }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-strong)" vertical={false} />
                  <Area type="monotone" dataKey="value" stroke="var(--accent-purple)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            className={styles.chartCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Performance Metrics</h3>
            </div>
            <div className={styles.metricsList}>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Total Profit</span>
                <span className={styles.metricValue} style={{ color: 'var(--accent-green)' }}>+₹75,000</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Win Rate</span>
                <span className={styles.metricValue}>68.5%</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Profit Factor</span>
                <span className={styles.metricValue}>2.4</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Max Drawdown</span>
                <span className={styles.metricValue} style={{ color: 'var(--accent-red)' }}>-8.2%</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Avg. Risk/Reward</span>
                <span className={styles.metricValue}>1:2.8</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
