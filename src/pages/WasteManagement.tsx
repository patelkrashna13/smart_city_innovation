import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Trash2, Truck, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { LeafletMap } from '../components/maps/LeafletMap';
import { RouteSelector, RouteInfo } from '../components/maps/RouteSelector';

export const WasteManagement: React.FC = () => {
  const [selectedBin, setSelectedBin] = useState<number | null>(null);
  const [route, setRoute] = useState<RouteInfo | undefined>();
  const [showTraffic, setShowTraffic] = useState(false);
  
  // Sample data for waste bins
  const wasteBins = [
    { id: 1, location: 'Central Park', fillLevel: 85, lastUpdated: '10 mins ago' },
    { id: 2, location: 'Main Street', fillLevel: 45, lastUpdated: '25 mins ago' },
    { id: 3, location: 'City Hall', fillLevel: 70, lastUpdated: '15 mins ago' },
    { id: 4, location: 'Riverside', fillLevel: 30, lastUpdated: '40 mins ago' },
    { id: 5, location: 'Shopping District', fillLevel: 90, lastUpdated: '5 mins ago' },
  ];

  // Sample data for collection schedule
  const collectionSchedule = [
    { area: 'Downtown', date: 'Today, 2:00 PM', status: 'In Progress' },
    { area: 'Residential Area', date: 'Tomorrow, 9:00 AM', status: 'Scheduled' },
    { area: 'Industrial Zone', date: 'Today, 5:00 PM', status: 'Delayed' },
    { area: 'Suburban District', date: 'Wed, 10:00 AM', status: 'Scheduled' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Scheduled':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Delayed':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleRouteSelect = (routeInfo: RouteInfo) => {
    setRoute(routeInfo);
    setShowTraffic(routeInfo.avoidTraffic);
  };
  
  const mapCenter: [number, number] = [51.505, -0.09]; // Default center, replace with your city coordinates
  
  const binMarkers = wasteBins.map(bin => ({
    position: [51.505 + (Math.random() - 0.5) * 0.02, -0.09 + (Math.random() - 0.5) * 0.02] as [number, number],
    popup: `<b>${bin.location}</b><br>Fill Level: ${bin.fillLevel}%`,
    color: bin.fillLevel > 80 ? 'red' : bin.fillLevel > 50 ? 'yellow' : 'green'
  }));
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Waste Management Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Smart bin monitoring and collection scheduling
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Smart Bin Status
          </h3>
          <div className="space-y-4">
            {wasteBins.map((bin) => (
              <motion.div
                key={bin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: bin.id * 0.1 }}
                className={`p-4 rounded-xl ${bin.fillLevel > 80 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Trash2 className={bin.fillLevel > 80 ? 'text-red-500' : 'text-blue-500'} size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{bin.location}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last Updated: {bin.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${bin.fillLevel > 80 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : bin.fillLevel > 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                    {bin.fillLevel}% Full
                  </span>
                </div>
                <div className="mt-3">
                  <ProgressBar 
                    value={bin.fillLevel} 
                    color={bin.fillLevel > 80 ? 'bg-red-500' : bin.fillLevel > 50 ? 'bg-yellow-500' : 'bg-green-500'}
                    size="md"
                  />
                </div>
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
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Truck className="text-blue-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{schedule.area}</p>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="mr-1" size={14} />
                        <span>{schedule.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                    {schedule.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Waste Collection Map
          </h3>
          <div className="h-[500px] rounded-xl overflow-hidden">
            <LeafletMap 
              center={mapCenter}
              zoom={14}
              markers={binMarkers}
              route={route}
              showTraffic={showTraffic}
              className="h-full w-full"
            />
          </div>
        </Card>
        
        <Card>
          <RouteSelector onRouteSelect={handleRouteSelect} />
        </Card>
      </div>
    </motion.div>
  );
};