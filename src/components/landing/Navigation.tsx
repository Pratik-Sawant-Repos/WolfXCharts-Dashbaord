'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button/Button';
import styles from './Navigation.module.css';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Community', href: '#community' },
  { label: 'Documentation', href: '#' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={clsx(styles.navHeader, scrolled && styles.scrolled)}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          WolfXCharts Pro
        </Link>
        
        <nav className={styles.navLinks}>
          {LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/login" className={styles.link} style={{ marginRight: '1rem' }}>
            Login
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
