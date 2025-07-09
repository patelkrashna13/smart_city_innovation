import React, { useState } from 'react';
import { LeafletMap } from '../components/maps/LeafletMap';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

const MapDemo = () => {
  // Center of India
  const indiaCenter: [number, number] = [20.5937, 78.9629];
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Interactive Map</h1>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="satellite-view" 
            checked={mapType === 'satellite'}
            onCheckedChange={(checked) => setMapType(checked ? 'satellite' : 'standard')}
          />
          <Label htmlFor="satellite-view">Satellite View</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="current-location" 
            checked={showCurrentLocation}
            onCheckedChange={setShowCurrentLocation}
          />
          <Label htmlFor="current-location">Show Current Location</Label>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden shadow-lg">
        <LeafletMap 
          center={indiaCenter}
          zoom={5}
          className="h-[600px] w-full"
          mapType={mapType}
          showCurrentLocation={showCurrentLocation}
        />
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Toggle the switches above to change map view and show your current location.</p>
        <p>The map is centered on India by default.</p>
      </div>
    </div>
  );
};

export default MapDemo;