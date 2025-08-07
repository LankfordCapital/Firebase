'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// Toast variant types
export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

// Props for the Toast component
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  variant?: ToastVariant;
  onClose?: () => void;
  duration?: number;
  icon?: React.ReactNode;
}

// Variant color classes for Tailwind
const toastColors: Record<ToastVariant, string> = {
  success: 'border-green-500 bg-green-50 text-green-800',
  error: 'border-red-500 bg-red-50 text-red-800',
  info: 'border-blue-500 bg-blue-50 text-blue-800',
  warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
};

// Icons per toast type
const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg
      className="w-5 h-5 text-green-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg
      className="w-5 h-5 text-red-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg
      className="w-5 h-5 text-blue-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  ),
  warning: (
    <svg
      className="w-5 h-5 text-yellow-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 19h14.14c1.05 0 1.65-1.14 1.11-2.05l-7.07-12.13c-.52-.89-1.7-.89-2.22 0L3.82 16.95C3.28 17.86 3.88 19 4.93 19z" />
    </svg>
  ),
};

// Toast component
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      title,
      description,
      variant = 'info',
      onClose,
      duration = 5000,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          setVisible(false);
          onClose?.();
        }, duration);
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [duration, onClose]);

    if (!visible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex w-full max-w-sm items-start gap-4 rounded-md border-l-4 p-4 shadow-lg transition-all animate-fade-in-up',
          toastColors[variant],
          className
        )}
        {...props}
      >
        <div className="mt-0.5">
          {icon || defaultIcons[variant]}
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold leading-tight">{title}</p>
          {description && (
            <p className="text-sm leading-snug text-current">{description}</p>
          )}
        </div>

        <button
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          aria-label="Close toast"
          className="ml-2 text-lg font-bold leading-none text-current transition-opacity hover:opacity-60"
        >
          &times;
        </button>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;
