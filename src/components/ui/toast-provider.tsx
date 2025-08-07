import * as React from 'react';

const ToastProvider = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed top-4 right-4 z-50 space-y-4">{children}</div>
);

export default ToastProvider;
