'use client';

import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import Toast from '@/components/ui/toast';
import ToastClose from '@/components/ui/toast-close';
import ToastDescription from '@/components/ui/toast-description';
import ToastProvider from '@/components/ui/toast-provider';
import ToastTitle from '@/components/ui/toast-title';
import ToastViewport from '@/components/ui/toast-viewport';

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map((toast) => {
        const {
          id,
          title,
          description,
          action,
          variant,
          onClose,
          icon,
          duration,
        } = toast;

        return (
          <Toast
            key={id}
            title={title}
            description={description}
            variant={variant}
            icon={icon}
            onClose={onClose}
            duration={duration}
          >
            <div className="flex flex-col gap-1 pr-2">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

export default Toaster;
