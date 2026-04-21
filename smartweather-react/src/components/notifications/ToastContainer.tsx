import React, { useState, useCallback } from 'react';
import { Toast, ToastProps } from './Toast';

export interface ToastData {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

let toastIdCounter = 0;
let addToastCallback: ((toast: ToastData) => void) | null = null;

export function showToast(message: string, type?: ToastData['type'], duration?: number) {
  if (addToastCallback) {
    const id = `toast-${++toastIdCounter}`;
    addToastCallback({ id, message, type, duration });
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: ToastData) => {
    setToasts((prev) => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Register the callback
  React.useEffect(() => {
    addToastCallback = addToast;
    return () => {
      addToastCallback = null;
    };
  }, [addToast]);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}
