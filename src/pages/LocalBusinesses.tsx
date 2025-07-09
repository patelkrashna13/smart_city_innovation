import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Building, MapPin, Star, Phone, Clock, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { LeafletMap } from '../components/maps/LeafletMap';
import { RouteSelector, RouteInfo } from '../components/maps/RouteSelector';

export const LocalBusinesses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [route, setRoute] = useState<RouteInfo | undefined>();
  const [showTraffic, setShowTraffic] = useState(false);

  const categories = [
    { id: 'all', name: 'All Businesses', count: 1247 },
    { id: 'restaurant', name: 'Restaurants', count: 234 },
    { id: 'retail', name: 'Retail', count: 456 },
    { id: 'services', name: 'Services', count: 189 },
    { id: 'healthcare', name: 'Healthcare', count: 123 },
    { id: 'education', name: 'Education', count: 89 }
  ];

  const businesses = [
    {
      id: 1,
      name: 'Downtown Bistro',
      category: 'restaurant',
      address: '123 Main St',
      rating: 4.5,
      phone: '(555) 123-4567',
      hours: '9:00 AM - 10:00 PM',
      popularity: 92,
      coordinates: [37.7749, -122.4194] as [number, number]
    },
    // Add more businesses with coordinates
  ];

  const filteredBusinesses = businesses.filter(business =>
    selectedCategory === 'all' ? true : business.category === selectedCategory
  );

  const mapMarkers = filteredBusinesses.map(business => ({
    position: business.coordinates,
    popup: `<strong>${business.name}</strong><br/>${business.address}<br/>Rating: ${business.rating}⭐`,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Local Businesses</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Discover and support local businesses in your area
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setViewMode('grid')}
            variant={viewMode === 'grid' ? 'default' : 'outline'}
          >
            Grid View
          </Button>
          <Button
            onClick={() => setViewMode('map')}
            variant={viewMode === 'map' ? 'default' : 'outline'}
          >
            Map View
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <span>{category.name}</span>
            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-sm">
              {category.count}
            </span>
          </Button>
        ))}
      </div>

      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="p-0 overflow-hidden lg:col-span-3">
            <LeafletMap
              center={[37.7749, -122.4194]}
              zoom={13}
              markers={mapMarkers}
              route={route}
              showTraffic={showTraffic}
              className="h-[600px] w-full"
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
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Plan Your Visit
            </h3>
            <RouteSelector
              onRouteSelect={(routeData) => setRoute(routeData)}
              defaultSource={[37.7749, -122.4194]}
              defaultDestination={[37.7859, -122.4154]}
            />
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map(business => (
            <Card key={business.id} className="flex flex-col space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{business.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {business.address}
                  </p>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{business.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {business.phone}
                </p>
                <p className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {business.hours}
                </p>
                <p className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {business.popularity}% popularity
                </p>
              </div>

              <div className="pt-4 mt-auto border-t border-gray-200 dark:border-gray-700">
                <Button className="w-full">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
};