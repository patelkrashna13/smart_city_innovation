import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Building, MapPin, Star, Phone, Clock, Users, TrendingUp } from 'lucide-react';

export const LocalBusinesses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

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
      reviews: 127,
      phone: '(555) 123-4567',
      hours: '9 AM - 10 PM',
      employees: 15,
      revenue: 'High',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Tech Solutions Inc',
      category: 'services',
      address: '456 Business Ave',
      rating: 4.8,
      reviews: 89,
      phone: '(555) 987-6543',
      hours: '8 AM - 6 PM',
      employees: 32,
      revenue: 'Very High',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Green Market',
      category: 'retail',
      address: '789 Park Road',
      rating: 4.2,
      reviews: 203,
      phone: '(555) 456-7890',
      hours: '7 AM - 9 PM',
      employees: 8,
      revenue: 'Medium',
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'City Health Clinic',
      category: 'healthcare',
      address: '321 Medical Center Dr',
      rating: 4.7,
      reviews: 156,
      phone: '(555) 234-5678',
      hours: '24/7',
      employees: 45,
      revenue: 'High',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredBusinesses = selectedCategory === 'all' 
    ? businesses 
    : businesses.filter(business => business.category === selectedCategory);

  const getRevenueColor = (revenue: string) => {
    switch (revenue) {
      case 'Very High': return 'text-green-600 bg-green-100';
      case 'High': return 'text-blue-600 bg-blue-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
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
          Local Business Directory
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive directory of local businesses and economic indicators
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <span>{category.name}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {category.count}
              </span>
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            onClick={() => setViewMode('grid')}
            size="sm"
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'map' ? 'primary' : 'outline'}
            onClick={() => setViewMode('map')}
            size="sm"
          >
            Map
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Businesses', value: '1,247', icon: Building, color: 'bg-blue-500' },
          { label: 'New This Month', value: '23', icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Total Employees', value: '8,456', icon: Users, color: 'bg-purple-500' },
          { label: 'Avg Rating', value: '4.3', icon: Star, color: 'bg-yellow-500' }
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

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card hover={true}>
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {business.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRevenueColor(business.revenue)}`}>
                        {business.revenue}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(business.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {business.rating}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({business.reviews} reviews)
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} />
                        <span>{business.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={14} />
                        <span>{business.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={14} />
                        <span>{business.hours}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users size={14} />
                        <span>{business.employees} employees</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Business Location Map
          </h3>
          <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Interactive business location map</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Explore businesses by location and category
              </p>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};