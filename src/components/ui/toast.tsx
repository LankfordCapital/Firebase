import * as React from 'react';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: React.ReactNode;
  variant?: ToastVariant;
  icon?: React.ReactNode;
  onClose?: () => void;
  duration?: number; // optional auto-dismiss in ms
}

// Tailwind-based variant styles
const variantStyles: Record<ToastVariant, string> = {
  success: 'border-green-500 bg-green-50 text-green-900',
  error: 'border-red-500 bg-red-50 text-red-900',
  info: 'border-blue-500 bg-blue-50 text-blue-900',
  warning: 'border-yellow-500 bg-yellow-50 text-yellow-900',
};

// Default SVG icons
const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01M4.93 19h14.14c1.05 0 1.65-1.14 1.11-2.05l-7.07-12.13c-.52-.89-1.7-.89-2.22 0L3.82 16.95C3.28 17.86 3.88 19 4.93 19z"
      />
    </svg>
  ),
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      title,
      subtitle,
      description,
      variant = 'info',
      icon,
      onClose,
      duration,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
      if (duration && duration > 0) {
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
          onClose?.();
        }, duration);
      }

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [duration, onClose]);

    if (!visible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        className={cn(
          'relative flex w-full max-w-sm items-center gap-4 rounded-md border-l-4 p-4 shadow-md transition-all',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className="mt-0.5">{icon ?? defaultIcons[variant]}</div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-sm font-semibold">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {description && <div className="mt-1 text-sm">{description}</div>}
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={() => {
              setVisible(false);
              onClose?.();
            }}
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
