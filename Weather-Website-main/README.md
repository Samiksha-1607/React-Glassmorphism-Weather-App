# 🌦️ React Glassmorphism Weather App

[![JavaScript](https://img.shields.io/badge/JavaScript.8%2B-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML](https://img.shields.io/badge/HTML-5-red)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-3-blue)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A visually stunning weather application built with React.js that features a **Glassmorphism UI** and **Dynamic Backgrounds** that change based on real-time weather conditions.

## ✨ Features

* **Dynamic Themes:** The background image changes automatically based on the temperature and weather conditions (e.g., Stormy, Foggy, Freezing, Hot).
* **Glassmorphism Design:** A modern, translucent card UI with background blur and sleek typography.
* **Real-time Data:** Fetches live weather data (Temperature, Humidity, Wind Speed, Description) using the OpenWeatherMap API.
* **Responsive:** Adapts to the screen size with a clean, centered layout.
* **Custom Assets:** Uses high-quality atmospheric images for different weather states.

![Moderate](Output/image.png)
![Hot](Output/image-1.png)
![Foggy](Output/image-2.png)
![Stormy](Output/image-3.png)
![Warm](Output/image-4.png)
![Very Hot](Output/image-5.png)
![Chilly](Output/image-6.png)


## 🛠️ Tech Stack

* **Frontend:** React.js (Functional Components, Hooks)
* **Styling:** CSS-in-JS (Inline Styles), Google Fonts (Inter, Orbitron)
* **API:** OpenWeatherMap

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* Node.js installed on your machine.
* An API Key from [OpenWeatherMap](https://openweathermap.org/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/weather-app.git](https://github.com/your-username/weather-app.git)
    cd weather-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Images:**
    Ensure you have a folder named `images` inside the `public` directory. The app relies on specific filenames for the background logic.
    
    **Required file structure:**
    ```text
    public/
    └── images/
        ├── kamino.png
        ├── endor.jpg
        ├── hoth.jpg
        ├── Naboo-warmer.jpg
        ├── coruscant-night.jpg
        ├── scariff.jpg
        ├── tatooine.jpg
        ├── bespin.jpg
        └── kashyyk.jpg
    ```

4.  **Configure API Key:**
    Open `src/WeatherUI.jsx` (or `App.js`) and replace the placeholder key with your own:
    ```javascript
    const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY_HERE";
    ```

5.  **Run the application:**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```bash
weather-app/
├── node_modules/
├── Output/
│   ├── images/      # Final Website Images
├── public/
│   ├── images/       # Store your weather background images here
│   └── index.html
├── src/
│   ├── WeatherUI.jsx # Main component containing logic and styles
│   ├── index.js
│   └── App.js
├── package.json
└── README.md
```

## 📄 License

This project is licensed under the MIT License.

## 👤 Author
Arshiya Attar

GitHub: [Arshiya Attar](https://github.com/iamarshiya)

LinkedIn:[Arshiya Attar](https://www.linkedin.com/in/arshiya-attar-91b4ab2b5/)