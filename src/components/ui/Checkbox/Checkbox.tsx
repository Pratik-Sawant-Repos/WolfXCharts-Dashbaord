import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className={clsx(styles.wrapper, className)}>
        <div className={styles.inputWrapper}>
          <input
            type="checkbox"
            className={styles.input}
            ref={ref}
            {...props}
          />
          <div className={styles.customBox}>
            <Check size={14} className={styles.checkIcon} strokeWidth={3} />
          </div>
        </div>
        <span className={styles.label}>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
