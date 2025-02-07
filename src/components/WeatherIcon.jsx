import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

const WeatherIcon = ({ condition, size = "medium" }) => {
  const sizeClasses = {
    tiny: "w-4 h-4",      // 16px - for weekly forecast
    small: "w-5 h-5",     // 20px - for hourly forecast
    medium: "w-8 h-8",    // 32px - for general use
    large: "w-12 h-12"    // 48px - for main temperature display
  };

  const iconClass = `${sizeClasses[size]} text-yellow-400`;

  return (
    <div className={iconClass}>
      {/* Your SVG icons */}
      {condition === 'sunny' && (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/>
          <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      )}
      {condition === 'cloudy' && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
          <path d="M3 15h.17C3.58 15 4 15.42 4 16v.17C4 17.73 5.27 19 6.83 19h10.34c1.56 0 2.83-1.27 2.83-2.83V16c0-.58.42-1 1-1h.17c1.56 0 2.83-1.27 2.83-2.83V12c0-.58-.42-1-1-1h-.17C21.27 11 20 9.73 20 8.17V8c0-.58-.42-1-1-1h-.17C17.27 7 16 5.73 16 4.17V4c0-.58-.42-1-1-1h-.17C13.27 3 12 1.73 12 .17V0c0-.58-.42-1-1-1h-.17C9.27-1 8-.27 8 1.17V2c0 .58-.42 1-1 1h-.17C5.27 3 4 4.27 4 5.83V6c0 .58-.42 1-1 1h-.17C1.27 7 0 8.27 0 9.83V10c0 .58.42 1 1 1h.17C2.73 11 4 12.27 4 13.83V14c0 .58-.42 1-1 1z"/>
        </svg>
      )}
      {condition === 'rain' && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
          <path d="M20.42 8.58a5 5 0 0 0-7.65-6.49 8 8 0 1 0-9.27 11.82A5 5 0 0 0 7 20h11a5 5 0 0 0 2.42-9.42zM12 19v3M8 19v3M16 19v3"/>
        </svg>
      )}
      {condition === 'windy' && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
          <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
        </svg>
      )}
    </div>
  );
};

export default WeatherIcon;

