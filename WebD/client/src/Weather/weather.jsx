import React, { useState, useEffect } from "react";
import './weather.css';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tomorrow.io API Key (Replace with your key)
  const apiKey = "YOUR_TOMORROW_IO_API_KEY";  
  const lat = 12.434967;  // Latitude for the region
  const lon = 80.129019;  // Longitude for the region

  // Tomorrow.io API URL for minutely weather data
  const tomorrowApiUrl = 'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=y6FLuaBi9yGBrZz6ci5e3TlImZoOBS0V';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(tomorrowApiUrl);
        const data = await response.json();
        const minutelyData = data.timelines[0].intervals; // Fetching minutely intervals

        // Group minutely data into hourly chunks
        const hourlyData = [];
        for (let i = 0; i < minutelyData.length; i += 60) {
          const hourChunk = minutelyData.slice(i, i + 60);
          const hourlyAvg = calculateAverage(hourChunk);
          hourlyData.push(hourlyAvg);
        }

        // Group hourly data into daily chunks
        const dailyData = [];
        for (let i = 0; i < hourlyData.length; i += 24) {
          const dayChunk = hourlyData.slice(i, i + 24);
          const dailyAvg = calculateAverage(dayChunk);
          dailyData.push(dailyAvg);
        }

        setWeatherData({ hourlyData, dailyData });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [tomorrowApiUrl]);

  const calculateAverage = (chunk) => {
    const average = {
      time: chunk[0].time,
      values: {
        temperature: (chunk.reduce((sum, entry) => sum + entry.values.temperature, 0) / chunk.length).toFixed(2),
        windSpeed: (chunk.reduce((sum, entry) => sum + entry.values.windSpeed, 0) / chunk.length).toFixed(2),
        humidity: (chunk.reduce((sum, entry) => sum + entry.values.humidity, 0) / chunk.length).toFixed(2),
        cloudCover: (chunk.reduce((sum, entry) => sum + entry.values.cloudCover, 0) / chunk.length).toFixed(2)
      }
    };
    return average;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>Error fetching weather data.</div>;
  }

  const { hourlyData, dailyData } = weatherData;

  return (
    <div className="WeatherPage">
      <div className="main-section">
        <div className="weather-overview">
          <h2>Today's Weather</h2>
          <div className="weather-info">
            <div className="temperature">
              <h1>{dailyData[0].values.temperature}°C</h1>
            </div>
            <div className="conditions">
              <div className="condition">
                <span className="icon">🌬️</span>
                <p>Wind Speed: {dailyData[0].values.windSpeed} m/s</p>
              </div>
              <div className="condition">
                <span className="icon">🌧️</span>
                <p>Humidity: {dailyData[0].values.humidity}%</p>                
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="hourly-forecast">
          <h2>Hourly Forecast (Next 48 Hours)</h2>
          <div className="forecast-cards">
            {hourlyData.slice(0, 48).map((hour, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <span className="icon">☀️</span>
                <p>{hour.values.temperature}°C</p>
                <p>Wind Speed: {hour.values.windSpeed} m/s</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="weekly-forecast">
          <h2>5-Day Forecast</h2>
          <div className="forecast-cards">
            {dailyData.slice(0, 5).map((day, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(day.time).toLocaleDateString("en-US", { weekday: 'short' })}</p>
                <span className="icon">🌤️</span>
                <p>{day.values.temperature}°C</p>
                <p>Wind: {day.values.windSpeed} m/s</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeatherPage;
