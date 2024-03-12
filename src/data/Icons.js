import React from 'react'
import { WiDaySunny, WiNightClear, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

export const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
        return <WiDaySunny />;
      case '01n':
        return <WiNightClear />;
      case '02d':
      case '02n':
        return <WiCloudy />;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <WiCloudy />;
      case '09d':
      case '09n':
        return <WiRain />;
      case '10d':
      case '10n':
        return <WiRain />;
      case '11d':
      case '11n':
        return <WiThunderstorm />;
      case '13d':
      case '13n':
        return <WiSnow />;
      default:
        return null;
    }
  };

