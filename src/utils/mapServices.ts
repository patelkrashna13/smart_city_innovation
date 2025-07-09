import { RouteInfo } from '../components/maps/RouteSelector';

// Fallback coordinates for common cities
const CITY_COORDINATES: Record<string, [number, number]> = {
  'delhi': [28.6139, 77.2090],
  'mumbai': [19.0760, 72.8777],
  'bangalore': [12.9716, 77.5946],
  'hyderabad': [17.3850, 78.4867],
  'chennai': [13.0827, 80.2707],
  'kolkata': [22.5726, 88.3639],
  'ahmedabad': [23.0225, 72.5714],
  'pune': [18.5204, 73.8567],
  'jaipur': [26.9124, 75.7873],
  'lucknow': [26.8467, 80.9462],
  'new york': [40.7128, -74.0060],
  'london': [51.5074, -0.1278],
  'tokyo': [35.6762, 139.6503],
  'paris': [48.8566, 2.3522],
  'berlin': [52.5200, 13.4050],
  'rome': [41.9028, 12.4964],
  'beijing': [39.9042, 116.4074],
  'sydney': [-33.8688, 151.2093],
  'rio de janeiro': [-22.9068, -43.1729],
  'cairo': [30.0444, 31.2357]
};

// Types for API responses
interface NominatimResponse {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  // Other properties omitted for brevity
}

interface OSRMRouteResponse {
  code: string;
  routes: {
    geometry: {
      coordinates: [number, number][];
      type: string;
    };
    legs: any[];
    distance: number;
    duration: number;
    weight: number;
  }[];
  waypoints: any[];
}

interface GeocodingResult {
  lat: number;
  lon: number;
  display_name: string;
}

interface RouteResult {
  coordinates: [number, number][];
  distance: number;
  duration: number;
}

/**
 * Get location suggestions as user types
 */
export const getLocationSuggestions = async (query: string): Promise<GeocodingResult[]> => {
  if (!query || query.length < 3) return [];
  
  // First, check for matches in our fallback data
  const normalizedQuery = query.trim().toLowerCase();
  const fallbackMatches: GeocodingResult[] = [];
  
  for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
    if (city.includes(normalizedQuery)) {
      fallbackMatches.push({
        lat: coords[0],
        lon: coords[1],
        display_name: city.charAt(0).toUpperCase() + city.slice(1)
      });
    }
  }
  
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=5&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9',
          'User-Agent': 'SmartCityDashboard/1.0'
        },
        mode: 'cors'
      }
    );
    
    if (!response.ok) {
      throw new Error(`Location search failed with status: ${response.status}`);
    }
    
    const data: NominatimResponse[] = await response.json();
    
    const apiResults = data.map(item => ({
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      display_name: item.display_name
    }));
    
    // Combine API results with fallback matches, removing duplicates
    const combinedResults = [...apiResults];
    
    // Only add fallback matches that don't overlap with API results
    for (const fallbackMatch of fallbackMatches) {
      const isDuplicate = apiResults.some(apiResult => 
        Math.abs(apiResult.lat - fallbackMatch.lat) < 0.01 && 
        Math.abs(apiResult.lon - fallbackMatch.lon) < 0.01
      );
      
      if (!isDuplicate) {
        combinedResults.push(fallbackMatch);
      }
    }
    
    return combinedResults.slice(0, 5); // Limit to 5 results
  } catch (error) {
    console.error('Error getting location suggestions:', error);
    return fallbackMatches.slice(0, 5); // Return fallback matches if API fails
  }
};

/**
 * Geocode a location string to coordinates using Nominatim
 */
export const geocodeLocation = async (query: string): Promise<GeocodingResult | null> => {
  try {
    console.log('Geocoding location:', query);
    
    // Check for fallback coordinates first
    const normalizedQuery = query.trim().toLowerCase();
    for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
      if (normalizedQuery.includes(city)) {
        console.log(`Using fallback coordinates for ${city}:`, coords);
        return {
          lat: coords[0],
          lon: coords[1],
          display_name: query
        };
      }
    }
    
    const encodedQuery = encodeURIComponent(query);
    // Use a CORS proxy to avoid CORS issues
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=1`;
    
    console.log('Nominatim API URL:', url);
    
    const response = await fetch(
      url,
      {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9',
          'User-Agent': 'SmartCityDashboard/1.0'
        },
        mode: 'cors' // Explicitly set CORS mode
      }
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding failed with status: ${response.status}`);
    }
    
    const data: NominatimResponse[] = await response.json();
    console.log('Nominatim response data:', data);
    
    if (data.length === 0) {
      console.warn('No geocoding results found for query:', query);
      
      // Try to find a partial match in our fallback data
      for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
        if (normalizedQuery.includes(city) || city.includes(normalizedQuery)) {
          console.log(`Using fallback coordinates for partial match ${city}:`, coords);
          return {
            lat: coords[0],
            lon: coords[1],
            display_name: city.charAt(0).toUpperCase() + city.slice(1)
          };
        }
      }
      
      return null;
    }
    
    const result = {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      display_name: data[0].display_name
    };
    
    console.log('Geocoding result:', result);
    return result;
  } catch (error) {
    console.error('Error geocoding location:', error);
    
    // Try fallback coordinates as a last resort
    const normalizedQuery = query.trim().toLowerCase();
    for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
      if (normalizedQuery.includes(city) || city.includes(normalizedQuery)) {
        console.log(`Using fallback coordinates after error for ${city}:`, coords);
        return {
          lat: coords[0],
          lon: coords[1],
          display_name: city.charAt(0).toUpperCase() + city.slice(1)
        };
      }
    }
    
    return null;
  }
};

