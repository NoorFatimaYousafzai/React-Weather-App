import React from 'react';
import WeatherIcon from './WeatherIcon';
import { Droplets, Wind } from 'lucide-react';

const ForecastCard = ({ data }) => {
  const date = new Date(data.dt * 1000);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{date.toLocaleDateString('en-US', { weekday: 'long' })}</h3>
        <p>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <WeatherIcon condition={data.weather[0].main} size={48} />
        <div>
          <p className="text-3xl font-bold">{Math.round(data.main.temp)}°</p>
          <p>{data.weather[0].description}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4" />
          <span>Humidity: {data.main.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4" />
          <span>Wind: {Math.round(data.wind.speed)} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;

