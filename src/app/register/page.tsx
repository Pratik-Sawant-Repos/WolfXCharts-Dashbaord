'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input/Input';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { PasswordStrength } from '@/components/ui/PasswordStrength/PasswordStrength';
import styles from './page.module.css';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation simulation
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.fullName) newErrors.fullName = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    if (!formData.password) newErrors.password = 'Required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <AuthLayout>
      <motion.div 
        className={styles.authCard}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Create Workspace</h2>
          <p className={styles.subtitle}>Start tracking every trade with professional analytics.</p>
        </div>

        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.grid2}>
            <Input 
              label="Full Name" 
              icon={<User size={18} />} 
              value={formData.fullName}
              onChange={handleChange('fullName')}
              error={errors.fullName}
            />
            <Input 
              label="Username" 
              icon={<User size={18} />} 
              value={formData.username}
              onChange={handleChange('username')}
              error={errors.username}
            />
          </div>

          <div className={styles.grid2}>
            <Input 
              label="Email Address" 
              type="email" 
              icon={<Mail size={18} />} 
              value={formData.email}
              onChange={handleChange('email')}
              error={errors.email}
            />
            <Input 
              label="Mobile Number" 
              type="tel" 
              icon={<Phone size={18} />} 
              value={formData.mobile}
              onChange={handleChange('mobile')}
              error={errors.mobile}
            />
          </div>
          
          <Input 
            label="Password" 
            type="password" 
            icon={<Lock size={18} />} 
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
          />
          
          {formData.password && (
            <PasswordStrength password={formData.password} />
          )}

          <Input 
            label="Confirm Password" 
            type="password" 
            icon={<Lock size={18} />} 
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={errors.confirmPassword}
          />

          <div className={styles.formActions}>
            <Checkbox 
              label={
                <>
                  I agree to the <Link href="#" className={styles.textLink}>Terms</Link> & <Link href="#" className={styles.textLink}>Privacy Policy</Link>
                </>
              } 
              checked={formData.agreeTerms}
              onChange={handleChange('agreeTerms')}
            />
            {errors.agreeTerms && <span className={styles.errorMessage}>{errors.agreeTerms}</span>}
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
                Create Account
                <ArrowRight size={18} className={styles.btnIcon} />
              </>
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <button type="button" className={styles.socialBtn}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <p className={styles.footerText}>
          Already have an account?{' '}
          <Link href="/login" className={styles.footerLink}>
            Sign In
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
