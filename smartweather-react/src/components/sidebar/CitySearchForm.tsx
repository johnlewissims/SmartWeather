import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context';
import { useWeatherData } from '../../hooks';
import { searchCities, GeocodingResult } from '../../services';
import { Input, Spinner } from '../ui';

export function CitySearchForm() {
  const { state, dispatch } = useAppState();
  const { fetchWeatherForCity } = useWeatherData();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      const cities = await searchCities(query);
      setResults(cities);
      setShowResults(true);
      setLoading(false);
    };

    const debounce = setTimeout(performSearch, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelectCity = async (city: GeocodingResult) => {
    setQuery('');
    setResults([]);
    setShowResults(false);

    await fetchWeatherForCity(
      city.name,
      city.country,
      city.lat,
      city.lon,
      city.timezone || 'UTC'
    );
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Spinner size="sm" />
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-sw-surface border border-sw-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {results.map((city, index) => (
            <button
              key={`${city.name}-${city.country}-${index}`}
              onClick={() => handleSelectCity(city)}
              className="w-full px-4 py-2 text-left hover:bg-sw-bg transition-colors border-b border-sw-border last:border-b-0"
            >
              <div className="text-sw-text font-medium">{city.name}</div>
              <div className="text-sw-muted text-sm">
                {city.state ? `${city.state}, ` : ''}{city.country}
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && !loading && query.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-sw-surface border border-sw-border rounded-lg shadow-lg z-50 px-4 py-3 text-sw-muted text-sm">
          No cities found
        </div>
      )}
    </div>
  );
}
