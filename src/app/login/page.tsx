'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Check } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input/Input';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation simulation
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  const featureChips = [
    "AI Analytics",
    "Trade Journal",
    "Performance Reports",
    "Market Intelligence"
  ];

  return (
    <AuthLayout>
      <motion.div 
        className={styles.authCard}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <div className={styles.logoContainer}>
          <div className={styles.logo}>WolfXCharts Pro</div>
        </div>

        <div className={styles.header}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>Continue your trading journey with WolfXCharts Pro.</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <Input 
            label="Email Address" 
            type="email" 
            icon={<Mail size={18} />} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          
          <Input 
            label="Password" 
            type="password" 
            icon={<Lock size={18} />} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <div className={styles.formActions}>
            <Checkbox label="Remember me" />
            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot Password
            </Link>
          </div>

          <button 
            type="submit" 
            className={styles.primaryBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loader} />
            ) : (
              <>
                <span>Continue to Dashboard</span>
                <ArrowRight size={18} className={styles.btnIcon} />
              </>
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <div className={styles.socialGroup}>
          <button type="button" className={styles.socialBtn}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>

          <button type="button" className={styles.socialBtn}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.05 13.56c-.02-2.31 1.89-3.42 1.97-3.47-1.07-1.57-2.74-1.78-3.34-1.81-1.43-.14-2.8.84-3.53.84-.71 0-1.83-.82-3.02-.8-.17 0-3.34.11-5.18 2.81-2.9 4.31-1.07 9.8 1.04 12.8 1.04 1.48 2.26 3.12 3.86 3.06 1.54-.06 2.13-.99 3.99-.99 1.84 0 2.39.99 3.99 1.02 1.63.02 2.69-1.46 3.73-2.96 1.2-1.72 1.69-3.39 1.71-3.47-.04-.02-3.19-1.22-3.21-4.73zM14.92 5.56c.86-1.03 1.43-2.47 1.27-3.92-1.24.05-2.75.83-3.64 1.88-.71.82-1.39 2.3-1.19 3.72 1.39.11 2.7-.68 3.56-1.68z" fill="#FFFFFF"/>
            </svg>
            Apple
          </button>
        </div>

        <div className={styles.premiumFeatures}>
          {featureChips.map((feature, idx) => (
            <div key={idx} className={styles.featureChip}>
              <Check size={12} className={styles.featureIcon} /> {feature}
            </div>
          ))}
        </div>

        <p className={styles.footerText}>
          Don&apos;t have an account?
          <Link href="/register" className={styles.footerLink}>
            Create Account
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
