import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteInfo } from './RouteSelector';
import { Car, Bus, Navigation, MapPin } from 'lucide-react';
import { getMapTileUrl, planRoute, getMarkerIcons } from '../../utils/mapServices';
import '../../utils/leafletExtensions';
import '../../styles/map-animations.css';

interface MapProps {
  center: [number, number];
  zoom: number;
  markers?: Array<{
    position: [number, number];
    popup?: string;
    icon?: L.Icon;
    color?: string;
  }>;
  onClick?: (e: L.LeafletMouseEvent) => void;
  className?: string;
  route?: RouteInfo;
  showTraffic?: boolean;
  mapType?: 'standard' | 'satellite';
  showCurrentLocation?: boolean;
}

export const LeafletMap: React.FC<MapProps> = ({
  center,
  zoom,
  markers = [],
  onClick,
  className = 'h-[500px] w-full',
  route,
  showTraffic = false,
  mapType = 'standard',
  showCurrentLocation = false
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const currentLocationMarkerRef = useRef<L.Marker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView(center, zoom);
    mapRef.current = map;

    // Add map tiles with theme support and map type
    const isDarkMode = document.documentElement.classList.contains('dark');
    L.tileLayer(getMapTileUrl(isDarkMode, mapType), {
      attribution: mapType === 'satellite' 
        ? '© ESRI World Imagery' 
        : '© OpenStreetMap contributors, © CARTO'
    }).addTo(map);

    // Create a layer group for routes
    const routeLayer = L.layerGroup().addTo(map);
    routeLayerRef.current = routeLayer;

    setIsMapReady(true);

    // Cleanup
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [mapType]);

  // Update map center and zoom when props change
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom);
    }
  }, [center, zoom]);
  
  // Get and display user's current location
  useEffect(() => {
    if (!mapRef.current || !isMapReady || !showCurrentLocation) return;
    
    const map = mapRef.current;
    
    // Import the getCurrentLocation function
    import('../../utils/mapServices').then(({ getCurrentLocation }) => {
      getCurrentLocation().then((location) => {
        setUserLocation(location);
        
        // Remove existing marker if any
        if (currentLocationMarkerRef.current) {
          map.removeLayer(currentLocationMarkerRef.current);
          currentLocationMarkerRef.current = null;
        }
        
        // Create a custom marker for current location
        const currentLocationIcon = L.divIcon({
          html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 border-2 border-white text-white shadow-lg pulse-animation">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        // Add marker and fly to location
        const marker = L.marker(location, { icon: currentLocationIcon })
          .bindPopup('<b>Your Current Location</b>')
          .addTo(map);
        
        currentLocationMarkerRef.current = marker;
        
        // Fly to the user's location with animation
        map.flyTo(location, 13, {
          animate: true,
          duration: 1.5
        });
        
        // Open popup after a short delay
        setTimeout(() => marker.openPopup(), 1000);
      });
    });
    
    return () => {
      if (currentLocationMarkerRef.current && mapRef.current) {
        mapRef.current.removeLayer(currentLocationMarkerRef.current);
        currentLocationMarkerRef.current = null;
      }
    };
  }, [isMapReady, showCurrentLocation]);

  // Add markers to the map
  useEffect(() => {
    if (!mapRef.current || !isMapReady) return;

    const map = mapRef.current;
    
    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add new markers
    markers.forEach(marker => {
      const markerColor = marker.color || 'blue';
      
      const defaultIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-${markerColor}-500 text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const markerInstance = L.marker(marker.position, {
        icon: marker.icon || defaultIcon
      });
      
      if (marker.popup) {
        markerInstance.bindPopup(marker.popup);
      }
      
      markerInstance.addTo(map);
    });
  }, [markers, isMapReady]);

  // Add click handler
  useEffect(() => {
    if (!mapRef.current || !isMapReady || !onClick) return;

    const map = mapRef.current;
    map.on('click', onClick);

    return () => {
      map.off('click', onClick);
    };
  }, [onClick, isMapReady]);

  // Helper function to add route line
  const addRouteLine = (routePoints: [number, number][], vehicleType: string, routeLayer: L.LayerGroup) => {
    // Determine route color based on vehicle type
    let routeColor = '#3b82f6'; // Default blue
    switch (vehicleType) {
      case 'car':
        routeColor = '#3b82f6'; // Blue
        break;
      case 'bus':
        routeColor = '#10b981'; // Green
        break;
      case 'bike':
        routeColor = '#f97316'; // Orange
        break;
      case 'walk':
        routeColor = '#8b5cf6'; // Purple
        break;
    }

    // Create a polyline for the route
    const routeLine = L.polyline(routePoints, {
      color: routeColor,
      weight: 5,
      opacity: 0.7,
      lineJoin: 'round'
    }).addTo(routeLayer);
    
    // Add direction arrows
    const arrowDecorator = L.polylineDecorator(routeLine, {
      patterns: [
        {
          offset: '5%',
          repeat: '10%',
          symbol: L.Symbol.arrowHead({
            pixelSize: 12,
            polygon: false,
            pathOptions: {
              stroke: true,
              color: routeColor,
              weight: 3
            }
          })
        }
      ]
    }).addTo(routeLayer);
    
    return routeLine;
  };
  
  // Helper function to add start and end markers
  const addRouteMarkers = (
    startCoords: [number, number],
    endCoords: [number, number],
    sourceText: string,
    destinationText: string,
    routeLayer: L.LayerGroup
  ) => {
    // Start marker
    const startIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    L.marker(startCoords, { icon: startIcon })
      .bindPopup(`<b>Start:</b> ${sourceText}`)
      .addTo(routeLayer);

    // End marker
    const endIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    L.marker(endCoords, { icon: endIcon })
      .bindPopup(`<b>Destination:</b> ${destinationText}`)
      .addTo(routeLayer);
  };
  
  // Helper function to add route information
  const addRouteInfo = (distance: number, duration: number, vehicleType: string, map: L.Map) => {
    // Format distance and duration
    const distanceKm = (distance / 1000).toFixed(1);
    const durationMin = Math.round(duration / 60);
    
    // Create route info control
    const routeInfoControl = L.control({ position: 'bottomright' });
    routeInfoControl.onAdd = function() {
      const div = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
      div.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Route Information</h4>
          <div class="space-y-2">
            <div class="flex items-center">
              <span class="text-gray-700 dark:text-gray-300 mr-2">Distance:</span>
              <span class="font-medium">${distanceKm} km</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-700 dark:text-gray-300 mr-2">Duration:</span>
              <span class="font-medium">${durationMin} min</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-700 dark:text-gray-300 mr-2">Mode:</span>
              <span class="font-medium capitalize">${vehicleType}</span>
            </div>
          </div>
        </div>
      `;
      return div;
    };
    routeInfoControl.addTo(map);
  };

  // Handle route display
  useEffect(() => {
    if (!mapRef.current || !routeLayerRef.current || !isMapReady) {
      console.log('Map not ready yet, skipping route display');
      return;
    }
    
    if (!route) {
      console.log('No route information provided, skipping route display');
      return;
    }
    
    console.log('Handling route display with route info:', route);
    console.log('Route source:', route.source);
    console.log('Route destination:', route.destination);
    console.log('Route vehicle type:', route.vehicleType);
    console.log('Route avoid traffic:', route.avoidTraffic);

    const map = mapRef.current;
    const routeLayer = routeLayerRef.current;
    
    // Clear existing routes
    routeLayer.clearLayers();
    console.log('Cleared existing route layers');

    // Loading indicator
    const loadingControl = L.control({ position: 'bottomleft' });
    loadingControl.onAdd = function() {
      const div = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
      div.innerHTML = `<div class="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
                        <span class="text-blue-500 font-medium">Planning route...</span>
                      </div>`;
      return div;
    };
    loadingControl.addTo(map);
    console.log('Added loading indicator');

    // Get route from API
    const fetchRoute = async () => {
      try {
        console.log('Calling planRoute with:', route);
        
        // Validate route data before calling planRoute
        if (!route.source || !route.destination) {
          console.error('Missing source or destination');
          throw new Error('Please enter both source and destination');
        }
        
        const routeResult = await planRoute(route);
        console.log('planRoute result:', routeResult);
        
        if (!routeResult) {
          console.error('planRoute returned null');
          throw new Error('Could not plan route');
        }
        
        const { sourceCoords, destCoords, routeData } = routeResult;
        console.log('Route coordinates:', { sourceCoords, destCoords, routeData });
        
        // Validate coordinates
        if (!sourceCoords || !destCoords || 
            isNaN(sourceCoords[0]) || isNaN(sourceCoords[1]) || 
            isNaN(destCoords[0]) || isNaN(destCoords[1])) {
          console.error('Invalid coordinates:', { sourceCoords, destCoords });
          throw new Error('Invalid location coordinates');
        }
        
        // Remove loading indicator
        map.removeControl(loadingControl);
        
        if (!routeData) {
          console.warn('Route data is null, showing error message');
          // Show error message if route planning failed
          const errorControl = L.control({ position: 'bottomleft' });
          errorControl.onAdd = function() {
            const div = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
            div.innerHTML = `<div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                              <span class="text-red-500 font-medium">Could not find a route between these locations</span>
                              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Try locations that are closer together or on the same continent.</p>
                            </div>`;
            return div;
          };
          errorControl.addTo(map);
          
          // Remove error message after 5 seconds
          setTimeout(() => map.removeControl(errorControl), 5000);
          
          // Add markers for source and destination even if route failed
          console.log('Adding route markers without route line');
          addRouteMarkers(sourceCoords, destCoords, route.source, route.destination, routeLayer);
          
          // Fit map to show both markers
          const bounds = L.latLngBounds([sourceCoords, destCoords]);
          map.fitBounds(bounds, { padding: [50, 50] });
          return;
        }
        
        const routePoints = routeData.coordinates;
        console.log(`Adding route with ${routePoints.length} points`);
        
        if (!routePoints || routePoints.length === 0) {
          console.error('Route points array is empty or undefined');
          throw new Error('Invalid route points');
        }
        
        // Add route line and markers
        console.log('Adding route line');
        const routeLine = addRouteLine(routePoints, route.vehicleType, routeLayer);
        console.log('Adding route markers');
        addRouteMarkers(sourceCoords, destCoords, route.source, route.destination, routeLayer);
        
        // Add route info
        console.log('Adding route info');
        addRouteInfo(routeData.distance, routeData.duration, route.vehicleType, map);
        
        // Fit map to show the entire route
        if (routePoints.length > 0) {
          console.log('Fitting map to route bounds');
          const bounds = L.latLngBounds(routePoints);
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      } catch (error) {
        console.error('Error fetching route:', error);
        map.removeControl(loadingControl);
        
        // Show error message
        const errorControl = L.control({ position: 'bottomleft' });
        errorControl.onAdd = function() {
          const div = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
          
          // Customize error message based on error type
          let errorMessage = error.message;
          let helpText = '';
          
          if (errorMessage.includes('source or destination')) {
            helpText = 'Please enter both starting point and destination.';
          } else if (errorMessage.includes('coordinates')) {
            helpText = 'Try entering more specific location names.';
          } else if (errorMessage.includes('timeout')) {
            helpText = 'The routing service is taking too long to respond. Please try again.';
          } else {
            helpText = 'Please try different locations or check your connection.';
          }
          
          div.innerHTML = `<div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                            <span class="text-red-500 font-medium">Error planning route: ${errorMessage}</span>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${helpText}</p>
                          </div>`;
          return div;
        };
        errorControl.addTo(map);
        
        // Remove error message after 7 seconds
        setTimeout(() => map.removeControl(errorControl), 7000);
      }
    };
    
    fetchRoute();
  }, [route?.source, route?.destination, route?.vehicleType, route?.avoidTraffic, isMapReady]); // Added individual route properties to dependencies

  // Add traffic indicators if enabled
  useEffect(() => {
    if (!mapRef.current || !routeLayerRef.current || !isMapReady || !showTraffic) return;
    
    const map = mapRef.current;
    const trafficLayer = L.layerGroup().addTo(map);
    
    // In a real app, you would fetch real-time traffic data
    // For this demo, we'll create simulated traffic points around the center
    const trafficPoints = [
      { position: [center[0] - 0.005, center[1] - 0.005], level: 'high' },
      { position: [center[0] + 0.005, center[1] + 0.005], level: 'medium' },
      { position: [center[0] - 0.008, center[1] + 0.008], level: 'low' },
      { position: [center[0] + 0.008, center[1] - 0.008], level: 'high' },
      { position: [center[0], center[1] + 0.01], level: 'medium' }
    ];

    trafficPoints.forEach(point => {
      let color;
      switch (point.level) {
        case 'high': color = 'red'; break;
        case 'medium': color = 'yellow'; break;
        case 'low': color = 'green'; break;
      }

      const trafficIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-6 h-6 rounded-full bg-${color}-500 text-white shadow-lg opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 12H2"></path>
                    <path d="M5 12V5"></path>
                    <path d="M19 12V5"></path>
                    <path d="M5 19v-7"></path>
                    <path d="M19 19v-7"></path>
                  </svg>
                </div>`,
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker(point.position as [number, number], { icon: trafficIcon })
        .bindPopup(`<b>Traffic:</b> ${point.level} congestion`)
        .addTo(trafficLayer);
    });
    
    // Add traffic legend
    const trafficLegend = L.control({ position: 'bottomright' });
    trafficLegend.onAdd = function() {
      const div = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
      div.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Traffic</h4>
          <div class="space-y-1">
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span class="text-xs">Heavy</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
              <span class="text-xs">Moderate</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span class="text-xs">Light</span>
            </div>
          </div>
        </div>`;
      return div;
    };
    trafficLegend.addTo(map);
    
    return () => {
      map.removeLayer(trafficLayer);
      map.removeControl(trafficLegend);
    };
  }, [center, isMapReady, showTraffic]);

  return <div ref={mapContainerRef} className={className} />;
};