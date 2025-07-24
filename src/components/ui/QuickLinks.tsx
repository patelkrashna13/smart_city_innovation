import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, DollarSign, Users, Car, Trash2 } from 'lucide-react';

const links = [
  { to: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
  { to: '/budget', icon: DollarSign, label: 'Budget Tracker' },
  { to: '/citizen-reports', icon: Users, label: 'Citizen Reports' },
  { to: '/traffic', icon: Car, label: 'Traffic' },
  { to: '/waste', icon: Trash2, label: 'Waste Management' },
];

export const QuickLinks: React.FC = () => (
  <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 shadow-md">
    <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">Quick Links</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {links.map(link => (
        <Link to={link.to} key={link.label} className="flex flex-col items-center p-3 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition">
          <link.icon size={28} className="mb-1 text-green-600 dark:text-green-300" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{link.label}</span>
        </Link>
      ))}
    </div>
  </div>
); 