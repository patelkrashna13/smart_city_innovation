import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Car, Navigation, Bus, Trash2, Zap, Droplet,
  Phone, Shield, MessageSquare, TreePine, Bell,
  PieChart, Building, Bot, Menu, X
} from 'lucide-react';

const menuItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/parking', icon: Car, label: 'Smart Parking' },
  { path: '/traffic', icon: Navigation, label: 'Traffic' },
  { path: '/transport', icon: Bus, label: 'Transport' },
  { path: '/waste', icon: Trash2, label: 'Waste Management' },
  { path: '/energy', icon: Zap, label: 'Energy' },
  { path: '/water', icon: Droplet, label: 'Water Supply' },
  { path: '/emergency', icon: Phone, label: 'Emergency' },
  { path: '/crime', icon: Shield, label: 'Crime Monitor' },
  { path: '/reports', icon: MessageSquare, label: 'Citizen Reports' },
  { path: '/trees', icon: TreePine, label: 'Tree Tracker' },
  { path: '/alerts', icon: Bell, label: 'Civic Alerts' },
  { path: '/budget', icon: PieChart, label: 'Budget' },
  { path: '/business', icon: Building, label: 'Businesses' },
  { path: '/ai-assistant', icon: Bot, label: 'AI Assistant' }
];

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      <motion.div
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg"></div>
                <span className="font-bold text-lg text-gray-900 dark:text-white">Smart City</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </motion.div>
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Content goes here */}
      </div>
    </>
  );
};