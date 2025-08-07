'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastType {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  icon?: React.ReactNode;
  duration?: number;
  action?: React.ReactNode;
  onClose?: () => void;
}

interface ToastContextType {
  toasts: ToastType[];
  toast: (t: Omit<ToastType, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = useCallback((toastData: Omit<ToastType, 'id'>) => {
    const id = Date.now().toString();
    const newToast: ToastType = {
      id,
      duration: toastData.duration ?? 5000,
      ...toastData,
    };

    setToasts((prev) => [newToast, ...prev].slice(0, 5)); // limit to 5 stacked

    // Auto-remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        toastData.onClose?.();
      }, newToast.duration);
    }
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
};
