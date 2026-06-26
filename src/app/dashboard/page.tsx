'use client';

import React from 'react';
import { DollarSign, Percent, TrendingUp, Activity } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card/Card';
import styles from './page.module.css';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const mockEquityData = [
  { name: 'Mon', value: 150000 },
  { name: 'Tue', value: 152000 },
  { name: 'Wed', value: 149000 },
  { name: 'Thu', value: 155000 },
  { name: 'Fri', value: 158000 },
];

export default function DashboardOverview() {
  return (
    <div className="animate-fade-in">
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back, Trader Pro. Here is your market summary.</p>
      </div>

      <div className={styles.metricsGrid}>
        <MetricCard 
          title="Today's P&L" 
          value="₹14,250" 
          trend={2.4} 
          trendText="vs yesterday"
          icon={DollarSign}
          iconColor="green"
        />
        <MetricCard 
          title="Win Rate" 
          value="68.5%" 
          trend={5.2} 
          trendText="vs last week"
          icon={Percent}
          iconColor="blue"
        />
        <MetricCard 
          title="Total Capital" 
          value="₹15,80,000" 
          trend={12.4} 
          trendText="this month"
          icon={TrendingUp}
          iconColor="purple"
        />
        <MetricCard 
          title="Active Streak" 
          value="4 Days" 
          trend={-1} 
          trendText="from max streak"
          icon={Activity}
          iconColor="gold"
        />
      </div>

      <div className={styles.chartsGrid}>
        <Card variant="glass" className={styles.chartCard}>
          <CardHeader>
            <CardTitle>Equity Curve</CardTitle>
          </CardHeader>
          <CardContent className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockEquityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface-solid)', border: '1px solid var(--border-light)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--accent-blue)' }}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
                <Area type="monotone" dataKey="value" stroke="var(--accent-blue)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card variant="glass" className={styles.chartCard}>
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Minimal trade list placeholder */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { symbol: 'RELIANCE', type: 'LONG', pnl: '+₹4,500', isProfit: true },
                { symbol: 'HDFCBANK', type: 'SHORT', pnl: '-₹1,200', isProfit: false },
                { symbol: 'INFY', type: 'LONG', pnl: '+₹11,000', isProfit: true },
              ].map((trade, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{trade.symbol}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{trade.type}</div>
                  </div>
                  <div style={{ fontWeight: 600, color: trade.isProfit ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {trade.pnl}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
