import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ProgressBar } from '../components/ui/ProgressBar';
import { MessageSquare, Plus, MapPin, Clock, CheckCircle, AlertCircle, User, AlertTriangle } from 'lucide-react';
import { LeafletMap } from '../components/maps/LeafletMap';
import { RouteSelector, RouteInfo } from '../components/maps/RouteSelector';

export const CitizenReports: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reportStep, setReportStep] = useState(1);
  const [route, setRoute] = useState<RouteInfo | undefined>();
  const [showTraffic, setShowTraffic] = useState(false);

  const categories = [
    { id: 'all', name: 'All Reports', count: 156 },
    { id: 'infrastructure', name: 'Infrastructure', count: 45 },
    { id: 'environment', name: 'Environment', count: 32 },
    { id: 'safety', name: 'Safety', count: 28 },
    { id: 'utilities', name: 'Utilities', count: 51 }
  ];

  const reports = [
    {
      id: 1,
      title: 'Pothole on Main Street',
      category: 'infrastructure',
      location: 'Main St & 5th Ave',
      status: 'in-progress',
      priority: 'medium',
      submittedBy: 'John D.',
      submittedAt: '2 hours ago',
      description: 'Large pothole causing traffic issues',
      votes: 12
    },
    {
      id: 2,
      title: 'Broken Street Light',
      category: 'utilities',
      location: 'Park Avenue',
      status: 'pending',
      priority: 'low',
      submittedBy: 'Sarah M.',
      submittedAt: '5 hours ago',
      description: 'Street light not working for 3 days',
      votes: 8
    },
    {
      id: 3,
      title: 'Illegal Dumping',
      category: 'environment',
      location: 'Industrial Zone',
      status: 'resolved',
      priority: 'high',
      submittedBy: 'Mike R.',
      submittedAt: '1 day ago',
      description: 'Construction waste dumped illegally',
      votes: 23
    },
    {
      id: 4,
      title: 'Damaged Sidewalk',
      category: 'infrastructure',
      location: 'School District',
      status: 'pending',
      priority: 'medium',
      submittedBy: 'Lisa K.',
      submittedAt: '3 days ago',
      description: 'Cracked sidewalk poses safety risk',
      votes: 15
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredReports = selectedCategory === 'all' 
    ? reports 
    : reports.filter(report => report.category === selectedCategory);

  const handleSubmitReport = () => {
    if (reportStep < 3) {
      setReportStep(reportStep + 1);
    } else {
      setIsReportModalOpen(false);
      setReportStep(1);
      // Handle form submission
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
          Citizen Issue Reporting
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Community-driven issue reporting and tracking system
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
        <Button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>New Report</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Reports', value: '156', icon: MessageSquare, color: 'bg-blue-500' },
          { label: 'Resolved', value: '89', icon: CheckCircle, color: 'bg-green-500' },
          { label: 'In Progress', value: '34', icon: AlertCircle, color: 'bg-yellow-500' },
          { label: 'Avg Response', value: '2.3 days', icon: Clock, color: 'bg-purple-500' }
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Report Locations
          </h3>
          <div className="h-[400px] rounded-xl overflow-hidden mb-4">
            <LeafletMap 
              center={[51.505, -0.09]}
              zoom={14}
              markers={filteredReports.map(report => ({
                position: [
                  51.505 + (Math.random() * 0.02 - 0.01), 
                  -0.09 + (Math.random() * 0.02 - 0.01)
                ] as [number, number],
                popup: `<b>${report.title}</b><br/>${report.location}<br/>Status: ${report.status}`,
                color: report.priority === 'high' ? 'red' : report.priority === 'medium' ? 'yellow' : 'green'
              }))}
              route={route}
              showTraffic={showTraffic}
              darkMode={false}
            />
          </div>
          <div className="flex justify-between items-center">
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
            Plan Route to Report
          </h3>
          <RouteSelector
            onRouteSelect={(routeData) => setRoute(routeData)}
            defaultSource={[51.505, -0.09]}
            defaultDestination={[51.51, -0.1]}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card hover={true}>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {report.title}
                  </h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {report.description}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{report.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{report.submittedAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {report.submittedBy}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700">
                      <span>👍</span>
                      <span>{report.votes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setReportStep(1);
        }}
        title="Submit New Report"
        size="lg"
      >
        <div className="space-y-6">
          <ProgressBar
            value={(reportStep / 3) * 100}
            color="bg-blue-500"
            size="sm"
            showLabel={true}
            label={`Step ${reportStep} of 3`}
          />

          {reportStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Issue Category
                </label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                  <option>Infrastructure</option>
                  <option>Environment</option>
                  <option>Safety</option>
                  <option>Utilities</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Issue Title
                </label>
                <input
                  type="text"
                  placeholder="Brief description of the issue"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
            </motion.div>
          )}

          {reportStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter address or location"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide detailed information about the issue"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
            </motion.div>
          )}

          {reportStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority Level
                </label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Drag and drop photos here or click to browse
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex space-x-4">
            {reportStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setReportStep(reportStep - 1)}
                className="flex-1"
              >
                Previous
              </Button>
            )}
            <Button onClick={handleSubmitReport} className="flex-1">
              {reportStep === 3 ? 'Submit Report' : 'Next'}
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};