'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './InteractivePreview.module.css';

import { MotionStyle } from 'framer-motion';

const BrowserWindow = ({ className, style, zIndex }: { className: string, style?: MotionStyle, zIndex?: number }) => (
  <motion.div className={`${styles.browserWindow} ${className}`} style={{ ...style, zIndex }}>
    <div className={styles.browserHeader}>
      <div className={`${styles.dot} ${styles.red}`} />
      <div className={`${styles.dot} ${styles.yellow}`} />
      <div className={`${styles.dot} ${styles.green}`} />
    </div>
    <div className={styles.browserContent}>
      {/* We reuse the dashboard preview image for the mockups to maintain consistency */}
      <Image src="/dashboard-preview.png" alt="App Preview" fill style={{ objectFit: 'cover' }} />
    </div>
  </motion.div>
);

export function InteractivePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateYLeft = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const translateXLeft = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  const rotateYRight = useTransform(scrollYProgress, [0, 1], [-30, 0]);
  const translateXRight = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const scaleCenter = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.header}>
        <h2 className={styles.title}>Experience the Entire Workflow</h2>
      </div>

      <div className={styles.previewContainer}>
        <div className={styles.windowGroup}>
          
          <BrowserWindow 
            className={styles.leftWindow} 
            style={{ rotateY: rotateYLeft, x: translateXLeft }} 
          />
          
          <BrowserWindow 
            className={styles.centerWindow} 
            style={{ scale: scaleCenter }} 
          />
          
          <BrowserWindow 
            className={styles.rightWindow} 
            style={{ rotateY: rotateYRight, x: translateXRight }} 
          />

        </div>
      </div>
    </section>
  );
}
