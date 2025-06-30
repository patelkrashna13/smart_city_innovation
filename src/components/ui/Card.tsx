import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glassmorphism?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  glassmorphism = false 
}) => {
  const baseClasses = glassmorphism 
    ? 'backdrop-blur-md bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20'
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';

  return (
    <motion.div
      className={`rounded-2xl shadow-lg p-6 transition-all duration-300 ${baseClasses} ${className}`}
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};