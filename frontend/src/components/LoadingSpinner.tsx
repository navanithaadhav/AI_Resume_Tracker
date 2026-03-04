import React from 'react';
import '../index.css';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Processing...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="loading-spinner mb-4"></div>
      <p className="text-gray-600 font-semibold">{message}</p>
      <p className="text-gray-400 text-sm mt-2">This may take a moment...</p>
    </div>
  );
};

export default LoadingSpinner;
