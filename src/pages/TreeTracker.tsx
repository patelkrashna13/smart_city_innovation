import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TreeDeciduous, MapPin, Leaf, Calendar, AlertTriangle } from 'lucide-react';
import { LeafletMap } from '../components/maps/LeafletMap';
import { RouteSelector, RouteInfo } from '../components/maps/RouteSelector';

export const TreeTracker: React.FC = () => {
  const [isAddTreeModalOpen, setIsAddTreeModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState('all');
  const [route, setRoute] = useState<RouteInfo | undefined>();
  const [showTraffic, setShowTraffic] = useState(false);

  const treeData = [
    {
      id: 1,
      species: 'Oak Tree',
      location: 'Central Park',
      coordinates: [37.7749, -122.4194] as [number, number],
      age: '15 years',
      health: 'Good',
      lastInspection: '2023-12-01'
    },
    {
      id: 2,
      species: 'Maple Tree',
      location: 'Downtown Square',
      coordinates: [37.7859, -122.4154] as [number, number],
      age: '8 years',
      health: 'Excellent',
      lastInspection: '2023-11-15'
    },
    {
      id: 3,
      species: 'Pine Tree',
      location: 'Hillside Park',
      coordinates: [37.7839, -122.4134] as [number, number],
      age: '20 years',
      health: 'Fair',
      lastInspection: '2023-12-10'
    }
  ];

  const areas = [
    { id: 'all', name: 'All Areas', count: treeData.length },
    { id: 'central', name: 'Central Park', count: 1 },
    { id: 'downtown', name: 'Downtown', count: 1 },
    { id: 'hillside', name: 'Hillside', count: 1 }
  ];

  const filteredTrees = selectedArea === 'all' 
    ? treeData 
    : treeData.filter(tree => tree.location.toLowerCase().includes(selectedArea));

  const mapMarkers = filteredTrees.map(tree => ({
    position: tree.coordinates,
    popup: `<strong>${tree.species}</strong><br/>${tree.location}<br/>Health: ${tree.health}`,
  }));

  const getHealthColor = (health: string) => {
    switch (health.toLowerCase()) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Tree Tracker</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and manage urban forest inventory
          </p>
        </div>
        <Button onClick={() => setIsAddTreeModalOpen(true)}>
          Add New Tree
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {areas.map(area => (
          <Button
            key={area.id}
            onClick={() => setSelectedArea(area.id)}
            variant={selectedArea === area.id ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <span>{area.name}</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-sm">
              {area.count}
            </span>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden">
            <LeafletMap
              center={[37.7749, -122.4194]}
              zoom={14}
              markers={mapMarkers}
              route={route}
              showTraffic={showTraffic}
              className="h-[500px] w-full"
            />
            <div className="p-4 flex justify-between items-center">
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
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-semibold mb-4">Plan Route to Tree</h3>
            <RouteSelector
              onRouteSelect={(routeData) => setRoute(routeData)}
              defaultSource={[37.7749, -122.4194]}
              defaultDestination={[37.7859, -122.4154]}
            />
          </Card>
          
          <Card>
            <h3 className="text-xl font-semibold mb-4">Tree List</h3>
            <div className="space-y-4">
              {filteredTrees.map(tree => (
                <div
                  key={tree.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{tree.species}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {tree.location}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(tree.health)}`}>
                      {tree.health}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <TreeDeciduous className="w-4 h-4 mr-2" />
                      {tree.age}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Last check: {tree.lastInspection}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};