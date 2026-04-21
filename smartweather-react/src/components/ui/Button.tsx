import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sw-accent focus:ring-offset-2 focus:ring-offset-sw-bg disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-sw-accent text-white hover:bg-opacity-90',
    secondary: 'bg-sw-surface text-sw-text border border-sw-border hover:bg-opacity-80',
    ghost: 'text-sw-text hover:bg-sw-surface',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg-text',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
