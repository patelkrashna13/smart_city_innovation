import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Trash2, Truck, MapPin, Calendar, AlertTriangle } from 'lucide-react';

export const WasteManagement: React.FC = () => {
  const wasteBins = [
    { id: 1, location: 'Main Street', fillLevel: 85, type: 'General', lastCollection: '2 hours ago', status: 'warning' },
    { id: 2, location: 'Park Avenue', fillLevel: 45, type: 'Recycling', lastCollection: '1 day ago', status: 'normal' },
    { id: 3, location: 'City Center', fillLevel: 92, type: 'General', lastCollection: '3 hours ago', status: 'critical' },
    { id: 4, location: 'School District', fillLevel: 30, type: 'Organic', lastCollection: '6 hours ago', status: 'normal' }
  ];

  const collectionSchedule = [
    { area: 'Downtown', time: '08:00 AM', status: 'completed', truck: 'Truck A' },
    { area: 'Residential North', time: '10:30 AM', status: 'in-progress', truck: 'Truck B' },
    { area: 'Industrial Zone', time: '02:00 PM', status: 'pending', truck: 'Truck C' },
    { area: 'Suburban South', time: '04:30 PM', status: 'pending', truck: 'Truck D' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'normal': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Waste Management System
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          IoT-enabled waste monitoring and collection optimization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Bins', value: '1,247', icon: Trash2, color: 'bg-blue-500' },
          { label: 'Active Trucks', value: '12', icon: Truck, color: 'bg-green-500' },
          { label: 'Collections Today', value: '89', icon: Calendar, color: 'bg-purple-500' },
          { label: 'Critical Alerts', value: '3', icon: AlertTriangle, color: 'bg-red-500' }
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
                </div>
                <div className={`p-3 ${stat.color} rounded-xl`}>
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
            Smart Bin Status
          </h3>
          <div className="space-y-4">
            {wasteBins.map((bin, index) => (
              <motion.div
                key={bin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Trash2 className="text-blue-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{bin.location}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {bin.type} • Last: {bin.lastCollection}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bin.status)}`}>
                    {bin.fillLevel}%
                  </span>
                </div>
                <ProgressBar
                  value={bin.fillLevel}
                  color={bin.fillLevel > 80 ? 'bg-red-500' : bin.fillLevel > 60 ? 'bg-yellow-500' : 'bg-green-500'}
                  size="sm"
                  animated={true}
                />
              </motion.div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Collection Schedule
          </h3>
          <div className="space-y-4">
            {collectionSchedule.map((schedule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <Truck className="text-green-500" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{schedule.area}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {schedule.time} • {schedule.truck}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  schedule.status === 'completed' ? 'bg-green-100 text-green-800' :
                  schedule.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {schedule.status.replace('-', ' ')}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Waste Collection Map
        </h3>
        <div className="h-96 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-green-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Interactive waste collection map</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Real-time truck locations and bin status
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};