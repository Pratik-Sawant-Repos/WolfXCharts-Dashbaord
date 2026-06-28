'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LineChart, BarChart2, ShieldAlert, Target, FileText, BrainCircuit } from 'lucide-react';
import styles from './FeaturesSection.module.css';

const features = [
  {
    icon: <LineChart size={24} />,
    title: 'Track Every Trade',
    description: 'Automatically log and categorize your trades across multiple brokers with our seamless integrations.'
  },
  {
    icon: <BarChart2 size={24} />,
    title: 'Analyze Performance',
    description: 'Dive deep into your metrics. Understand your win rates, profit factors, and optimal trading setups.'
  },
  {
    icon: <ShieldAlert size={24} />,
    title: 'Manage Risk',
    description: 'Set dynamic stop-losses and monitor your drawdowns in real-time to protect your capital.'
  },
  {
    icon: <Target size={24} />,
    title: 'Build Consistency',
    description: 'Track your emotional state and adherence to your trading plan for every single execution.'
  },
  {
    icon: <FileText size={24} />,
    title: 'Generate Reports',
    description: 'Export beautiful PDF reports for your investors or for your own weekly reviews.'
  },
  {
    icon: <BrainCircuit size={24} />,
    title: 'AI Insights',
    description: 'Let our advanced AI analyze your trading patterns and suggest actionable improvements.'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export function FeaturesSection() {
  return (
    <section id="features" className={styles.featuresSection}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.title}>Everything in one place.</h2>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants} className={styles.card}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
