import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ProgressBar } from '../components/ui/ProgressBar';
import { TreePine, Plus, MapPin, Calendar, Droplet, Thermometer, TrendingUp } from 'lucide-react';

export const TreeTracker: React.FC = () => {
  const [isAddTreeModalOpen, setIsAddTreeModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState('all');

  const treeData = [
    {
      id: 1,
      species: 'Oak Tree',
      location: 'Central Park',
      plantedDate: '2023-03-15',
      height: 2.5,
      health: 95,
      waterLevel: 80,
      age: '8 months',
      co2Absorbed: 12.5
    },
    {
      id: 2,
      species: 'Maple Tree',
      location: 'Main Street',
      plantedDate: '2023-01-20',
      height: 3.2,
      health: 88,
      waterLevel: 65,
      age: '11 months',
      co2Absorbed: 18.3
    },
    {
      id: 3,
      species: 'Pine Tree',
      location: 'School District',
      plantedDate: '2023-05-10',
      height: 1.8,
      health: 92,
      waterLevel: 90,
      age: '6 months',
      co2Absorbed: 8.7
    },
    {
      id: 4,
      species: 'Birch Tree',
      location: 'Residential Area',
      plantedDate: '2023-02-28',
      height: 2.8,
      health: 85,
      waterLevel: 70,
      age: '9 months',
      co2Absorbed: 15.2
    }
  ];

  const areas = [
    { id: 'all', name: 'All Areas', count: 247 },
    { id: 'central-park', name: 'Central Park', count: 89 },
    { id: 'main-street', name: 'Main Street', count: 45 },
    { id: 'school-district', name: 'School District', count: 67 },
    { id: 'residential', name: 'Residential', count: 46 }
  ];

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getWaterColor = (water: number) => {
    if (water >= 80) return 'bg-blue-500';
    if (water >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
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
          Urban Tree Plantation Tracker
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor tree growth and environmental impact across the city
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2">
          {areas.map((area) => (
            <Button
              key={area.id}
              variant={selectedArea === area.id ? 'primary' : 'outline'}
              onClick={() => setSelectedArea(area.id)}
              className="flex items-center space-x-2"
            >
              <span>{area.name}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {area.count}
              </span>
            </Button>
          ))}
        </div>
        <Button
          onClick={() => setIsAddTreeModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Tree</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Trees', value: '247', icon: TreePine, color: 'bg-green-500' },
          { label: 'CO₂ Absorbed', value: '1.2 tons', icon: TrendingUp, color: 'bg-blue-500' },
          { label: 'Avg Health', value: '89%', icon: Thermometer, color: 'bg-purple-500' },
          { label: 'Water Needed', value: '15', icon: Droplet, color: 'bg-cyan-500' }
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {treeData.map((tree, index) => (
          <motion.div
            key={tree.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card hover={true}>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <TreePine className="text-green-500" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {tree.species}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tree.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {tree.age}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Height</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {tree.height}m
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">CO₂ Absorbed</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {tree.co2Absorbed} kg
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Health</span>
                      <span className="font-medium">{tree.health}%</span>
                    </div>
                    <ProgressBar
                      value={tree.health}
                      color={getHealthColor(tree.health)}
                      size="sm"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Water Level</span>
                      <span className="font-medium">{tree.waterLevel}%</span>
                    </div>
                    <ProgressBar
                      value={tree.waterLevel}
                      color={getWaterColor(tree.waterLevel)}
                      size="sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={14} />
                    <span>Planted {new Date(tree.plantedDate).toLocaleDateString()}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tree Distribution Map
        </h3>
        <div className="h-96 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-green-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Interactive tree distribution map</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Real-time tree locations and health status
            </p>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isAddTreeModalOpen}
        onClose={() => setIsAddTreeModalOpen(false)}
        title="Add New Tree"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tree Species
            </label>
            <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
              <option>Oak Tree</option>
              <option>Maple Tree</option>
              <option>Pine Tree</option>
              <option>Birch Tree</option>
              <option>Cherry Tree</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter planting location"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Initial Height (m)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="1.5"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Planting Date
              </label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              rows={3}
              placeholder="Additional information about the tree"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            />
          </div>
          <div className="flex space-x-4">
            <Button className="flex-1">Add Tree</Button>
            <Button variant="outline" onClick={() => setIsAddTreeModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};