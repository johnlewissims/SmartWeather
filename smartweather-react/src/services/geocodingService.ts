import axios from 'axios';

export interface GeocodingResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  timezone?: string;
}

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const response = await axios.get(GEOCODING_API, {
      params: {
        name: query.trim(),
        count: 10,
        language: 'en',
        format: 'json',
      },
    });

    if (!response.data || !response.data.results) {
      return [];
    }

    return response.data.results.map((result: any) => ({
      name: result.name,
      country: result.country_code || result.country || 'Unknown',
      state: result.admin1 || undefined,
      lat: result.latitude,
      lon: result.longitude,
      timezone: result.timezone || undefined,
    }));
  } catch (error) {
    console.error('Geocoding search failed:', error);
    return [];
  }
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeocodingResult | null> {
  try {
    // Open-Meteo doesn't have reverse geocoding, so we'll use a nearby search
    const response = await axios.get(GEOCODING_API, {
      params: {
        name: `${lat.toFixed(2)},${lon.toFixed(2)}`,
        count: 1,
        language: 'en',
        format: 'json',
      },
    });

    if (!response.data || !response.data.results || response.data.results.length === 0) {
      return null;
    }

    const result = response.data.results[0];
    return {
      name: result.name,
      country: result.country_code || result.country || 'Unknown',
      state: result.admin1 || undefined,
      lat: result.latitude,
      lon: result.longitude,
      timezone: result.timezone || undefined,
    };
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return null;
  }
}
