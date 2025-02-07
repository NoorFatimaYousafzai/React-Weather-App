import React, { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import ForecastCard from './ForecastCard';

const Forecast = () => {
  const { forecast, loading, error } = useContext(WeatherContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!forecast) return null;

  // Group forecast data by day
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});

  return (
    <div className="grid gap-4">
      <h1 className="font-semibold text-3xl">7-Day Forecast</h1>
      <div className="grid gap-4">
        {Object.values(dailyForecast).map((item, index) => (
          <ForecastCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Forecast;

