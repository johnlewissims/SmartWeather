import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAppState } from '../context';
import { Card, Button } from '../components/ui';
import { WMSTileLayer } from '../components/WMSTileLayer';
import { RADAR_LEGENDS } from '../utils/constants';
import 'leaflet/dist/leaflet.css';

export function RadarView() {
  const { state, dispatch } = useAppState();
  const [radarTimestamp, setRadarTimestamp] = useState<number | null>(null);

  // Fetch the latest RainViewer radar timestamp
  useEffect(() => {
    const fetchRadarTimestamp = async () => {
      try {
        const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
        const data = await response.json();
        if (data && data.radar && data.radar.past && data.radar.past.length > 0) {
          // Get the most recent timestamp
          const latest = data.radar.past[data.radar.past.length - 1];
          setRadarTimestamp(latest.time);
        }
      } catch (error) {
        console.error('Failed to fetch radar timestamp:', error);
      }
    };

    fetchRadarTimestamp();
    // Refresh every 10 minutes
    const interval = setInterval(fetchRadarTimestamp, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!state.city) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center text-sw-muted">
          <p className="text-4xl mb-2">🗺️</p>
          <p>No city selected</p>
        </div>
      </div>
    );
  }

  const { city } = state;
  const legendStops = RADAR_LEGENDS[state.radarLayer] || [];
  const legendTitle = legendStops[0]?.title || state.radarLayer.charAt(0).toUpperCase() + state.radarLayer.slice(1);

  const handleLayerChange = (layer: 'reflectivity' | 'satellite' | 'temperature') => {
    dispatch({ type: 'SET_RADAR_LAYER', payload: layer });
  };

  const handleOpacityChange = (opacity: number) => {
    dispatch({ type: 'SET_RADAR_OPACITY', payload: opacity });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-sw-border">
        <h1 className="text-3xl font-bold text-sw-text mb-4">Weather Radar</h1>

        {/* Layer Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={state.radarLayer === 'reflectivity' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleLayerChange('reflectivity')}
          >
            Reflectivity
          </Button>
          <Button
            variant={state.radarLayer === 'satellite' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleLayerChange('satellite')}
          >
            Satellite
          </Button>
          <Button
            variant={state.radarLayer === 'temperature' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleLayerChange('temperature')}
          >
            Temperature
          </Button>
        </div>

        {/* Opacity Control */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-sw-muted">Opacity:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={state.radarOpacity}
            onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
            className="flex-1 max-w-xs"
          />
          <span className="text-sm text-sw-text">{Math.round(state.radarOpacity * 100)}%</span>
        </div>

        {state.radarLayer === 'temperature' && !radarTimestamp && (
          <p className="text-xs text-sw-muted mt-2">Loading coverage data...</p>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[city.lat, city.lon]}
          zoom={8}
          minZoom={3}
          maxZoom={15}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          {/* Base map layer */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* Weather overlay layer */}
          {state.radarLayer === 'reflectivity' && (
            <WMSTileLayer
              url="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi"
              layers="nexrad-n0r-900913"
              format="image/png"
              transparent={true}
              opacity={state.radarOpacity}
              version="1.1.1"
              attribution="NOAA/NEXRAD"
            />
          )}

          {state.radarLayer === 'satellite' && (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              opacity={state.radarOpacity}
              attribution="ESRI"
            />
          )}

          {state.radarLayer === 'temperature' && radarTimestamp && (
            <TileLayer
              url={`https://tilecache.rainviewer.com/v2/coverage/${radarTimestamp}/256/{z}/{x}/{y}/0/0_0.png`}
              opacity={state.radarOpacity}
              attribution="RainViewer"
            />
          )}

          {/* Location marker */}
          <Marker position={[city.lat, city.lon]}>
            <Popup>
              <div className="text-center">
                <strong>{city.name}</strong>
                <br />
                {Math.round(city.temp)}°{state.units === 'Imperial' ? 'F' : 'C'}
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Legend */}
        <Card className="absolute bottom-4 right-4 z-10 max-w-xs" padding="sm">
          <h3 className="text-sm font-semibold text-sw-text mb-2">{legendTitle}</h3>
          <div className="space-y-1">
            {legendStops.map((stop, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: stop.color }}
                />
                <span className="text-sw-muted">{stop.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
