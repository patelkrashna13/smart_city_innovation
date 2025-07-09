import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-200 
        border border-gray-100 dark:border-gray-700 ${className}`}
    >
      {children}
    </motion.div>
  );
};