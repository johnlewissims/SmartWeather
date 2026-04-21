import React from 'react';

export interface BannerProps {
  id: string;
  message: string;
  type?: 'info' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: (id: string) => void;
}

export function Banner({ id, message, type = 'info', dismissible = true, onDismiss }: BannerProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-500 bg-opacity-10 border-yellow-500 text-yellow-400';
      case 'error':
        return 'bg-red-500 bg-opacity-10 border-red-500 text-red-400';
      default:
        return 'bg-blue-500 bg-opacity-10 border-blue-500 text-blue-400';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 border-l-4 ${getTypeStyles()}`}>
      <span className="text-xl flex-shrink-0">{getIcon()}</span>
      <p className="flex-1 text-sm">{message}</p>
      {dismissible && onDismiss && (
        <button
          onClick={() => onDismiss(id)}
          className="text-xl flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      )}
    </div>
  );
}
