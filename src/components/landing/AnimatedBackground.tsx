'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from './AnimatedBackground.module.css';

const TICKER_DATA = [
  { symbol: 'RELIANCE', price: '2,950.45', change: 1.2, isPositive: true },
  { symbol: 'HDFCBANK', price: '1,432.10', change: -0.5, isPositive: false },
  { symbol: 'INFY', price: '1,680.20', change: 2.1, isPositive: true },
  { symbol: 'TCS', price: '4,105.75', change: 0.8, isPositive: true },
  { symbol: 'ICICIBANK', price: '1,120.30', change: 1.5, isPositive: true },
  { symbol: 'SBIN', price: '820.60', change: -1.1, isPositive: false },
  { symbol: 'BHARTIARTL', price: '1,245.90', change: 0.4, isPositive: true },
  { symbol: 'ITC', price: '430.25', change: -0.2, isPositive: false },
];

// Duplicate data to create a seamless infinite scroll loop
const INFINITE_TICKER = [...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA];

export function AnimatedBackground() {
  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.gradientMesh} />
      <div className={styles.gridOverlay} />
      
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerContent}>
          {INFINITE_TICKER.map((item, index) => (
            <div key={index} className={styles.tickerItem}>
              <span className={styles.tickerSymbol}>{item.symbol}</span>
              <span className={styles.tickerPrice}>₹{item.price}</span>
              <span className={`${styles.tickerChange} ${item.isPositive ? styles.tickerPositive : styles.tickerNegative}`}>
                {item.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(item.change)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