/**
 * Get route between two points using OSRM
 */
export const getRoute = async (
  startCoords: [number, number],
  endCoords: [number, number],
  options: { avoidTraffic?: boolean; vehicleType?: string } = {}
): Promise<RouteResult | null> => {
  try {
    console.log('Getting route between coordinates:', { startCoords, endCoords, options });
    
    // Validate coordinates
    if (!startCoords || !endCoords || 
        startCoords.length !== 2 || endCoords.length !== 2 ||
        isNaN(startCoords[0]) || isNaN(startCoords[1]) ||
        isNaN(endCoords[0]) || isNaN(endCoords[1])) {
      console.error('Invalid coordinates provided:', { startCoords, endCoords });
      throw new Error('Invalid coordinates provided for routing');
    }
    
    // Check if coordinates are too far apart (rough check for cross-continental routes)
    const distance = calculateDistance(startCoords, endCoords);
    if (distance > 5000000) { // 5000 km
      console.warn('Coordinates are very far apart:', distance, 'meters');
      // We'll still try, but log a warning
    }
    
    // Determine the profile based on vehicle type
    let profile = 'driving';
    switch (options.vehicleType) {
      case 'car':
        profile = 'driving';
        break;
      case 'bike':
        profile = 'cycling';
        break;
      case 'walk':
        profile = 'walking';
        break;
      case 'bus':
        profile = 'driving'; // Use driving for bus as OSRM doesn't have a bus profile
        break;
      default:
        console.log('Using default profile (driving) for vehicle type:', options.vehicleType);
    }
    
    // Format coordinates as lon,lat (OSRM expects this order)
    const start = `${startCoords[1]},${startCoords[0]}`;
    const end = `${endCoords[1]},${endCoords[0]}`;
    
    console.log('Formatted coordinates for OSRM:', { start, end, profile });
    
    // Build URL with alternatives if avoiding traffic
    const alternativesParam = options.avoidTraffic ? '&alternatives=true' : '';
    const url = `https://router.project-osrm.org/route/v1/${profile}/${start};${end}?overview=full&geometries=geojson${alternativesParam}`;
    
    console.log('OSRM API URL:', url);
    
    // Try with a timeout to avoid hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
      const response = await fetch(url, {
        mode: 'cors', // Explicitly set CORS mode
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'SmartCityDashboard/1.0'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error(`Routing failed with status: ${response.status}`);
        throw new Error(`Routing failed with status: ${response.status}`);
      }
      
      const data: OSRMRouteResponse = await response.json();
      console.log('OSRM API response:', data);
      
      if (data.code !== 'Ok') {
        console.error('OSRM returned non-OK code:', data.code, data.message);
        return null;
      }
      
      if (data.routes.length === 0) {
        console.error('OSRM returned no routes');
        return null;
      }
      
      // If avoiding traffic and we have alternatives, choose the route with less traffic
      // In a real app, you would have traffic data to make this decision
      // Here we'll just pick the fastest route (lowest duration)
      let selectedRoute = data.routes[0];
      if (options.avoidTraffic && data.routes.length > 1) {
        console.log(`Found ${data.routes.length} alternative routes, selecting fastest one`);
        selectedRoute = data.routes.reduce((prev, current) => {
          return prev.duration < current.duration ? prev : current;
        });
      }
      
      // Ensure the route has geometry
      if (!selectedRoute.geometry || !selectedRoute.geometry.coordinates || selectedRoute.geometry.coordinates.length === 0) {
        console.error('Selected route has no geometry or coordinates');
        return null;
      }
      
      // Convert GeoJSON coordinates to [lat, lon] format for Leaflet
      const coordinates = selectedRoute.geometry.coordinates.map(
        coord => [coord[1], coord[0]] as [number, number]
      );
      
      console.log(`Route found with ${coordinates.length} points, distance: ${selectedRoute.distance}m, duration: ${selectedRoute.duration}s`);
      
      return {
        coordinates,
        distance: selectedRoute.distance,
        duration: selectedRoute.duration
      };
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('OSRM API request timed out');
        throw new Error('Routing request timed out');
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Error getting route:', error);
    
    // Try a fallback approach - direct line between points
    console.log('Using fallback direct line between points');
    return {
      coordinates: [startCoords, endCoords],
      distance: calculateDistance(startCoords, endCoords),
      duration: calculateDistance(startCoords, endCoords) / 10 // Rough estimate: 10 m/s
    };
  }
};

/**
 * Calculate distance between two points in meters (Haversine formula)
 */
const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = point1[0] * Math.PI / 180;
  const φ2 = point2[0] * Math.PI / 180;
  const Δφ = (point2[0] - point1[0]) * Math.PI / 180;
  const Δλ = (point2[1] - point1[1]) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distance in meters
};

