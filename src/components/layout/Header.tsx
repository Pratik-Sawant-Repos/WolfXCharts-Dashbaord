'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, MessageSquare, SunMoon, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button/Button';
import styles from './Header.module.css';

export function Header() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    // Perform any logout logic here (clear cookies, etc.)
    router.push('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', border: '1px solid var(--border-strong)', padding: '2px 4px', borderRadius: '4px' }}>⌘K</span>
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

        <button className={`${styles.iconButton} ${styles.hideOnMobile}`}>
          <MessageSquare size={18} />
        </button>

        <button className={styles.iconButton}>
          <Bell size={18} />
          <span className={styles.badge} />
        </button>

        <div className={styles.hideOnMobile} style={{ marginLeft: '0.5rem' }}>
          <Button variant="primary" size="sm">
            New Trade
          </Button>
        </div>

        <div className={styles.profileContainer} ref={profileRef}>
          <button 
            className={styles.profileBtn} 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className={styles.avatarText}>
              TP
            </div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>Trader Pro</span>
              <span className={styles.profileRole}>Premium</span>
            </div>
            <ChevronDown size={14} className={styles.chevron} style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
          </button>

          {isProfileOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownName}>Trader Pro</span>
                <span className={styles.dropdownEmail}>trader@wolfxcharts.com</span>
              </div>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem}>
                <User size={16} /> My Profile
              </button>
              <button className={styles.dropdownItem}>
                <Settings size={16} /> Settings
              </button>
              <div className={styles.dropdownDivider} />
              <button className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
