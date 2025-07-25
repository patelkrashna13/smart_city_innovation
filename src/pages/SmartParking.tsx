import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Car, MapPin, Clock, DollarSign, AlertTriangle } from 'lucide-react';
import { LeafletMap } from '../components/maps/LeafletMap';
import { RouteSelector } from '../components/maps/RouteSelector';
import { Button } from '../components/ui/Button';

export const SmartParking: React.FC = () => {
  const [route, setRoute] = useState<{
    source: string;
    destination: string;
    vehicleType: 'car' | 'bus' | 'bike' | 'walk';
    avoidTraffic: boolean;
  } | null>(null);
  const [showTraffic, setShowTraffic] = useState(false);

  const parkingLots = [
    { id: 1, name: 'Central Mall', available: 45, total: 120, price: '$2/hr', distance: '0.2 km' },
    { id: 2, name: 'City Hall', available: 23, total: 80, price: '$1.5/hr', distance: '0.5 km' },
    { id: 3, name: 'Business District', available: 67, total: 200, price: '$3/hr', distance: '1.2 km' },
    { id: 4, name: 'Hospital Complex', available: 12, total: 60, price: '$1/hr', distance: '2.1 km' }
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
          Smart Parking System
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time parking availability across the city
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Parking Map
          </h3>
          <div className="h-96 rounded-xl overflow-hidden">
            <LeafletMap 
              center={[51.505, -0.09]} 
              zoom={13} 
              markers={parkingLots.map(lot => ({
                position: [
                  51.505 + (Math.random() * 0.01 - 0.005), 
                  -0.09 + (Math.random() * 0.01 - 0.005)
                ] as [number, number],
                popup: `<b>${lot.name}</b><br/>Available: ${lot.available}/${lot.total}<br/>Price: ${lot.price}`,
              }))}
              route={route}
              showTraffic={showTraffic}
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Button 
              size="sm" 
              variant={showTraffic ? "primary" : "outline"}
              onClick={() => setShowTraffic(!showTraffic)}
              className="flex items-center gap-2"
            >
              <AlertTriangle size={16} />
              {showTraffic ? "Hide Traffic" : "Show Traffic"}
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Spaces</span>
                <span className="font-semibold text-gray-900 dark:text-white">460</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Available</span>
                <span className="font-semibold text-green-600">147</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Occupied</span>
                <span className="font-semibold text-red-600">313</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Occupancy Rate</span>
                <span className="font-semibold text-gray-900 dark:text-white">68%</span>
              </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Find Route to Parking
            </h3>
            <RouteSelector
              onRouteSelect={(routeData) => setRoute(routeData)}
              defaultSource="Current Location"
              defaultDestination="Central Mall Parking"
            />
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {parkingLots.map((lot, index) => (
          <motion.div
            key={lot.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card hover={true}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{lot.name}</h4>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <MapPin size={14} className="mr-1" />
                    {lot.distance}
                  </div>
                </div>
                <Car className="text-blue-500" size={20} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Available</span>
                  <span className="font-semibold text-green-600">
                    {lot.available}/{lot.total}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(lot.available / lot.total) * 100}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm pt-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <DollarSign size={14} />
                    <span>{lot.price}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock size={14} className="mr-1" />
                    <span>24/7</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};