import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, type = 'text', className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    
    // Check if input has value to keep label floating
    const hasValue = props.value !== undefined && props.value !== '' || props.defaultValue !== undefined && props.defaultValue !== '';

    return (
      <div className={clsx(styles.wrapper, className)}>
        <div 
          className={clsx(
            styles.inputContainer,
            isFocused && styles.focused,
            error && styles.errorState,
            icon && styles.hasIcon
          )}
        >
          {icon && <div className={styles.iconContainer}>{icon}</div>}
          
          <div className={styles.fieldContainer}>
            <input
              ref={ref}
              type={inputType}
              className={styles.input}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              {...props}
              placeholder=" " /* Required for CSS floating label sibling selector */
            />
            <label className={clsx(styles.label, { [styles.labelFloating]: hasValue || isFocused })}>
              {label}
            </label>
          </div>

          {isPassword && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
