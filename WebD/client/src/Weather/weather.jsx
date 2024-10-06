import React from "react";
import './weather.css';

const WeatherPage = () => {
  return (
    <div className="WeatherPage">
      {/* Main Section */}
      <div className="main-section">
        <div className="weather-overview">
          <h2>Today's Weather</h2>
          <div className="weather-info">
            <div className="temperature">
              <h1>25°C</h1>
              <p>Wave Height: 1.5m</p>
            </div>
            <div className="conditions">
              <div className="condition">
                <span className="icon">🌬️</span>
                <p>Wind: 15km/h</p>
              </div>
              <div className="condition">
                <span className="icon">🌧️</span>
                <p>Precipitation: 20%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="hourly-forecast">
          <h2>Hourly Forecast</h2>
          <div className="forecast-cards">
            {["12 PM", "2 PM", "4 PM", "6 PM"].map((time, index) => (
              <div key={index} className="forecast-card">
                <p>{time}</p>
                <span className="icon">☀️</span>
                <p>26°C</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="weekly-forecast">
          <h2>7-Day Forecast</h2>
          <div className="forecast-cards">
            {["Mon", "Tue", "Wed", "Thu"].map((day, index) => (
              <div key={index} className="forecast-card">
                <p>{day}</p>
                <span className="icon">🌤️</span>
                <p>24°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
