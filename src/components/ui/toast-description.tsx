import * as React from 'react';

const ToastDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-600 mt-1">{children}</p>
);

export default ToastDescription;
