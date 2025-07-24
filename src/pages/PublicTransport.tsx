import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LeafletMap } from '../components/maps/LeafletMap';
import { RouteSelector, RouteInfo } from '../components/maps/RouteSelector';
import api from '../utils/api';
import { Bus, Clock, Users, AlertTriangle } from 'lucide-react';

export const PublicTransport: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState('Route 1');
  const [busRoutes, setBusRoutes] = useState<any[]>([]);
  const [busArrivals, setBusArrivals] = useState<any[]>([]);
  const [route, setRoute] = useState<RouteInfo | undefined>();
  const [showTraffic, setShowTraffic] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data since API might not be available
        const mockRoutes = [
          { id: 1, name: 'Route 1', stops: 12, activeVehicles: 5, color: 'bg-blue-500' },
          { id: 2, name: 'Route 2', stops: 15, activeVehicles: 7, color: 'bg-green-500' },
          { id: 3, name: 'Route 3', stops: 10, activeVehicles: 4, color: 'bg-purple-500' },
          { id: 4, name: 'Route 4', stops: 8, activeVehicles: 3, color: 'bg-red-500' }
        ];
        
        const mockArrivals = [
          { route: 'Route 1', destination: 'Downtown', arrival: '2 min', capacity: 75 },
          { route: 'Route 1', destination: 'City Center', arrival: '8 min', capacity: 45 },
          { route: 'Route 1', destination: 'Market District', arrival: '15 min', capacity: 30 },
          { route: 'Route 2', destination: 'Tech Hub', arrival: '3 min', capacity: 85 },
          { route: 'Route 2', destination: 'University', arrival: '10 min', capacity: 60 },
          { route: 'Route 3', destination: 'Shopping Mall', arrival: '5 min', capacity: 70 }
        ];
        
        // Try to get data from API, fallback to mock data
        try {
          const routes = await api.getBusRoutes();
          setBusRoutes(routes.data && routes.data.length ? routes.data : mockRoutes);
        } catch (error) {
          console.error('Error fetching bus routes:', error);
          setBusRoutes(mockRoutes);
        }
        
        // Set mock arrivals
        setBusArrivals(mockArrivals);
      } catch (error) {
        console.error('Error setting up data:', error);
      }
    };
    fetchData();
  }, []);

  // Example coordinates for bus stops
  const routeStops = {
    'Route 1': [
      { name: 'City Center', coordinates: [37.7749, -122.4194] },
      { name: 'Downtown', coordinates: [37.7899, -122.4034] },
      { name: 'Market District', coordinates: [37.7879, -122.4074] }
    ],
    'Route 2': [
      { name: 'Tech Hub', coordinates: [37.7829, -122.4094] },
      { name: 'University', coordinates: [37.7839, -122.4134] },
      { name: 'Shopping Mall', coordinates: [37.7859, -122.4154] }
    ]
  };

  const selectedStops = routeStops[selectedRoute as keyof typeof routeStops] || [];
  const mapMarkers = selectedStops.map(stop => ({
    position: stop.coordinates as [number, number],
    popup: `<strong>${stop.name}</strong><br/>Bus Stop`,
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
          Public Transport
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time bus tracking and route information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden z-10">
            <div className="relative">
              <LeafletMap
                center={[37.7749, -122.4194]}
                zoom={14}
                markers={mapMarkers}
                className="h-[500px] w-full"
                route={route}
                showTraffic={showTraffic}
              />
              <div className="absolute top-4 right-4 z-10">
                <Button 
                  size="sm" 
                  variant={showTraffic ? 'primary' : 'outline'}
                  onClick={() => setShowTraffic(!showTraffic)}
                  className="flex items-center space-x-1"
                >
                  <AlertTriangle size={14} />
                  <span>Traffic</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-semibold mb-4">Bus Routes</h3>
            <div className="space-y-4">
              {busRoutes.map((route) => (
                <div
                  key={route.id}
                  onClick={() => setSelectedRoute(route.name)}
                  className={`cursor-pointer p-4 rounded-lg transition-colors ${selectedRoute === route.name ? route.color + ' text-white' : 'bg-gray-50 dark:bg-gray-800'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bus className={selectedRoute === route.name ? 'text-white' : 'text-gray-500'} />
                      <div>
                        <h4 className="font-medium">{route.name}</h4>
                        <p className="text-sm opacity-90">{route.stops} stops</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{route.activeVehicles} buses</p>
                      <p className="text-xs opacity-90">in service</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-4">Next Arrivals</h3>
            <div className="space-y-4">
              {busArrivals
                .filter(arrival => arrival.route === selectedRoute)
                .map((arrival, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{arrival.destination}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{arrival.arrival}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">{arrival.capacity}%</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          <Card className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Plan Your Journey</h3>
            <RouteSelector 
              onRouteSelect={(routeInfo) => setRoute(routeInfo)} 
            />
          </Card>
        </div>
      </div>
    </motion.div>
  );
};