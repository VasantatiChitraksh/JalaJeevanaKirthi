import React, { useState, useEffect } from "react";
import './weather.css';

const WeatherPage = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [marineData, setMarineData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // API details
  const weatherApiKey = "595b6ff73d1082aa862f981bf88db5f1";  
  const marineApiKey = "0521adf4-840d-11ef-882e-0242ac130003-0521ae6c-840d-11ef-882e-0242ac130003";       
  const lat = "12.434967";  // Latitude of your location
  const lon = "80.129019";  // Longitude of your location

  // OpenWeatherMap and Stormglass API URLs
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${weatherApiKey}`;
  
  // Valid parameters for Stormglass API
  const marineApiUrl = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lon}&params=waveHeight,windSpeed,windDirection,airTemperature,humidity&source=noaa`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch weather data from OpenWeatherMap
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        // Fetch marine data from Stormglass
        const marineResponse = await fetch(marineApiUrl, {
          headers: {
            'Authorization': marineApiKey
          }
        });
        const marineData = await marineResponse.json();
        setMarineData(marineData.hours);  // Get all hours of marine data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [weatherApiUrl, marineApiUrl, marineApiKey]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if weather and marine data exist
  if (!weatherData || marineData.length === 0) {
    return <div>Error fetching weather or marine data</div>;
  }

  
  const temperature = weatherData.daily[0].temp.day;
  const windSpeed = weatherData.daily[0].wind_speed;
  const weatherCondition = weatherData.daily[0].weather[0].main;

  // Extract hourly marine data for today
  const hourlyMarineData = marineData.slice(0, 12);  

  const dailyMarineData = [];
  for (let i = 0; i < 7; i++) {
    dailyMarineData.push(marineData[i * 24 + 12]);  
  }

  return (
    <div className="WeatherPage">
      {/* Main Section */}
      <div className="main-section">
        <div className="weather-overview">
          <h2>Today's Weather</h2>
          <div className="weather-info">
            <div className="temperature">
              <h1>{temperature}°C</h1>
            </div>
            <div className="conditions">
              <div className="condition">
                <span className="icon">🌬️</span>
                <p>Wind: {(windSpeed * 3.6).toFixed(2)} Kmph</p>
              </div>
              <div className="condition">
                <span className="icon">🌧️</span>
                <p>Condition: {weatherCondition}</p>                
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="hourly-forecast">
          <h2>Hourly Forecast</h2>
          <div className="forecast-cards">
            {weatherData.hourly.slice(0, 12).map((hour, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <span className="icon">☀️</span>
                <p>{hour.temp}°C</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Marine Forecast */}
        <div className="hourly-forecast">
          <h2>Hourly Marine Forecast</h2>
          <div className="forecast-cards">
            {hourlyMarineData.map((marine, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(marine.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>Wave Height: {marine.waveHeight.noaa}m</p>
                <p>Wind Speed: {marine.windSpeed.noaa} m/s</p>
                <p>Wind Direction: {marine.windDirection.noaa}°</p>
                <p>Air Temp: {marine.airTemperature.noaa}°C</p>
                <p>Humidity: {marine.humidity.noaa}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="weekly-forecast">
          <h2>7-Day Forecast</h2>
          <div className="forecast-cards">
            {weatherData.daily.slice(1, 8).map((day, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: 'short' })}</p>
                <span className="icon">🌤️</span>
                <p>{day.temp.day}°C</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Marine Forecast */}
        <div className="weekly-forecast">
          <h2>7-Day Marine Forecast</h2>
          <div className="forecast-cards">
            {dailyMarineData.map((marine, index) => (
              <div key={index} className="forecast-card">
                <p>Day {index + 1}</p>
                <p>Wave Height: {marine.waveHeight.noaa}m</p>
                <p>Wind Speed: {marine.windSpeed.noaa} m/s</p>
                <p>Wind Direction: {marine.windDirection.noaa}°</p>
                <p>Air Temp: {marine.airTemperature.noaa}°C</p>
                <p>Humidity: {marine.humidity.noaa}%</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeatherPage;
