import React, { useState } from "react";
import { getWeatherIcon } from "../data/Icons";
import { formatDate } from "../data/Date";
import TemperatureChart from "../data/Chart";

const Page2 = ({ weatherData, backgroundImageUrl }) => {
  const [selectedRange, setSelectedRange] = useState("lastMonth");

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-screen pt-8">
      {weatherData ? (
        <div>
          <div className="flex justify-between mx-auto px-6">
            <div className="space-y-2">
              <p className="text-3xl font-semibold">{weatherData.city.name},</p>
              <p className="text-3xl font-semibold">
                {weatherData.city.fullCountryName}
              </p>
              <p className="text-base font-semibold">
                {formatDate(weatherData.list[0].dt)}
              </p>
              <div className="flex items-center text-blue-400 font-semibold">
                <p>{getWeatherIcon(weatherData.list[0].weather[0].icon)}</p>
                <p className="text-base ">
                  {weatherData.list[0].weather[0].main}
                </p>
              </div>
            </div>
            <div
              className="w-40 h-32 rounded-3xl bg-cover flex justify-end relative"
              style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            >
              <div className=" absolute bottom-3 right-3  w-14 h-7 bg-red-500 rounded-lg items-center flex justify-center">
                <p className="text-white text-xs ">LIVE</p>
              </div>
            </div>
          </div>

          {weatherData.list && weatherData.list.length > 0 ? (
            <div className="flex justify-center items-center w-96 h-28 bg-teal-900 mx-auto rounded-3xl mt-10">
              {weatherData.list.slice(0, 5).map((hourlyData, index) => (
                <div
                  key={index}
                  className="flex-1 items-center justify-center text-center p-2 text-white text-sm"
                >
                  <p>{formatTime(hourlyData.dt)}</p>
                  <p className="text-4xl ml-3">
                    {getWeatherIcon(hourlyData.weather[0].icon)}
                  </p>
                  <p>{Math.round(hourlyData.main.temp)}°C</p>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <div>
        <div>
          {weatherData && (
            <div>
              <div className="mt-10  mx-auto px-6">
                <div className="border-t">
                  <div className="py-5">Additional Info</div>
                  <div className="flex justify-between items-center text-base pb-5 border-b">
                    <div>
                      <label htmlFor="" className="font-semibold text-gray-400">
                        Precipitation
                      </label>
                      <p>{Math.round(weatherData.list[0].pop * 100)} %</p>
                    </div>
                    <div>
                      <label htmlFor="" className="font-semibold text-gray-400">
                        Humidity
                      </label>
                      <p>{weatherData.list[0].main.humidity} %</p>
                    </div>
                    <div>
                      <label htmlFor="" className="font-semibold text-gray-400">
                        windy
                      </label>
                      <p>
                        {Math.round(weatherData.list[0].wind.speed * 3.6)} km/h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mx-auto px-6 pt-10">
                <div>Temperature</div>
                <div className=" ">
                  <select
                    id="timeRange"
                    value={selectedRange}
                    onChange={handleRangeChange}
                    className="w-32 h-10 border border-black rounded-lg text-xs text-center focus:outline-none"
                  >
                    <option value="lastMonth">Last Month</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="last15Days">Last 15 Days</option>
                  </select>
                </div>
              </div>
              <div className="mt-10 mx-auto">
                <TemperatureChart
                  weatherData={weatherData}
                  selectedRange={selectedRange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page2;
