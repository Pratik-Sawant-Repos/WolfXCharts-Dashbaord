'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { 
  LayoutDashboard, ArrowRightLeft, LineChart, BookOpen, 
  FileText, Globe, List, Users, Calendar, Bell, Settings,
  Crown, ChevronsLeft, ChevronsRight, Target
} from 'lucide-react';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Trades', href: '/dashboard/trades', icon: ArrowRightLeft },
  { label: 'Analytics', href: '/dashboard/analytics', icon: LineChart },
  { label: 'Journal', href: '/dashboard/journal', icon: BookOpen },
  { label: 'Reports', href: '/dashboard/reports', icon: FileText },
  { label: 'Market', href: '/dashboard/market', icon: Globe },
  { label: 'Watchlist', href: '/dashboard/watchlist', icon: List },
  { label: 'Community', href: '/dashboard/community', icon: Users },
  { label: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { label: 'Alerts', href: '/dashboard/alerts', icon: Bell },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={clsx(styles.sidebar, collapsed && styles.collapsed)}>
      <div className={styles.logoArea}>
        <div className={styles.logoContainer}>
          <div className={styles.wolfIcon}>
             {/* Simple triangle/wolf representation for now */}
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', color: '#60A5FA' }}>
                <polygon points="12 2 2 22 12 17 22 22 12 2" fill="rgba(96, 165, 250, 0.2)" />
             </svg>
          </div>
          {!collapsed && (
            <>
              <span className={styles.logoText}>WOLFXCHARTS</span>
              <span className={styles.proBadge}>PRO</span>
            </>
          )}
        </div>
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
              <div className={styles.iconWrapper}>
                <Icon size={18} />
              </div>
              {!collapsed && <span className={styles.label}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        {!collapsed ? (
          <div className={styles.premiumWidget}>
            <div className={styles.premiumHeader}>
              <Crown size={16} color="#C084FC" />
              <span className={styles.premiumTitle}>Premium Plan</span>
            </div>
            <div className={styles.premiumSub}>Valid till 29 May 2025</div>
            <button className={styles.upgradeBtn}>Upgrade Now</button>
          </div>
        ) : (
          <div className={styles.premiumWidgetCollapsed}>
            <Crown size={20} color="#C084FC" />
          </div>
        )}
        
        <button 
          className={styles.collapseBtn} 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
