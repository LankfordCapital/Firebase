import * as React from 'react';

const ToastClose = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className="ml-2 text-sm text-gray-500 hover:text-black">
    ✕
  </button>
);

export default ToastClose;
