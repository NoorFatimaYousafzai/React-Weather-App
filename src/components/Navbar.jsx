import { Link } from 'react-router-dom';
import { Settings, Search } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';

function Navbar() {
  const { setLocation } = useWeather();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setLocation(e.target.value);
      e.target.value = ''; // Clear the input after search
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-yellow-500 w-5 h-5">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/>
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </span>
            <span className="font-semibold text-xl text-gray-900 dark:text-white">WeatherScope</span>
          </Link>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a city..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white
                         dark:placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500"
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/settings"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Settings className="h-6 w-6" />
            </Link>
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-300">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 