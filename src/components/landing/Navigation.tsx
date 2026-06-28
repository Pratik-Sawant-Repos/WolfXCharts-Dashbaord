'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navigation.module.css';

export function Navigation() {
  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.navContainer}>
        {/* Left: Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}></span>
          <span className={styles.logoText}>WolfXCharts</span>
        </Link>

        {/* Center: Links */}
        <div className={styles.navLinks}>
          <Link href="#features" className={styles.navLink}>Features</Link>
          <Link href="#dashboard" className={styles.navLink}>Dashboard</Link>
          <Link href="#pricing" className={styles.navLink}>Pricing</Link>
          <Link href="#community" className={styles.navLink}>Community</Link>
          <Link href="#resources" className={styles.navLink}>Resources</Link>
        </div>

        {/* Right: Actions */}
        <div className={styles.navActions}>
          <Link href="/login" className={styles.loginLink}>Login</Link>
          <Link href="/register" className={styles.ctaButton}>
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
