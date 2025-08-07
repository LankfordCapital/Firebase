import * as React from 'react';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  variant?: ToastVariant;
  icon?: React.ReactNode;
  onClose?: () => void;
}

// Tailwind-based variant styles
const variantStyles: Record<ToastVariant, string> = {
  success: 'border-green-500 bg-green-50 text-green-900',
  error: 'border-red-500 bg-red-50 text-red-900',
  info: 'border-blue-500 bg-blue-50 text-blue-900',
  warning: 'border-yellow-500 bg-yellow-50 text-yellow-900',
};

// Optional default icons per variant
const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg
      className="h-5 w-5 text-green-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg
      className="h-5 w-5 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg
      className="h-5 w-5 text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
    </svg>
  ),
  warning: (
    <svg
      className="h-5 w-5 text-yellow-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.658-1.14 1.106-2.054l-6.928-11.856c-.526-.9-1.684-.9-2.21 0L3.034 16.946c-.552.914.052 2.054 1.106 2.054z" />
    </svg>
  ),
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      title,
      description,
      variant = 'info',
      icon,
      onClose,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex w-full max-w-sm items-start gap-4 rounded-md border-l-4 p-4 shadow-md transition-all',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className="mt-0.5">
          {icon ?? defaultIcons[variant]}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-sm font-semibold">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-current">{description}</p>
          )}
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Dismiss"
            className="ml-2 text-lg font-bold leading-none text-current hover:opacity-60"
          >
            &times;
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;
