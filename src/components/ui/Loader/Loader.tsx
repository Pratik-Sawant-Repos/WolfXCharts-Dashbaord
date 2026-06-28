'use client';

import React from 'react';
import { ScaleLoader } from 'react-spinners';
import styles from './Loader.module.css';

interface LoaderProps {
  fullScreen?: boolean;
  color?: string;
  message?: string;
}

export function Loader({ 
  fullScreen = false, 
  color = 'var(--primary-color, #2563eb)',
  message 
}: LoaderProps) {
  return (
    <div className={fullScreen ? styles.fullScreenContainer : styles.inlineContainer}>
      <ScaleLoader 
        color={color} 
        height={35} 
        width={4} 
        radius={2} 
        margin={2} 
      />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
