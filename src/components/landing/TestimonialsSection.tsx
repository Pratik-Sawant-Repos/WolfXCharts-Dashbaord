'use client';

import React from 'react';
import { Star } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    name: 'Rahul Desai',
    role: 'Full-time Options Trader',
    quote: '"WolfXCharts Pro completely changed how I review my trades. The equity curve analysis helped me identify that I was bleeding money on Fridays. I stopped trading Fridays and my win rate skyrocketed."',
    initials: 'RD'
  },
  {
    name: 'Sneha Patel',
    role: 'Prop Desk Manager',
    quote: '"We use this platform for our entire desk. The institutional-grade charts and the ability to tag and filter setups is unmatched. It feels like a Bloomberg terminal but designed for the modern trader."',
    initials: 'SP'
  },
  {
    name: 'Vikram Singh',
    role: 'Swing Trader',
    quote: '"The AI Trade Review feature is incredible. It literally pointed out my tendency to over-leverage after a losing streak. This software pays for itself within the first week of using it."',
    initials: 'VS'
  },
  {
    name: 'Amit Sharma',
    role: 'Retail Investor',
    quote: '"I used to rely on complex Excel sheets that always broke. Moving to WolfXCharts Pro was the best decision I made. The UI is gorgeous, and the performance timeline keeps me disciplined."',
    initials: 'AS'
  }
];

// Duplicate for infinite scroll
const INFINITE_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS];

export function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Trusted by Professional Traders</h2>
      </div>
      
      <div className={styles.sliderContainer}>
        <div className={styles.track}>
          {INFINITE_TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <p className={styles.quote}>{testimonial.quote}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{testimonial.initials}</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{testimonial.name}</span>
                  <span className={styles.authorRole}>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
