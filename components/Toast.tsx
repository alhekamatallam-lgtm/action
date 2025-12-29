
import React from 'react';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-brand-blue text-white py-3 px-6 rounded-lg shadow-xl animate-bounce">
      <p className="font-semibold">{message}</p>
    </div>
  );
};

export default Toast;
