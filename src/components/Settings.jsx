import { useWeather } from '../contexts/WeatherContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Settings as SettingsIcon, Bell } from 'lucide-react';
import { useEffect } from 'react';

function Settings() {
  const { settings, setSettings } = useWeather();

  const handleThemeChange = (theme) => {
    setSettings({ ...settings, theme });
    
    // Handle theme change immediately
    if (theme === 'auto') {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  };

  const handleToggleChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('weatherSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const handleTemperatureUnitChange = (unit) => {
    setSettings(prev => ({
      ...prev,
      temperatureUnit: unit
    }));
  };

  // Add effect to handle auto theme
  useEffect(() => {
    if (settings.theme === 'auto') {
      // Add system theme preference listener
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        document.documentElement.classList.toggle('dark', e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      // Set initial value
      document.documentElement.classList.toggle('dark', mediaQuery.matches);

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.theme]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your preferences and account settings</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Location Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Location Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-white mb-2">Default City</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600"
                value="New York, US"
                onChange={(e) => setSettings({...settings, defaultCity: e.target.value})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-700 dark:text-white">Use Current Location</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Automatically detect your location</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.useCurrentLocation}
                  onChange={(e) => setSettings({...settings, useCurrentLocation: e.target.checked})}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Display Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <SettingsIcon className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Display Preferences</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-white mb-3">Temperature Unit</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                    settings.temperatureUnit === 'celsius' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white'
                  }`}
                  onClick={() => handleTemperatureUnitChange('celsius')}
                >
                  🌡️ Celsius (°C)
                </button>
                <button
                  type="button"
                  className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                    settings.temperatureUnit === 'fahrenheit' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white'
                  }`}
                  onClick={() => handleTemperatureUnitChange('fahrenheit')}
                >
                  🌡️ Fahrenheit (°F)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-white mb-3">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                    settings.theme === 'light' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white'
                  }`}
                  onClick={() => handleThemeChange('light')}
                >
                  ☀️ Light
                </button>
                <button
                  type="button"
                  className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                    settings.theme === 'dark' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white'
                  }`}
                  onClick={() => handleThemeChange('dark')}
                >
                  🌙 Dark
                </button>
                <button
                  type="button"
                  className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                    settings.theme === 'auto' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white'
                  }`}
                  onClick={() => handleThemeChange('auto')}
                >
                  ⚙️ Auto
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>💧</span>
                  <span className="text-gray-700 dark:text-white">Humidity</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.showHumidity}
                    onChange={() => handleToggleChange('showHumidity')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>💨</span>
                  <span className="text-gray-700 dark:text-white">Wind Speed</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.showWindSpeed}
                    onChange={() => handleToggleChange('showWindSpeed')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notification Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-700 dark:text-white">Weather Alerts</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Receive notifications for severe weather</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-700 dark:text-white">Daily Forecast</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Get daily weather updates</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;

