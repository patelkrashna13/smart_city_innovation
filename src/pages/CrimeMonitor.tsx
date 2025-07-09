import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Shield, MapPin, TrendingDown, TrendingUp, AlertTriangle, Eye } from 'lucide-react';
import { LeafletMap } from '../components/maps/LeafletMap';
import { RouteSelector, RouteInfo } from '../components/maps/RouteSelector';

export const CrimeMonitor: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedCrimeType, setSelectedCrimeType] = useState('all');
  const [route, setRoute] = useState<RouteInfo | undefined>();
  const [showTraffic, setShowTraffic] = useState(false);

  const crimeStats = {
    week: { total: 23, theft: 8, vandalism: 5, assault: 3, other: 7, trend: -12 },
    month: { total: 89, theft: 32, vandalism: 18, assault: 12, other: 27, trend: -8 },
    year: { total: 1247, theft: 456, vandalism: 234, assault: 178, other: 379, trend: -15 }
  };

  const recentIncidents = [
    { id: 1, type: 'Theft', location: 'Main St & 3rd Ave', time: '2 hours ago', severity: 'medium', status: 'investigating' },
    { id: 2, type: 'Vandalism', location: 'City Park', time: '5 hours ago', severity: 'low', status: 'reported' },
    { id: 3, type: 'Assault', location: 'Downtown Plaza', time: '1 day ago', severity: 'high', status: 'resolved' },
    { id: 4, type: 'Theft', location: 'Shopping Center', time: '2 days ago', severity: 'medium', status: 'investigating' }
  ];

  const hotspots = [
    { area: 'Downtown', incidents: 12, risk: 'high', cameras: 8, patrols: 3 },
    { area: 'Industrial Zone', incidents: 8, risk: 'medium', cameras: 4, patrols: 2 },
    { area: 'Residential North', incidents: 3, risk: 'low', cameras: 6, patrols: 4 },
    { area: 'Shopping District', incidents: 7, risk: 'medium', cameras: 12, patrols: 2 }
  ];

  const currentStats = crimeStats[selectedPeriod as keyof typeof crimeStats];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const handleRouteSelect = (routeInfo: RouteInfo) => {
    setRoute(routeInfo);
    setShowTraffic(routeInfo.avoidTraffic);
  };
  
  const mapCenter: [number, number] = [51.505, -0.09]; // Default center, replace with your city coordinates
  
  const incidentMarkers = recentIncidents.map(incident => ({
    position: [51.505 + (Math.random() - 0.5) * 0.03, -0.09 + (Math.random() - 0.5) * 0.03] as [number, number],
    popup: `<b>${incident.type}</b><br>${incident.location}<br>${incident.time}`,
    color: incident.severity === 'high' ? 'red' : incident.severity === 'medium' ? 'yellow' : 'green'
  }));
  
  const hotspotMarkers = hotspots.map(hotspot => ({
    position: [51.505 + (Math.random() - 0.5) * 0.02, -0.09 + (Math.random() - 0.5) * 0.02] as [number, number],
    popup: `<b>${hotspot.area}</b><br>Risk: ${hotspot.risk}<br>Incidents: ${hotspot.incidents}`,
    color: hotspot.risk === 'high' ? 'red' : hotspot.risk === 'medium' ? 'yellow' : 'green'
  }));
  
  // Combine all markers
  const allMarkers = [...incidentMarkers, ...hotspotMarkers];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Crime Monitoring Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time crime tracking and safety analytics
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {['week', 'month', 'year'].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? 'primary' : 'outline'}
            onClick={() => setSelectedPeriod(period)}
            className="capitalize"
          >
            This {period}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { 
            label: 'Total Incidents', 
            value: currentStats.total.toString(), 
            change: `${currentStats.trend}%`,
            icon: Shield, 
            color: 'bg-blue-500',
            trend: currentStats.trend < 0 ? 'down' : 'up'
          },
          { 
            label: 'Theft Cases', 
            value: currentStats.theft.toString(), 
            change: '-5%',
            icon: AlertTriangle, 
            color: 'bg-red-500',
            trend: 'down'
          },
          { 
            label: 'Active Cameras', 
            value: '142', 
            change: '+3',
            icon: Eye, 
            color: 'bg-green-500',
            trend: 'up'
          },
          { 
            label: 'Response Time', 
            value: '6.2 min', 
            change: '-1.2 min',
            icon: Shield, 
            color: 'bg-purple-500',
            trend: 'down'
          }
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
                  <div className="flex items-center mt-1">
                    {stat.trend === 'down' ? (
                      <TrendingDown className="text-green-600" size={16} />
                    ) : (
                      <TrendingUp className="text-red-600" size={16} />
                    )}
                    <span className={`text-sm ml-1 ${stat.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 ${stat.color} rounded-xl`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Crime Heatmap
          </h3>
          <div className="h-[400px] rounded-xl overflow-hidden mb-4">
            <LeafletMap 
              center={mapCenter}
              zoom={14}
              markers={allMarkers}
              route={route}
              showTraffic={showTraffic}
              className="h-full w-full"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {['all', 'theft', 'vandalism', 'assault'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedCrimeType(type)}
                className={`p-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  selectedCrimeType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Incidents
          </h3>
          <div className="space-y-4 mb-4">
            {recentIncidents.map((incident, index) => (
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
                      <p className="font-medium text-gray-900 dark:text-white">{incident.type}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {incident.location} • {incident.time}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    incident.status === 'resolved' ? 'text-green-600' :
                    incident.status === 'investigating' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    Status: {incident.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <RouteSelector onRouteSelect={handleRouteSelect} />
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Crime Hotspots & Security Coverage
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {hotspots.map((hotspot, index) => (
            <motion.div
              key={hotspot.area}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">{hotspot.area}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(hotspot.risk)}`}>
                  {hotspot.risk} risk
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Incidents:</span>
                  <span className="font-medium">{hotspot.incidents}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cameras:</span>
                  <span className="font-medium">{hotspot.cameras}</span>
                </div>
                <div className="flex justify-between">
                  <span>Patrols:</span>
                  <span className="font-medium">{hotspot.patrols}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};