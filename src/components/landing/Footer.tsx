'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#' },
    { label: 'Analytics', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Partners', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Data Processing', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              WolfXCharts Pro
            </Link>
            <p className={styles.description}>
              The ultimate premium trading journal and analytics platform for the Indian stock market. Built for professional traders.
            </p>
            <div className={styles.newsletter}>
              <input type="email" placeholder="Subscribe to newsletter" className={styles.input} />
              <Button variant="primary" size="md">Subscribe</Button>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className={styles.column}>
              <h4 className={styles.columnTitle}>{category}</h4>
              {links.map((link) => (
                <Link key={link.label} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} WolfXCharts Inc. All rights reserved.</p>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink}><MessageCircle size={20} /></a>
            <a href="#" className={styles.socialLink}><Globe size={20} /></a>
            <a href="#" className={styles.socialLink}><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
