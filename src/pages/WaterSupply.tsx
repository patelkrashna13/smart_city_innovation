import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Droplet, Thermometer, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export const WaterSupply: React.FC = () => {
  const waterQualityData = [
    { parameter: 'pH Level', value: 7.2, range: '6.5-8.5', status: 'good', unit: '' },
    { parameter: 'Chlorine', value: 0.8, range: '0.2-1.0', status: 'good', unit: 'mg/L' },
    { parameter: 'Turbidity', value: 0.3, range: '0-1', status: 'excellent', unit: 'NTU' },
    { parameter: 'Temperature', value: 18, range: '15-25', status: 'good', unit: '°C' }
  ];

  const supplyStatus = [
    { area: 'Downtown', pressure: 85, flow: 92, status: 'normal' },
    { area: 'Residential North', pressure: 78, flow: 88, status: 'normal' },
    { area: 'Industrial Zone', pressure: 65, flow: 70, status: 'low' },
    { area: 'Suburban South', pressure: 90, flow: 95, status: 'excellent' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="text-green-500" size={16} />;
      case 'good': return <CheckCircle className="text-blue-500" size={16} />;
      case 'low': return <AlertTriangle className="text-yellow-500" size={16} />;
      default: return <AlertTriangle className="text-red-500" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-red-600 bg-red-100';
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
          Water Supply & Quality Monitor
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time water quality monitoring and supply management
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Daily Supply', value: '2.4M L', icon: Droplet, color: 'bg-blue-500' },
          { label: 'System Pressure', value: '82 PSI', icon: Activity, color: 'bg-green-500' },
          { label: 'Quality Score', value: '98%', icon: CheckCircle, color: 'bg-purple-500' },
          { label: 'Active Alerts', value: '1', icon: AlertTriangle, color: 'bg-yellow-500' }
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
            Water Quality Parameters
          </h3>
          <div className="space-y-4">
            {waterQualityData.map((param, index) => (
              <motion.div
                key={param.parameter}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {param.parameter === 'Temperature' ? (
                      <Thermometer className="text-blue-500" size={20} />
                    ) : (
                      <Droplet className="text-blue-500" size={20} />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{param.parameter}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Range: {param.range} {param.unit}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(param.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(param.status)}`}>
                      {param.value} {param.unit}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Supply Status by Area
          </h3>
          <div className="space-y-4">
            {supplyStatus.map((area, index) => (
              <motion.div
                key={area.area}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Activity className="text-blue-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{area.area}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pressure: {area.pressure} PSI • Flow: {area.flow}%
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(area.status)}`}>
                    {area.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pressure</span>
                      <span>{area.pressure}%</span>
                    </div>
                    <ProgressBar
                      value={area.pressure}
                      color={area.pressure > 80 ? 'bg-green-500' : area.pressure > 60 ? 'bg-yellow-500' : 'bg-red-500'}
                      size="sm"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Flow Rate</span>
                      <span>{area.flow}%</span>
                    </div>
                    <ProgressBar
                      value={area.flow}
                      color={area.flow > 80 ? 'bg-green-500' : area.flow > 60 ? 'bg-yellow-500' : 'bg-red-500'}
                      size="sm"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Water Distribution Network
        </h3>
        <div className="h-96 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Droplet size={48} className="text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Interactive water distribution map</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Real-time pressure monitoring and leak detection
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};