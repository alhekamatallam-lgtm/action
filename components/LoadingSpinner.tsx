
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
    const sizeClasses = {
      sm: 'h-5 w-5 border-2',
      md: 'h-8 w-8 border-4',
      lg: 'h-16 w-16 border-4',
    };
    return (
        <div
            className={`animate-spin rounded-full ${sizeClasses[size]} border-blue-500 border-t-transparent`}
        ></div>
    );
};

export default LoadingSpinner;
