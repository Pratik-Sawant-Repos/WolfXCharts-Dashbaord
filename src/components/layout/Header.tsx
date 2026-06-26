'use client';

import React from 'react';
import { Search, Bell, MessageSquare, SunMoon } from 'lucide-react';
import { Button } from '../ui/Button/Button';
import styles from './Header.module.css';

export function Header() {
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.searchBar}>
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search commands, symbols, or trades..." 
            className={styles.searchInput}
          />
          <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', border: '1px solid var(--border-strong)', padding: '2px 4px', borderRadius: '4px' }}>⌘K</span>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.marketClock}>
          <div className={styles.clockPulse} />
          NSE Open • 14:32:05
        </div>

        <button className={styles.iconButton} onClick={toggleTheme} aria-label="Toggle Theme">
          <SunMoon size={18} />
        </button>

        <button className={styles.iconButton}>
          <MessageSquare size={18} />
        </button>

        <button className={styles.iconButton}>
          <Bell size={18} />
          <span className={styles.badge} />
        </button>

        <Button variant="primary" size="sm" style={{ marginLeft: '0.5rem' }}>
          New Trade
        </Button>
      </div>
    </header>
  );
}
