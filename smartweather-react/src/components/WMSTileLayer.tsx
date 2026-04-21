import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface WMSTileLayerProps {
  url: string;
  layers: string;
  format?: string;
  transparent?: boolean;
  opacity?: number;
  version?: string;
  attribution?: string;
}

export function WMSTileLayer({
  url,
  layers,
  format = 'image/png',
  transparent = true,
  opacity = 0.7,
  version = '1.1.1',
  attribution = '',
}: WMSTileLayerProps) {
  const map = useMap();

  useEffect(() => {
    const wmsLayer = L.tileLayer.wms(url, {
      layers,
      format,
      transparent,
      opacity,
      version,
      attribution,
      uppercase: true,
      maxZoom: 20,
      tileSize: 512,
      updateWhenZooming: false,
      updateWhenIdle: true,
      keepBuffer: 4,
    });

    wmsLayer.addTo(map);

    return () => {
      map.removeLayer(wmsLayer);
    };
  }, [map, url, layers, format, transparent, opacity, version, attribution]);

  return null;
}
