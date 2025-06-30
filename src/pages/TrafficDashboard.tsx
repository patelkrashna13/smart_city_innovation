import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Navigation, AlertTriangle, TrendingUp, MapPin } from 'lucide-react';

export const TrafficDashboard: React.FC = () => {
  const trafficData = [
    { location: 'Main St & 1st Ave', status: 'Heavy', delay: '12 min', color: 'bg-red-500' },
    { location: 'Park Rd & Oak St', status: 'Moderate', delay: '5 min', color: 'bg-yellow-500' },
    { location: 'Highway 101 North', status: 'Light', delay: '2 min', color: 'bg-green-500' },
    { location: 'Downtown Bridge', status: 'Heavy', delay: '18 min', color: 'bg-red-500' }
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
          Live Traffic Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time traffic monitoring and congestion analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Average Speed', value: '35 mph', trend: '+5%', icon: TrendingUp },
          { label: 'Traffic Flow', value: '85%', trend: '-2%', icon: Navigation },
          { label: 'Incidents', value: '3', trend: '+1', icon: AlertTriangle },
          { label: 'Active Signals', value: '147', trend: '100%', icon: MapPin }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.trend}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Traffic Heatmap
          </h3>
          <div className="h-80 bg-gradient-to-br from-red-50 via-yellow-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Navigation size={48} className="text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Interactive traffic heatmap</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Current Traffic Conditions
          </h3>
          <div className="space-y-4">
            {trafficData.map((traffic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${traffic.color}`} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{traffic.location}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Delay: {traffic.delay}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  traffic.status === 'Heavy' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  traffic.status === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {traffic.status}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};