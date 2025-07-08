import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Preloader from './components/ui/Preloader';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { SmartParking } from './pages/SmartParking';
import { TrafficDashboard } from './pages/TrafficDashboard';
import { PublicTransport } from './pages/PublicTransport';
import { WasteManagement } from './pages/WasteManagement';
import { EnergyConsumption } from './pages/EnergyConsumption';
import { WaterSupply } from './pages/WaterSupply';
import { EmergencyServices } from './pages/EmergencyServices';
import { CrimeMonitor } from './pages/CrimeMonitor';
import { CitizenReports } from './pages/CitizenReports';
import { TreeTracker } from './pages/TreeTracker';
import { BudgetTracker } from './pages/BudgetTracker';
import { LocalBusinesses } from './pages/LocalBusinesses';
import { AIAssistant } from './pages/AIAssistant';

// Placeholder component for alerts page
const CivicAlerts: React.FC = () => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Civic Alerts</h2>
      <p className="text-gray-600 dark:text-gray-400">Real-time city alerts and notifications system coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Preloader />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/parking" element={<Layout><SmartParking /></Layout>} />
            <Route path="/traffic" element={<Layout><TrafficDashboard /></Layout>} />
            <Route path="/transport" element={<Layout><PublicTransport /></Layout>} />
            <Route path="/waste" element={<Layout><WasteManagement /></Layout>} />
            <Route path="/energy" element={<Layout><EnergyConsumption /></Layout>} />
            <Route path="/water" element={<Layout><WaterSupply /></Layout>} />
            <Route path="/emergency" element={<Layout><EmergencyServices /></Layout>} />
            <Route path="/crime" element={<Layout><CrimeMonitor /></Layout>} />
            <Route path="/reports" element={<Layout><CitizenReports /></Layout>} />
            <Route path="/trees" element={<Layout><TreeTracker /></Layout>} />
            <Route path="/alerts" element={<Layout><CivicAlerts /></Layout>} />
            <Route path="/budget" element={<Layout><BudgetTracker /></Layout>} />
            <Route path="/business" element={<Layout><LocalBusinesses /></Layout>} />
            <Route path="/ai-assistant" element={<Layout><AIAssistant /></Layout>} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;