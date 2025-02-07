import WeatherIcon from './WeatherIcon';
import { useWeather } from '../contexts/WeatherContext';

function HourlyForecast() {
  const { formatTemperature } = useWeather();
  const hourlyData = [
    { time: '1:00', temp: 24, condition: 'sunny' },
    { time: '2:00', temp: 24, condition: 'sunny' },
    { time: '3:00', temp: 24, condition: 'sunny' },
    { time: '4:00', temp: 24, condition: 'sunny' },
    { time: '5:00', temp: 24, condition: 'sunny' },
    { time: '6:00', temp: 24, condition: 'sunny' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Hourly Forecast</h2>
      <div className="grid grid-cols-6 gap-4">
        {hourlyData.map((hour, index) => (
          <div key={index} className="text-center">
            <div className="text-gray-600 dark:text-gray-400 mb-2">{hour.time}</div>
            <WeatherIcon condition={hour.condition} size="small" />
            <div className="mt-2 font-medium dark:text-white">
              {formatTemperature(hour.temp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast; 