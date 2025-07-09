import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  trackColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'bg-blue-500',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
  trackColor = 'bg-gray-200 dark:bg-gray-700'
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {label || `${Math.round(percentage)}%`}
          </span>
          {showLabel && (
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${trackColor} rounded-full ${sizeClasses[size]}`}>
        <motion.div
          className={`${color} ${sizeClasses[size]} rounded-full transition-all duration-300`}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};