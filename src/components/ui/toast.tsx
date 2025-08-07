
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

const variantStyles: Record<ToastVariant, string> = {
  success: 'border-green-500 bg-green-50 text-green-900',
  error: 'border-red-500 bg-red-50 text-red-900',
  info: 'border-blue-500 bg-blue-50 text-blue-900',
  warning: 'border-yellow-500 bg-yellow-50 text-yellow-900',
};

const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  success: <span className="text-green-600">✔️</span>,
  error: <span className="text-red-600">❌</span>,
  info: <span className="text-blue-600">ℹ️</span>,
  warning: <span className="text-yellow-600">⚠️</span>,
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
          'relative flex max-w-sm items-start gap-3 rounded-md border-l-4 p-4 shadow-md',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="text-xl">{icon ?? defaultIcons[variant]}</div>

        <div className="flex-1">
          <p className="text-sm font-semibold">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-current leading-snug">{description}</p>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-lg font-bold leading-none text-current hover:opacity-70"
            aria-label="Dismiss"
          >
            ×
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;
