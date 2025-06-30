import React from 'react';
import { motion } from 'framer-motion';
import { StatsCard } from '../components/dashboard/StatsCard';
import { Card } from '../components/ui/Card';
import {
  Car, Navigation, Bus, Trash2, Zap, Droplet,
  TrendingUp, TrendingDown, Activity
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const statsData = [
    {
      title: 'Available Parking',
      value: '1,234',
      change: '+12% from yesterday',
      trend: 'up' as const,
      icon: Car,
      color: 'bg-blue-500'
    },
    {
      title: 'Traffic Flow',
      value: '85%',
      change: '-5% from yesterday',
      trend: 'down' as const,
      icon: Navigation,
      color: 'bg-green-500'
    },
    {
      title: 'Active Buses',
      value: '142',
      change: '+8% from yesterday',
      trend: 'up' as const,
      icon: Bus,
      color: 'bg-purple-500'
    },
    {
      title: 'Energy Usage',
      value: '2.4 MW',
      change: 'Normal levels',
      trend: 'neutral' as const,
      icon: Zap,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          City Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time monitoring of city infrastructure and services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            City Performance Metrics
          </h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Activity size={48} className="text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Interactive charts coming soon</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Alerts
          </h3>
          <div className="space-y-3">
            {[
              { type: 'warning', message: 'High traffic on Main St', time: '5 min ago' },
              { type: 'info', message: 'Parking lot A is 90% full', time: '12 min ago' },
              { type: 'success', message: 'Waste collection completed', time: '1 hour ago' }
            ].map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                  alert.type === 'info' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                  'border-green-500 bg-green-50 dark:bg-green-900/20'
                }`}
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};