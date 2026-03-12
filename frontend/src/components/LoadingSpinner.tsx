import React from 'react';
import '../index.css';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Processing...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative w-24 h-24 mb-8">
        {/* Animated Rings */}
        <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-primary border-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-secondary/10 rounded-full"></div>
        <div className="absolute inset-4 border-4 border-b-secondary border-transparent rounded-full animate-spin-slow"></div>

        {/* Core Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(5,150,105,0.8)] animate-pulse"></div>
        </div>
      </div>

      <div className="text-center max-w-sm">
        <h3 className="text-xl font-bold text-surface-900 font-outfit mb-2 animate-pulse">{message}</h3>
        <p className="text-surface-500 text-sm leading-relaxed">
          Our AI is analyzing keywords, patterns, and matching criteria to generate your intelligence profile.
        </p>
      </div>
    </div>

  );
};

export default LoadingSpinner;
