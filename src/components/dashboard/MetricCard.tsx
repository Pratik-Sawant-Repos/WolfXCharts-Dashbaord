import React from 'react';
import clsx from 'clsx';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../ui/Card/Card';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  trendText: string;
  icon: React.ElementType;
  iconColor?: 'blue' | 'green' | 'purple' | 'gold';
}

export function MetricCard({
  title,
  value,
  trend,
  trendText,
  icon: Icon,
  iconColor = 'blue',
}: MetricCardProps) {
  const isPositive = trend >= 0;

  return (
    <Card variant="glass" hoverable className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div className={clsx(styles.icon, styles[iconColor])}>
          <Icon size={18} />
        </div>
      </div>
      
      <div className={styles.value}>{value}</div>
      
      <div className={clsx(styles.trend, isPositive ? styles.positive : styles.negative)}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>{Math.abs(trend)}%</span>
        <span className={styles.trendText}>{trendText}</span>
      </div>
    </Card>
  );
}
