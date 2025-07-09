import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { MapPin, Navigation, Car, Truck, Bus, AlertTriangle, Search } from 'lucide-react';
import { getLocationSuggestions } from '../../utils/mapServices';

interface RouteSelectorProps {
  onRouteSelect: (route: RouteInfo) => void;
  className?: string;
  defaultSource?: string;
  defaultDestination?: string;
}

export interface RouteInfo {
  source: string;
  destination: string;
  vehicleType: 'car' | 'bus' | 'bike' | 'walk';
  avoidTraffic: boolean;
}

export const RouteSelector: React.FC<RouteSelectorProps> = ({ 
  onRouteSelect,
  className = '',
  defaultSource = '',
  defaultDestination = ''
}) => {
  const [source, setSource] = useState(defaultSource);
  const [destination, setDestination] = useState(defaultDestination);
  const [vehicleType, setVehicleType] = useState<'car' | 'bus' | 'bike' | 'walk'>('car');
  const [avoidTraffic, setAvoidTraffic] = useState(true);
  
  // Location suggestions
  const [sourceSuggestions, setSourceSuggestions] = useState<Array<{display_name: string}>>([]);
  const [destSuggestions, setDestSuggestions] = useState<Array<{display_name: string}>>([]);
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [isLoadingSourceSuggestions, setIsLoadingSourceSuggestions] = useState(false);
  const [isLoadingDestSuggestions, setIsLoadingDestSuggestions] = useState(false);
  
  // Refs for click outside detection
  const sourceInputRef = useRef<HTMLDivElement>(null);
  const destInputRef = useRef<HTMLDivElement>(null);

  // Fetch source location suggestions
  useEffect(() => {
    const fetchSourceSuggestions = async () => {
      if (source.length < 3) {
        setSourceSuggestions([]);
        setShowSourceSuggestions(false);
        return;
      }
      
      setIsLoadingSourceSuggestions(true);
      try {
        const suggestions = await getLocationSuggestions(source);
        setSourceSuggestions(suggestions);
        setShowSourceSuggestions(suggestions.length > 0);
      } catch (error) {
        console.error('Error fetching source suggestions:', error);
      } finally {
        setIsLoadingSourceSuggestions(false);
      }
    };
    
    const timer = setTimeout(fetchSourceSuggestions, 300);
    return () => clearTimeout(timer);
  }, [source]);
  
  // Fetch destination location suggestions
  useEffect(() => {
    const fetchDestSuggestions = async () => {
      if (destination.length < 3) {
        setDestSuggestions([]);
        setShowDestSuggestions(false);
        return;
      }
      
      setIsLoadingDestSuggestions(true);
      try {
        const suggestions = await getLocationSuggestions(destination);
        setDestSuggestions(suggestions);
        setShowDestSuggestions(suggestions.length > 0);
      } catch (error) {
        console.error('Error fetching destination suggestions:', error);
      } finally {
        setIsLoadingDestSuggestions(false);
      }
    };
    
    const timer = setTimeout(fetchDestSuggestions, 300);
    return () => clearTimeout(timer);
  }, [destination]);
  
  // Handle clicks outside suggestion dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sourceInputRef.current && !sourceInputRef.current.contains(event.target as Node)) {
        setShowSourceSuggestions(false);
      }
      if (destInputRef.current && !destInputRef.current.contains(event.target as Node)) {
        setShowDestSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (source && destination) {
      onRouteSelect({
        source,
        destination,
        vehicleType,
        avoidTraffic
      });
    }
  };
  
  const handleSelectSourceSuggestion = (suggestion: string) => {
    setSource(suggestion);
    setShowSourceSuggestions(false);
  };
  
  const handleSelectDestSuggestion = (suggestion: string) => {
    setDestination(suggestion);
    setShowDestSuggestions(false);
  };

  const vehicleIcons = {
    car: Car,
    bus: Bus,
    bike: Navigation,
    walk: MapPin
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Route Planner
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Starting Point
          </label>
          <div ref={sourceInputRef} className="relative">
            <div className="flex items-center">
              <MapPin className="text-blue-500 mr-2" size={18} />
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                onFocus={() => source.length >= 3 && setShowSourceSuggestions(true)}
                placeholder="Enter starting location (e.g., Delhi)"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {isLoadingSourceSuggestions && (
                <div className="absolute right-3 top-2.5">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              )}
            </div>
            
            {/* Source suggestions dropdown */}
            {showSourceSuggestions && sourceSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                {sourceSuggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-start"
                    onClick={() => handleSelectSourceSuggestion(suggestion.display_name)}
                  >
                    <Search size={16} className="text-gray-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-800 dark:text-gray-200">{suggestion.display_name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Destination
          </label>
          <div ref={destInputRef} className="relative">
            <div className="flex items-center">
              <Navigation className="text-red-500 mr-2" size={18} />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => destination.length >= 3 && setShowDestSuggestions(true)}
                placeholder="Enter destination (e.g., Mumbai)"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {isLoadingDestSuggestions && (
                <div className="absolute right-3 top-2.5">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              )}
            </div>
            
            {/* Destination suggestions dropdown */}
            {showDestSuggestions && destSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                {destSuggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-start"
                    onClick={() => handleSelectDestSuggestion(suggestion.display_name)}
                  >
                    <Search size={16} className="text-gray-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-800 dark:text-gray-200">{suggestion.display_name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transportation Mode
          </label>
          <div className="flex space-x-2">
            {(['car', 'bus', 'bike', 'walk'] as const).map((type) => {
              const VehicleIcon = vehicleIcons[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVehicleType(type)}
                  className={`flex-1 p-2 rounded-lg flex flex-col items-center justify-center transition-colors ${vehicleType === type ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  <VehicleIcon size={20} />
                  <span className="text-xs mt-1 capitalize">{type}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="avoidTraffic"
            checked={avoidTraffic}
            onChange={(e) => setAvoidTraffic(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="avoidTraffic" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <AlertTriangle size={16} className="text-yellow-500 mr-1" />
              <span>Avoid heavy traffic</span>
            </div>
          </label>
        </div>
        
        <Button type="submit" className="w-full">
          <Navigation size={16} className="mr-2" />
          Find Route
        </Button>
      </form>
    </div>
  );
};