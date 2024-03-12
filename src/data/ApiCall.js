import axios from 'axios';

const API_KEY = '821ddb3d5f7b9f8e634288f8080a6301';

// Function to get full country name based on country code
const getCountryName = async (countryCode) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const countryName = response.data[0].name.common;
    return countryName;
  } catch (error) {
    console.error('Failed to fetch country name:', error);
    return null;
  }
};

export const getCityWeather = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&include=hourly&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.city && data.city.country) {
      const countryName = await getCountryName(data.city.country);
      data.city.fullCountryName = countryName; // Add the full country name to the data
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
};


