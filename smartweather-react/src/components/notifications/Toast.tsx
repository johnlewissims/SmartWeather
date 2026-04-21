import React, { useEffect } from 'react';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({ id, message, type = 'info', duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 bg-opacity-20 border-green-500 text-green-400';
      case 'warning':
        return 'bg-yellow-500 bg-opacity-20 border-yellow-500 text-yellow-400';
      case 'error':
        return 'bg-red-500 bg-opacity-20 border-red-500 text-red-400';
      default:
        return 'bg-blue-500 bg-opacity-20 border-blue-500 text-blue-400';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      default:
        return 'ℹ';
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg animate-slide-in ${getTypeStyles()}`}
    >
      <span className="text-xl flex-shrink-0">{getIcon()}</span>
      <p className="flex-1 text-sm">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="text-xl flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
      >
        ×
      </button>
    </div>
  );
}
