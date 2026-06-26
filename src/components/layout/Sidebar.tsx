'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { LayoutDashboard, LineChart, BookOpen, Target, Settings, Zap } from 'lucide-react';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', href: '/dashboard/analytics', icon: LineChart },
  { label: 'Trade Journal', href: '/dashboard/trades', icon: BookOpen },
  { label: 'Goals', href: '/dashboard/goals', icon: Target },
  { label: 'AI Suggestions', href: '/dashboard/ai', icon: Zap },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <div className={styles.logoText}>WolfXCharts Pro</div>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={clsx(styles.navItem, isActive && styles.active)}
            >
              {isActive && <div className={styles.activeIndicator} />}
              <div className={styles.iconWrapper}>
                <Icon size={20} />
              </div>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>T</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Trader Pro</span>
            <span className={styles.userRole}>Premium Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
