import React, { useState } from "react";
import { getCityWeather } from "../data/ApiCall"; 
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import Page1 from "./Page1";
import Page2 from "./Page2";
import { getRandomUrl } from "../data/BackgroundImg";

const WeatherApp = () => {
  const [city, setCity] = useState("New York");
  const [weatherData, setWeatherData] = useState(null);
  const [isCrossButtonVisible, setCrossButtonVisible] = useState(true);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(getRandomUrl());

  const toggleButtons = () => {
    setCrossButtonVisible(!isCrossButtonVisible);
    setSearchVisible(false);
  };

  const toggleSearchVisibility = async () => {
    setSearchVisible(!isSearchVisible);
    try {
      const data = await getCityWeather(city);
      setWeatherData(data);
      if (data && data.list && data.list.length > 0) {
        setBackgroundImageUrl(getRandomUrl());
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      <div>
        {isCrossButtonVisible ? (
          <div
            className=" w-screen h-screen"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          >
            <div className="flex justify-between items-center mx-auto px-6 pt-8">
              <button className="text-white text-3xl" onClick={toggleButtons}>
                <RxCross1 />
              </button>
              <div className="w-16 h-8 bg-red-500 rounded-md items-center flex justify-center">
                <p className="text-white text-xs ">LIVE</p>
              </div>
            </div>
            <div className="h-screen bg-cover">
              <Page1 weatherData={weatherData} />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between justify-items-center mx-auto px-6 mt-8 relative">
              <button onClick={toggleButtons}>
                <HiOutlineMenuAlt2 />
              </button>
              {isSearchVisible && (
                <div>
                  <input
                    type="text"
                    id="cityInput"
                    className="w-64 h-10 rounded-lg bg-gray-200 text-lg text-center focus:outline-none"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              )}
              <button onClick={toggleSearchVisibility}>
                <IoSearch />
              </button>
            </div>
            <div></div>
            <div>
              <Page2
                weatherData={weatherData}
                backgroundImageUrl={backgroundImageUrl}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
