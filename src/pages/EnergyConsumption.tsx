import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Zap, Building, TrendingUp, TrendingDown, Lightbulb, MapPin, AlertTriangle } from 'lucide-react';
import { LeafletMap } from '../components/maps/LeafletMap';
import { RouteSelector, RouteInfo } from '../components/maps/RouteSelector';

export const EnergyConsumption: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [route, setRoute] = useState<RouteInfo | undefined>();
  const [showTraffic, setShowTraffic] = useState(true);

  const buildings = [
    { id: 'city-hall', name: 'City Hall', consumption: 245, trend: 'up', efficiency: 85 },
    { id: 'hospital', name: 'General Hospital', consumption: 892, trend: 'down', efficiency: 78 },
    { id: 'school-district', name: 'School District', consumption: 567, trend: 'up', efficiency: 92 },
    { id: 'library', name: 'Public Library', consumption: 123, trend: 'down', efficiency: 88 }
  ];

  const energyData = {
    today: { total: 1827, peak: 2100, average: 1650, renewable: 35 },
    week: { total: 12789, peak: 2300, average: 1827, renewable: 38 },
    month: { total: 54321, peak: 2500, average: 1754, renewable: 42 }
  };

  const currentData = energyData[selectedPeriod as keyof typeof energyData];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Energy Consumption Monitor
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time energy usage tracking and optimization
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {['today', 'week', 'month'].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? 'primary' : 'outline'}
            onClick={() => setSelectedPeriod(period)}
            className="capitalize"
          >
            {period}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Consumption', value: `${currentData.total} kWh`, icon: Zap, color: 'bg-blue-500' },
          { label: 'Peak Usage', value: `${currentData.peak} kW`, icon: TrendingUp, color: 'bg-red-500' },
          { label: 'Average Load', value: `${currentData.average} kW`, icon: Building, color: 'bg-green-500' },
          { label: 'Renewable %', value: `${currentData.renewable}%`, icon: Lightbulb, color: 'bg-yellow-500' }
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
            Energy Usage Chart
          </h3>
          <div className="h-80 bg-gradient-to-br from-blue-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Zap size={48} className="text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Interactive energy consumption chart</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Real-time and historical data visualization
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Building-wise Consumption
          </h3>
          <div className="space-y-4">
            {buildings.map((building, index) => (
              <motion.div
                key={building.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedBuilding === building.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-gray-300'
                }`}
                onClick={() => setSelectedBuilding(building.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Building className="text-blue-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{building.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {building.consumption} kWh • Efficiency: {building.efficiency}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {building.trend === 'up' ? (
                      <TrendingUp className="text-red-500" size={16} />
                    ) : (
                      <TrendingDown className="text-green-500" size={16} />
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${building.efficiency}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Energy Infrastructure Map
            </h3>
            <div className="relative">
              <LeafletMap 
                center={[40.7128, -74.0060]} 
                zoom={13} 
                className="h-96 rounded-xl" 
                markers={buildings.map((building, index) => ({
                  position: [
                    40.7128 + (Math.random() - 0.5) * 0.02, 
                    -74.0060 + (Math.random() - 0.5) * 0.02
                  ] as [number, number],
                  popup: `<b>${building.name}</b><br>Consumption: ${building.consumption} kWh<br>Efficiency: ${building.efficiency}%`,
                  color: building.trend === 'up' ? 'red' : 'green'
                }))}
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
        
        <div>
          <RouteSelector 
            onRouteSelect={(routeInfo) => setRoute(routeInfo)} 
            className="h-full"
          />
        </div>
      </div>
    </motion.div>
  );
};