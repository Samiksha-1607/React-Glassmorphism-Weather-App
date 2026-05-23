import React, { useState, useEffect } from "react";
import "./WeatherUi.css";
const API_KEY = "67b92f0af5416edbfe58458f502b0a31";

// WEATHER LOGIC
const determineWeatherType = (temp, conditions) => {
  const filteredTemp = Math.round(temp);
  let type = "";
  let imageClass = "";

  if (conditions === "Rain" || conditions === "Thunderstorm") {
    type = "Stormy";
    imageClass = "kamino-bg";
  } else if (conditions === "Mist" || conditions === "Fog") {
    type = "Foggy";
    imageClass = "endor-bg";
  } else {
    if (filteredTemp <= 2) {
      type = "Freezing";
      imageClass = "Hoth-bg";
    } else if (filteredTemp <= 13) {
      type = "Chilly";
      imageClass = "naboo-bg-warmer";
    } else if (filteredTemp <= 18) {
      type = "Moderate";
      imageClass = "coruscant-bg";
    } else if (filteredTemp <= 22) {
      type = "Warm";
      imageClass = "scariff-bg";
    } else if (filteredTemp <= 26) {
      type = "Hot";
      imageClass = "tattoine-bg";
    } else if (filteredTemp <= 32) {
      type = "Very Hot";
      imageClass = "bespin-bg";
    } else {
      type = "Scorching";
      imageClass = "kashyyk-bg";
    }
  }
  return { type, imageClass };
};

const determineTempMessage = (temp, conditions) =>
  `It's ${Math.round(temp)}°C, ${conditions}.`;

const determineDescription = (type) => {
  const curr = type.toLowerCase();
  if (curr === "stormy") return "Heavy rain expected. Keep an umbrella.";
  if (curr === "foggy") return "Foggy — low visibility.";
  if (curr === "freezing") return "Freezing cold. Wear thermals.";
  if (curr === "chilly") return "A bit cold. A jacket is recommended.";
  if (curr === "moderate") return "Pleasant weather today.";
  if (curr === "warm") return "Warm and clear outside.";
  if (curr === "hot") return "Hot weather. Stay hydrated.";
  if (curr === "very hot") return "Very hot. Avoid direct sun.";
  return "Extreme heat. Limit outdoor activity.";
};

const WeatherUI_BG_MAP = {
  "default-bg": "./images/loading.png",
  "kamino-bg": "/images/kamino.png",
  "endor-bg": "/images/endor1.jpg",
  "Hoth-bg": "/images/hoth.jpg",
  "naboo-bg-warmer": "/images/Naboo-warmer.jpg",
  "coruscant-bg": "/images/coruscant-night.jpg",
  "scariff-bg": "/images/Scariff.jpg",
  "tattoine-bg": "/images/tatooine.jpg",
  "bespin-bg": "/images/bespin.jpg",
  "kashyyk-bg": "/images/kashyyk.jpg",
};

const WeatherUI = () => {
  const [city, setCity] = useState("Jammu");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(""); // ⭐ user's city
  const [weatherInfo, setWeatherInfo] = useState({
    type: "",
    description: "",
    tempMessage: "",
    imageClass: "default-bg",
  });

  // FETCH BY CITY NAME
  const fetchWeatherByCity = async (cityName) => {
    try {
      setIsLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityName
      )}&units=metric&appid=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);
      setUserLocation(`${data.name}, ${data.sys.country}`);
    } catch (e) {
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // FETCH BY COORDINATES (AUTO-DETECT)
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setIsLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setWeatherData(data);
      setUserLocation(`${data.name}, ${data.sys.country}`); // ⭐ update UI location
      setCity(data.name); // update search field too
    } catch (e) {
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // ON MOUNT → detect location
  useEffect(() => {
    if (!navigator.geolocation) {
      fetchWeatherByCity(city);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        fetchWeatherByCity(city); // fallback
      }
    );
  }, []);

  // UPDATE WEATHER DISPLAY
  useEffect(() => {
    if (weatherData) {
      const temp = weatherData.main.temp;
      const conditions = weatherData.weather[0].main;
      const { type, imageClass } = determineWeatherType(temp, conditions);

      setWeatherInfo({
        type,
        description: determineDescription(type),
        tempMessage: determineTempMessage(temp, conditions),
        imageClass,
      });
    }
  }, [weatherData]);

  // USER SEARCH
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherByCity(city);
  };

  return (
    <div
      className="image-container"
      style={{
        backgroundImage: `url(${
          WeatherUI_BG_MAP[weatherInfo.imageClass] ||
          WeatherUI_BG_MAP["default-bg"]
        })`,
      }}
    >
      <div className="page">
        <form className="card" onSubmit={handleSearch}>
          {/* SEARCH BAR */}
          <div className="search-container">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search city..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </div>

          {/* LOCATION NAME */}
          {userLocation && (
            <p className="location-text">📍 {userLocation}</p>
          )}

          {/* WEATHER DISPLAY */}
          {isLoading ? (
            <div className="loading-text">Loading...</div>
          ) : weatherData ? (
            <div className="info-container">
              <h2 className="main-title">{weatherInfo.type}</h2>
              <p className="temp-text">{weatherInfo.tempMessage}</p>
              <p className="desc-text">{weatherInfo.description}</p>

              {/* Stats */}
              <div className="stats-row">
                <div className="stat-item">
                  <span className="stat-label">Humidity</span>
                  <span className="stat-value">
                    {weatherData.main.humidity}%
                  </span>
                </div>

                <div className="stat-item">
                  <span className="stat-label">Wind</span>
                  <span className="stat-value">
                    {Math.round(weatherData.wind.speed * 3.6)} km/h
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="error-text">City not found</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default WeatherUI;
