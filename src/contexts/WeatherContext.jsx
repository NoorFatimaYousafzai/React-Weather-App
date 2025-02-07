import { createContext, useState, useContext, useEffect } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('New York, US');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('weatherSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      temperatureUnit: 'celsius',
      theme: 'light',
      useCurrentLocation: false,
      showHumidity: true,
      showWindSpeed: true,
      weatherAlerts: false,
      dailyForecast: false,
    };
  });

  const API_KEY = '4fff08fac8f8ec2043af413b2b4c4770';

  // Temperature conversion helper
  const formatTemperature = (temp) => {
    if (settings.temperatureUnit === 'fahrenheit') {
      return `${Math.round((temp * 9 / 5) + 32)}°F`;
    }
    return `${Math.round(temp)}°C`;
  };

  // Fetch weather data
  const fetchWeather = async (searchLocation) => {
    try {
      setLoading(true);
      setError(null);

      // First, get coordinates
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&limit=1&appid=${API_KEY}`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.length) {
        throw new Error('Location not found');
      }

      const { lat, lon } = geoData[0];

      // Then, get weather data
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      // Process the weather data
      const processed = {
        current: {
          temp: weatherData.list[0].main.temp,
          feels_like: weatherData.list[0].main.feels_like,
          humidity: weatherData.list[0].main.humidity,
          wind_speed: weatherData.list[0].wind.speed,
          condition: weatherData.list[0].weather[0].main,
          description: weatherData.list[0].weather[0].description,
        },
        hourly: weatherData.list.slice(0, 6).map(hour => ({
          time: new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
          temp: hour.main.temp,
          condition: hour.weather[0].main.toLowerCase(),
        })),
        daily: weatherData.list.filter((item, index) => index % 8 === 0).map(day => ({
          day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: day.main.temp,
          condition: day.weather[0].main.toLowerCase(),
          description: day.weather[0].description,
        })),
        location: {
          name: geoData[0].name,
          country: geoData[0].country,
        },
        lastUpdated: new Date().toLocaleTimeString(),
      };

      setWeather(processed);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Initial fetch and 30-minute interval
  useEffect(() => {
    fetchWeather(location);

    const interval = setInterval(() => {
      fetchWeather(location);
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [location]);

  // Handle geolocation if enabled
  useEffect(() => {
    if (settings.useCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const reverseGeoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            const response = await fetch(reverseGeoUrl);
            const data = await response.json();
            if (data.length > 0) {
              setLocation(`${data[0].name}, ${data[0].country}`);
            }
          } catch (err) {
            setError('Failed to get current location');
          }
        },
        (err) => {
          setError('Geolocation permission denied');
        }
      );
    }
  }, [settings.useCurrentLocation]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        location,
        setLocation,
        loading,
        error,
        settings,
        setSettings,
        formatTemperature,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);