/**
 * Get map tile URL based on theme and map type
 */
export const getMapTileUrl = (isDarkMode: boolean, mapType: string = 'standard'): string => {
  if (mapType === 'satellite') {
    return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  }
  
  return isDarkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
};

/**
 * Get user's current location
 */
export const getCurrentLocation = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      // Default to center of India if geolocation is not available
      console.warn('Geolocation not supported by this browser');
      resolve([20.5937, 78.9629]); // Center of India
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Current location:', latitude, longitude);
        resolve([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting current location:', error);
        // Default to center of India if there's an error
        resolve([20.5937, 78.9629]); // Center of India
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
};

/**
 * Get custom marker icons
 */
export const getMarkerIcons = () => {
  return {
    defaultIcon: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
  };
};

/**
 * Plan a route between source and destination
 */
export const planRoute = async (routeInfo: RouteInfo): Promise<{
  sourceCoords: [number, number];
  destCoords: [number, number];
  routeData: RouteResult | null;
} | null> => {
  try {
    console.log('Planning route with info:', routeInfo);
    
    if (!routeInfo.source || !routeInfo.destination) {
      console.error('Source or destination is empty', { source: routeInfo.source, destination: routeInfo.destination });
      throw new Error('Source or destination is empty');
    }
    
    // Check if source and destination are the same
    if (routeInfo.source.trim().toLowerCase() === routeInfo.destination.trim().toLowerCase()) {
      console.warn('Source and destination are the same');
      throw new Error('Source and destination cannot be the same location');
    }
    
    // Geocode source and destination
    console.log('Geocoding source:', routeInfo.source);
    const sourceResult = await geocodeLocation(routeInfo.source);
    console.log('Source geocoding result:', sourceResult);
    
    console.log('Geocoding destination:', routeInfo.destination);
    const destResult = await geocodeLocation(routeInfo.destination);
    console.log('Destination geocoding result:', destResult);
    
    if (!sourceResult) {
      console.error('Could not geocode source location:', routeInfo.source);
      throw new Error(`Could not find location: ${routeInfo.source}`);
    }
    
    if (!destResult) {
      console.error('Could not geocode destination location:', routeInfo.destination);
      throw new Error(`Could not find location: ${routeInfo.destination}`);
    }
    
    const sourceCoords: [number, number] = [sourceResult.lat, sourceResult.lon];
    const destCoords: [number, number] = [destResult.lat, destResult.lon];
    
    console.log('Coordinates for routing:', { 
      source: { coords: sourceCoords, original: routeInfo.source },
      destination: { coords: destCoords, original: routeInfo.destination }
    });
    
    // Check if coordinates are valid numbers
    if (isNaN(sourceCoords[0]) || isNaN(sourceCoords[1]) || 
        isNaN(destCoords[0]) || isNaN(destCoords[1])) {
      console.error('Invalid coordinates detected:', { sourceCoords, destCoords });
      throw new Error('Invalid coordinates detected for one or both locations');
    }
    
    // Check if coordinates are within reasonable bounds
    if (Math.abs(sourceCoords[0]) > 90 || Math.abs(sourceCoords[1]) > 180 ||
        Math.abs(destCoords[0]) > 90 || Math.abs(destCoords[1]) > 180) {
      console.error('Coordinates out of bounds:', { sourceCoords, destCoords });
      throw new Error('Location coordinates are out of valid range');
    }
    
    // Get route between the coordinates
    console.log('Calling getRoute with:', { 
      sourceCoords, 
      destCoords, 
      avoidTraffic: routeInfo.avoidTraffic, 
      vehicleType: routeInfo.vehicleType 
    });
    
    const routeData = await getRoute(sourceCoords, destCoords, {
      avoidTraffic: routeInfo.avoidTraffic,
      vehicleType: routeInfo.vehicleType
    });
    
    console.log('Route data result:', routeData);
    
    if (!routeData) {
      console.error('Failed to get route data between coordinates');
      // Instead of returning null routeData, throw an error to be caught and displayed
      throw new Error('Could not calculate a route between these locations');
    }
    
    // Check if the route has enough points
    if (routeData.coordinates.length < 2) {
      console.error('Route has insufficient points:', routeData.coordinates.length);
      throw new Error('Route calculation failed - insufficient route points');
    }
    
    return {
      sourceCoords,
      destCoords,
      routeData
    };
  } catch (error) {
    console.error('Error planning route:', error);
    return null;
  }
};