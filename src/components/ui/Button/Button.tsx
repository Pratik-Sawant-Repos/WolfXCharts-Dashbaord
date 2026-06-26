import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.btn,
        styles[`btn-${variant}`],
        styles[`btn-${size}`],
        { [styles.fullWidth]: fullWidth },
        className
      )}
      {...props}
    >
      <span className={styles.content}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </span>
      {variant === 'primary' && <div className={styles.glow} />}
    </button>
  );
}
