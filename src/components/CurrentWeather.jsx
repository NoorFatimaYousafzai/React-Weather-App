import { createContext, useState, useContext, useEffect } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('New York, US');
  const [settings, setSettings] = useState(() => ({
    temperatureUnit: 'celsius',
    theme: 'light',
    useCurrentLocation: false,
    showHumidity: true,
    showWindSpeed: true,
    weatherAlerts: false,
    dailyForecast: false,
  }));

  useEffect(() => {
    // Fetch weather data every 30 minutes
    const fetchWeather = async () => {
      // Implement OpenWeatherMap API call
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location]);

  return (
    <WeatherContext.Provider value={{ weather, location, settings, setSettings }}>
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);

