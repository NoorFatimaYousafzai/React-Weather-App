import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './contexts/WeatherContext';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Navbar from './components/Navbar';

function App() {
  return (
    <WeatherProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </WeatherProvider>
  );
}

export default App;

