import React, { useState, useEffect } from "react";
import './weather.css';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
<<<<<<< Updated upstream
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Visakhapatnam"); // Default coastal city

  const apiKey = "2ec3a97355749a6fa01994b0ae075387"; // Free version API key
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
=======
  const [loading, setLoading] = useState(true);

  // Tomorrow.io API Key (Replace with your key)
  const apiKey = "YOUR_TOMORROW_IO_API_KEY";  
  const lat = 12.434967;  // Latitude for the region
  const lon = 80.129019;  // Longitude for the region

  // Tomorrow.io API URL for weather data (limited to free tier)
  const tomorrowApiUrl = 'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=y6FLuaBi9yGBrZz6ci5e3TlImZoOBS0V';
>>>>>>> Stashed changes

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< Updated upstream
        const weatherResponse = await fetch(weatherApiUrl);
        const forecastResponse = await fetch(forecastApiUrl);

        if (!weatherResponse.ok || !forecastResponse.ok) {
          throw new Error(`Error fetching data: ${weatherResponse.status} / ${forecastResponse.status}`);
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        setWeatherData(weatherData);
        setForecastData(forecastData);
=======
        const response = await fetch(tomorrowApiUrl);
        const data = await response.json();
        const { timelines } = data;

        // Assuming the first timeline in the response is the hourly timeline
        const hourlyData = timelines[0].intervals;
        const dailyData = timelines[1].intervals;
        
        setWeatherData({ hourlyData, dailyData });
>>>>>>> Stashed changes
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

<<<<<<< Updated upstream
    fetchData();
  }, [weatherApiUrl, forecastApiUrl]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
=======
    fetchWeatherData();
  }, [tomorrowApiUrl]);
>>>>>>> Stashed changes

  if (loading) {
    return <div>Loading...</div>;
  }

<<<<<<< Updated upstream
  if (error) {
    return <div>Error fetching weather data: {error}</div>;
  }

  if (!weatherData || !forecastData) {
    return <div>No data available.</div>;
  }
=======
  // Display error if data is not found
  if (!weatherData) {
    return <div>Error fetching weather data.</div>;
  }

  // Extract hourly and daily data
  const { hourlyData, dailyData } = weatherData;
>>>>>>> Stashed changes

  const { main, weather, wind, name } = weatherData;

  // Get the next 24-hour forecast (8 intervals, each 3 hours apart)
  const hourlyForecast = forecastData.list.slice(0, 8).map((forecast) => {
    const date = new Date(forecast.dt * 1000); // Convert timestamp to date
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {
      time,
      temp: forecast.main.temp,
      description: forecast.weather[0].description,
      icon: forecast.weather[0].icon,
      windSpeed: forecast.wind.speed,
      windDeg: forecast.wind.deg,
    };
  });

  // Get the daily forecast (1 forecast per day, around midday)
  const dailyForecasts = {};
  forecastData.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'short' });

    // Get closest to midday
    if (!dailyForecasts[day] || Math.abs(date.getHours() - 12) < Math.abs(new Date(dailyForecasts[day].dt * 1000).getHours() - 12)) {
      dailyForecasts[day] = forecast;
    }
  });

  const dailyForecastItems = Object.keys(dailyForecasts).map((day, index) => {
    const forecast = dailyForecasts[day];
    const iconUrl = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

    return (
      <div key={index} className="forecast-item">
        <h3>{day}</h3>
        <img src={iconUrl} alt={forecast.weather[0].description} />
        <p><strong>{forecast.weather[0].description}</strong></p>
        <p>Temp: {forecast.main.temp} °C</p>
        <p>Min: {forecast.main.temp_min} °C / Max: {forecast.main.temp_max} °C</p>
        <p>Humidity: {forecast.main.humidity}%</p>
        <p>Wind: {forecast.wind.speed} m/s</p>
      </div>
    );
  });

  return (
<<<<<<< Updated upstream
    <div className="weather-page">
      {/* Navigation bar */}
      <nav className="nav-bar">
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/forecasts">Forecasts</a>
          </li>
          <li className="right">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Input section for changing the city */}
      <div className="content">
        <div className="input-section">
          <input 
            type="text" 
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
            className="city-input"
          />
        </div>

        {/* Current weather display */}
        <div className="weather-section">
          <h2>Current Weather in {name}</h2>
          <p>Temperature: {main.temp} °C</p>
          <p>Feels Like: {main.feels_like} °C</p>
          <p>Humidity: {main.humidity}%</p>
          <p>Wind Speed: {wind.speed} m/s</p>
          <p>Conditions: {weather[0].description}</p>
        </div>

        {/* Hourly forecast display */}
        <div className="hourly-section">
          <h2>Next 24-Hour Forecast</h2>
          <div className="hourly-forecast-scroll">
            {hourlyForecast.map((forecast, index) => (
              <div key={index} className="hourly-item">
                <h4>{forecast.time}</h4>
                <img src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`} alt={forecast.description} />
                <p><strong>{forecast.description}</strong></p>
                <p>Temp: {forecast.temp} °C</p>
                <p>Wind: {forecast.windSpeed} m/s, {forecast.windDeg}°</p>
=======
    <div className="WeatherPage">
      {/* Main Section */}
      <div className="main-section">
        
        {/* Today's Weather Overview */}
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

        {/* Hourly Forecast (for next 48 hours) */}
        <div className="hourly-forecast">
          <h2>Hourly Forecast (Next 48 Hours)</h2>
          <div className="forecast-cards">
            {hourlyData.slice(0, 48).map((hour, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(hour.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <span className="icon">☀️</span>
                <p>{hour.values.temperature}°C</p>
                <p>Wind Speed: {hour.values.windSpeed} m/s</p>
>>>>>>> Stashed changes
              </div>
            ))}
          </div>
        </div>

<<<<<<< Updated upstream
        {/* Daily forecast display */}
        <div className="forecast-section">
          <h2>5-Day Weather Forecast</h2>
          <div className="daily-forecast-scroll">
            {dailyForecastItems}
          </div>
        </div>
=======
        {/* 5-Day Forecast */}
        <div className="weekly-forecast">
          <h2>5-Day Forecast</h2>
          <div className="forecast-cards">
            {dailyData.slice(0, 5).map((day, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(day.startTime).toLocaleDateString("en-US", { weekday: 'short' })}</p>
                <span className="icon">🌤️</span>
                <p>{day.values.temperature}°C</p>
                <p>Wind: {day.values.windSpeed} m/s</p>
              </div>
            ))}
          </div>
        </div>

>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default WeatherPage;
