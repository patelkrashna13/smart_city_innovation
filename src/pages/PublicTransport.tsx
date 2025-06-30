import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Bus, Clock, MapPin, Users, Route } from 'lucide-react';

export const PublicTransport: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState('Route 1');

  const busRoutes = [
    { id: 1, name: 'Route 1', color: 'bg-blue-500', stops: 12, activeVehicles: 8 },
    { id: 2, name: 'Route 2', color: 'bg-green-500', stops: 15, activeVehicles: 6 },
    { id: 3, name: 'Route 3', color: 'bg-purple-500', stops: 10, activeVehicles: 5 },
    { id: 4, name: 'Route 4', color: 'bg-orange-500', stops: 18, activeVehicles: 10 }
  ];

  const busArrivals = [
    { route: 'Route 1', destination: 'City Center', arrival: '2 min', capacity: 85 },
    { route: 'Route 2', destination: 'Airport', arrival: '5 min', capacity: 60 },
    { route: 'Route 1', destination: 'University', arrival: '8 min', capacity: 92 },
    { route: 'Route 3', destination: 'Mall', arrival: '12 min', capacity: 45 }
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
          Public Transport Tracker
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time bus tracking and route information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Active Buses', value: '29', icon: Bus, color: 'bg-blue-500' },
          { label: 'Total Routes', value: '4', icon: Route, color: 'bg-green-500' },
          { label: 'Passengers Today', value: '2,847', icon: Users, color: 'bg-purple-500' },
          { label: 'On-Time Rate', value: '94%', icon: Clock, color: 'bg-orange-500' }
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
            Route Map
          </h3>
          <div className="h-80 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin size={48} className="text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Interactive route map</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {busRoutes.map((route) => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route.name)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedRoute === route.name
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${route.color}`} />
                  <span className="font-medium text-gray-900 dark:text-white">{route.name}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {route.stops} stops • {route.activeVehicles} buses
                </p>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Live Arrivals
          </h3>
          <div className="space-y-4">
            {busArrivals.map((arrival, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Bus className="text-blue-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {arrival.route} → {arrival.destination}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Arriving in {arrival.arrival}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {arrival.capacity}% full
                    </p>
                  </div>
                </div>
                <ProgressBar
                  value={arrival.capacity}
                  color={arrival.capacity > 80 ? 'bg-red-500' : arrival.capacity > 60 ? 'bg-yellow-500' : 'bg-green-500'}
                  size="sm"
                  animated={true}
                />
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};