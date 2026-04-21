import React, { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export function Badge({
  variant = 'default',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

  const variantClasses = {
    default: 'bg-sw-surface text-sw-text border border-sw-border',
    success: 'bg-green-500 bg-opacity-20 text-green-400 border border-green-500',
    warning: 'bg-yellow-500 bg-opacity-20 text-yellow-400 border border-yellow-500',
    danger: 'bg-red-500 bg-opacity-20 text-red-400 border border-red-500',
    info: 'bg-blue-500 bg-opacity-20 text-blue-400 border border-blue-500',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
