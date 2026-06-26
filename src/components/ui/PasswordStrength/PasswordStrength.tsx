import React from 'react';
import clsx from 'clsx';
import styles from './PasswordStrength.module.css';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: 'None' };
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    if (score === 0) return { score: 1, label: 'Weak' };
    if (score <= 2) return { score: 2, label: 'Fair' };
    if (score === 3) return { score: 3, label: 'Good' };
    return { score: 4, label: 'Strong' };
  };

  const { score, label } = calculateStrength(password);

  const getBarColor = (index: number) => {
    if (index >= score) return styles.barEmpty;
    if (score <= 2) return styles.barWeak;
    if (score === 3) return styles.barGood;
    return styles.barStrong;
  };

  if (!password) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.bars}>
        {[0, 1, 2, 3].map((index) => (
          <div 
            key={index} 
            className={clsx(styles.bar, getBarColor(index))}
          />
        ))}
      </div>
      <span className={styles.label}>
        Password strength: <strong className={getBarColor(score - 1)} style={{ background: 'transparent' }}>{label}</strong>
      </span>
    </div>
  );
}
