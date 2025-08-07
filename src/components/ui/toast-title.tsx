import * as React from 'react';

const ToastTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base font-semibold">{children}</h3>
);

export default ToastTitle;
