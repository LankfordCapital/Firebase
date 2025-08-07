'use client';

import { useState } from 'react';
import Toast from './toast';
import ToastClose from './toast-close';
import ToastDescription from './toast-description';
import ToastProvider from './toast-provider';
import ToastTitle from './toast-title';
import ToastViewport from './toast-viewport';

interface ToastData {
  id: number;
  title: string;
  description: string;
}

const Toaster = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = () => {
    const id = Date.now();
    setToasts(prev => [
      ...prev,
      {
        id,
        title: 'Success!',
        description: 'You have successfully triggered a toast.',
      },
    ]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const closeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <>
      <button
        onClick={showToast}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Show Toast
      </button>

      <ToastProvider>
        {toasts.map((toast) => (
          <Toast key={toast.id}>
            <div>
              <ToastTitle>{toast.title}</ToastTitle>
              <ToastDescription>{toast.description}</ToastDescription>
            </div>
            <ToastClose onClick={() => closeToast(toast.id)} />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </>
  );
};

export default Toaster;
