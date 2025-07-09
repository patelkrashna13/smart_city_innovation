import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Navigation, AlertTriangle, TrendingUp, MapPin } from 'lucide-react';
import { LeafletMap } from '../components/maps/LeafletMap';
import { RouteSelector, RouteInfo } from '../components/maps/RouteSelector';
import api from '../utils/api';

export const TrafficDashboard: React.FC = () => {
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [route, setRoute] = useState<RouteInfo | undefined>();
  const [showTraffic, setShowTraffic] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data since API might not be available
        const mockTrafficData = [
          { id: 1, location: 'Downtown', status: 'Heavy', delay: '15 min', color: 'bg-red-500', lat: 37.7749, lng: -122.4194 },
          { id: 2, location: 'Uptown', status: 'Moderate', delay: '8 min', color: 'bg-yellow-500', lat: 37.7849, lng: -122.4294 },
          { id: 3, location: 'West Side', status: 'Light', delay: '3 min', color: 'bg-green-500', lat: 37.7649, lng: -122.4394 },
          { id: 4, location: 'East Side', status: 'Heavy', delay: '12 min', color: 'bg-red-500', lat: 37.7549, lng: -122.4094 }
        ];
        
        const mockIncidents = [
          { id: 1, location: 'Main St & 5th Ave', description: 'Traffic accident, right lane blocked', severity: 'high' },
          { id: 2, location: 'Highway 101 North', description: 'Construction work, expect delays', severity: 'medium' },
          { id: 3, location: 'Downtown Bridge', description: 'Vehicle breakdown, emergency services on scene', severity: 'high' },
          { id: 4, location: 'Central Park Area', description: 'Special event, roads closed', severity: 'medium' }
        ];
        
        // Try to get data from API, fallback to mock data
        try {
          const [trafficResponse, incidentsResponse] = await Promise.all([
            api.getTrafficData(),
            api.getTrafficIncidents()
          ]);
          setTrafficData(trafficResponse.data && trafficResponse.data.length ? trafficResponse.data : mockTrafficData);
          setIncidents(incidentsResponse.data && incidentsResponse.data.length ? incidentsResponse.data : mockIncidents);
        } catch (error) {
          console.error('Error fetching traffic data:', error);
          setTrafficData(mockTrafficData);
          setIncidents(mockIncidents);
        }
      } catch (error) {
        console.error('Error setting up data:', error);
      }
    };
    fetchData();
  }, []);

  const mapMarkers = trafficData.map(location => ({
    position: [location.lat, location.lng] as [number, number],
    popup: `${location.name}<br/>Status: ${location.status}<br/>Delay: ${location.delay}`,
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
          Live Traffic Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time traffic monitoring and congestion analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-xl font-semibold mb-4">Traffic Map</h3>
            <div className="relative">
              <LeafletMap
                center={[37.7749, -122.4194]} // San Francisco coordinates as default
                zoom={12}
                markers={mapMarkers}
                route={route}
                showTraffic={showTraffic}
                className="h-[500px]"
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
            <h3 className="text-xl font-semibold mb-4">Route Planner</h3>
            <RouteSelector 
              onRouteSelect={(routeInfo) => setRoute(routeInfo)} 
            />
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-4">Traffic Incidents</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {incidents.map((incident, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <AlertTriangle className="text-yellow-500 mr-3" />
                  <div>
                    <h4 className="font-medium">{incident.location}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {incident.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trafficData.map((item, index) => (
          <Card key={index} className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${item.color}`}>
              <Navigation className="text-white" />
            </div>
            <div>
              <h4 className="font-medium">{item.location}</h4>
              <div className="flex items-center space-x-2 text-sm">
                <span className={`font-medium ${item.color.replace('bg-', 'text-')}`}>
                  {item.status}
                </span>
                <span className="text-gray-600 dark:text-gray-400">{item.delay}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};