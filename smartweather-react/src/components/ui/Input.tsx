import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  fullWidth?: boolean;
}

export function Input({
  error,
  fullWidth = false,
  className = '',
  ...props
}: InputProps) {
  const baseClasses = 'bg-sw-surface border rounded-lg px-4 py-2 text-sw-text placeholder-sw-muted focus:outline-none focus:ring-2 focus:ring-sw-accent transition-all duration-200';

  const borderClass = error ? 'border-red-500' : 'border-sw-border';
  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${borderClass} ${widthClass} ${className}`.trim();

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <input className={classes} {...props} />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
