import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Phone, MapPin, Clock, Ambulance, Truck, Shield, AlertTriangle } from 'lucide-react';

export const EmergencyServices: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('all');

  const emergencyServices = [
    { id: 1, type: 'Hospital', name: 'General Hospital', distance: '0.8 km', eta: '3 min', available: true },
    { id: 2, type: 'Fire Station', name: 'Fire Station 1', distance: '1.2 km', eta: '4 min', available: true },
    { id: 3, type: 'Police', name: 'Police Station', distance: '0.5 km', eta: '2 min', available: true },
    { id: 4, type: 'Hospital', name: 'Emergency Clinic', distance: '2.1 km', eta: '7 min', available: false }
  ];

  const activeIncidents = [
    { id: 1, type: 'Medical', location: 'Main St & 5th Ave', time: '5 min ago', status: 'responding', priority: 'high' },
    { id: 2, type: 'Fire', location: 'Industrial District', time: '12 min ago', status: 'on-scene', priority: 'critical' },
    { id: 3, type: 'Traffic', location: 'Highway 101', time: '8 min ago', status: 'resolved', priority: 'medium' }
  ];

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'Hospital': return Ambulance;
      case 'Fire Station': return Truck;
      case 'Police': return Shield;
      default: return Phone;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
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
          Emergency Services Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time emergency response coordination and monitoring
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          {['all', 'Hospital', 'Fire Station', 'Police'].map((service) => (
            <Button
              key={service}
              variant={selectedService === service ? 'primary' : 'outline'}
              onClick={() => setSelectedService(service)}
              className="capitalize"
            >
              {service}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <AlertTriangle size={16} />
          <span>Report Emergency</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Active Incidents', value: '3', icon: AlertTriangle, color: 'bg-red-500' },
          { label: 'Response Time', value: '4.2 min', icon: Clock, color: 'bg-blue-500' },
          { label: 'Available Units', value: '18', icon: Truck, color: 'bg-green-500' },
          { label: 'Resolved Today', value: '27', icon: Shield, color: 'bg-purple-500' }
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
            Nearest Emergency Services
          </h3>
          <div className="space-y-4">
            {emergencyServices
              .filter(service => selectedService === 'all' || service.type === selectedService)
              .map((service, index) => {
                const ServiceIcon = getServiceIcon(service.type);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 ${
                      service.available 
                        ? 'border-green-200 bg-green-50 dark:bg-green-900/20' 
                        : 'border-red-200 bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <ServiceIcon className={service.available ? 'text-green-500' : 'text-red-500'} size={24} />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{service.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {service.distance} • ETA: {service.eta}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        service.available 
                          ? 'text-green-600 bg-green-100' 
                          : 'text-red-600 bg-red-100'
                      }`}>
                        {service.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Active Incidents
          </h3>
          <div className="space-y-4">
            {activeIncidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="text-red-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{incident.type} Emergency</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {incident.location} • {incident.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(incident.priority)}`}>
                      {incident.priority}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    incident.status === 'resolved' ? 'text-green-600' :
                    incident.status === 'on-scene' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    Status: {incident.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Emergency Services Map
        </h3>
        <div className="h-96 bg-gradient-to-br from-red-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Interactive emergency services map</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Real-time locations and response routes
            </p>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Report Emergency"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Emergency Type
            </label>
            <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
              <option>Medical Emergency</option>
              <option>Fire Emergency</option>
              <option>Police Emergency</option>
              <option>Traffic Accident</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location or address"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe the emergency situation"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            />
          </div>
          <div className="flex space-x-4">
            <Button className="flex-1">Submit Report</Button>
            <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};