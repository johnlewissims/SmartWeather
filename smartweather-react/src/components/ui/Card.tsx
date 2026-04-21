import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({
  padding = 'md',
  hover = false,
  className = '',
  children,
  ...props
}: CardProps) {
  const baseClasses = 'bg-sw-surface border border-sw-border rounded-lg';

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const hoverClass = hover ? 'transition-all duration-200 hover:border-sw-accent hover:shadow-lg' : '';

  const classes = `${baseClasses} ${paddingClasses[padding]} ${hoverClass} ${className}`.trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
