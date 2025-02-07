import WeatherIcon from './WeatherIcon';
import { useWeather } from '../contexts/WeatherContext';

function WeeklyForecast() {
  const { formatTemperature } = useWeather();
  const weeklyData = [
    { day: 'Today', temp: 24, condition: 'sunny', description: 'Sunny' },
    { day: 'Mon', temp: 22, condition: 'cloudy', description: 'Cloudy' },
    { day: 'Tue', temp: 19, condition: 'rain', description: 'Rain' },
    { day: 'Wed', temp: 25, condition: 'sunny', description: 'Sunny' },
    { day: 'Thu', temp: 23, condition: 'windy', description: 'Windy' },
    { day: 'Fri', temp: 21, condition: 'cloudy', description: 'Cloudy' },
    { day: 'Sat', temp: 24, condition: 'sunny', description: 'Sunny' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">7-Day Forecast</h2>
      <div className="space-y-4">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="w-24 text-gray-600 dark:text-gray-400">{day.day}</span>
            <div className="flex items-center flex-1 justify-center">
              <WeatherIcon condition={day.condition} size="small" />
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                {day.description}
              </span>
            </div>
            <span className="w-24 text-right font-medium dark:text-white">
              {formatTemperature(day.temp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyForecast; 