import React from 'react';
import Link from 'next/link';

import styles from './Footer.module.css';

const Twitter = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const Github = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}></span>
              <span className={styles.logoText}>WolfXCharts</span>
            </Link>
            <p className={styles.tagline}>
              Professional trading journal and analytics platform.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className={styles.socialLink} aria-label="GitHub"><Github size={20} /></a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>Product</h4>
            <Link href="#features" className={styles.link}>Features</Link>
            <Link href="#pricing" className={styles.link}>Pricing</Link>
            <Link href="/changelog" className={styles.link}>Changelog</Link>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>Resources</h4>
            <Link href="/docs" className={styles.link}>Documentation</Link>
            <Link href="/blog" className={styles.link}>Blog</Link>
            <Link href="/guides" className={styles.link}>Trading Guides</Link>
          </div>

          <div className={styles.linksGroup}>
            <h4 className={styles.linksTitle}>Support</h4>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/faq" className={styles.link}>FAQ</Link>
            <Link href="/terms" className={styles.link}>Terms of Service</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} WolfXCharts Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
