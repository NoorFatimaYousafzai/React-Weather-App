import { useWeather } from '../contexts/WeatherContext';
import WeatherIcon from './WeatherIcon';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';

function Dashboard() {
    const { weather, loading, error, settings, setLocation, formatTemperature } = useWeather();

    const handleCurrentLocation = () => {
        if ("geolocation" in navigator) {
            // Show loading state while getting location
            const button = document.querySelector('#current-location-btn');
            if (button) button.disabled = true;

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;

                        const API_KEY = '4fff08fac8f8ec2043af413b2b4c4770';
                        const response = await fetch(
                            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
                        );

                        const data = await response.json();
                        if (data.length > 0) {
                            const locationName = `${data[0].name}, ${data[0].country}`;
                            setLocation(locationName);
                        }
                    } catch (err) {
                        console.error('Error getting location:', err);
                        alert('Failed to get current location. Please try again.');
                    } finally {
                        if (button) button.disabled = false;
                    }
                },
                (err) => {
                    console.error('Geolocation error:', err);
                    alert('Unable to access location. Please ensure location permissions are enabled.');
                    if (button) button.disabled = false;
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">Loading weather data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    if (!weather) return null;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 dark:text-gray-300">📍</span>
                            <h2 className="text-xl text-gray-800 dark:text-white">
                                {weather.location.name}, {weather.location.country}
                            </h2>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Updated {weather.lastUpdated}
                        </p>
                    </div>
                    <button
                        id="current-location-btn"
                        onClick={handleCurrentLocation}
                        className="text-blue-500 dark:text-blue-400 text-sm hover:text-blue-600 
                                 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed
                                 flex items-center gap-1"
                    >
                        <span>📍</span> Current Location
                    </button>
                </div>

                <div className="flex items-start mt-6">
                    <div className="flex items-center">
                        <div className="text-yellow-400 w-12 h-12">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <div className="text-6xl font-bold text-gray-900 dark:text-white">
                                {formatTemperature(weather.current.temp)}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 mt-1">
                                {weather.current.condition}
                            </div>
                        </div>
                    </div>

                    <div className="ml-auto flex gap-4">
                        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 w-40">
                            <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
                                <span>🌡️</span>
                                <span className="text-sm">Feels like</span>
                            </div>
                            <div className="text-xl mt-1 text-gray-900 dark:text-white">
                                {formatTemperature(weather.current.feels_like)}
                            </div>
                        </div>

                        {settings.showHumidity && (
                            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 w-40">
                                <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
                                    <span>💧</span>
                                    <span className="text-sm">Humidity</span>
                                </div>
                                <div className="text-xl mt-1 text-gray-900 dark:text-white">
                                    {weather.current.humidity}%
                                </div>
                            </div>
                        )}

                        {settings.showWindSpeed && (
                            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 w-40">
                                <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
                                    <span>💨</span>
                                    <span className="text-sm">Wind Speed</span>
                                </div>
                                <div className="text-xl mt-1 text-gray-900 dark:text-white">
                                    {weather.current.wind_speed} m/s
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <HourlyForecast data={weather.hourly} />
            </div>

            <div className="mt-6">
                <WeeklyForecast data={weather.daily} />
            </div>
        </div>
    );
}

export default Dashboard; 
