const apiKey = 'baa4de147223662aeea4b168ca732d61';
let selectedMetric = 'metric'; // Default metric

function getWeather() {
  const city = document.getElementById('cityInput').value;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${selectedMetric}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${selectedMetric}`;

  fetchWeather(weatherUrl, forecastUrl);
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${selectedMetric}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${selectedMetric}`;

      fetchWeather(weatherUrl, forecastUrl);
    }, showError);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function fetchWeather(weatherUrl, forecastUrl) {
  fetch(weatherUrl)
    .then(handleResponse)
    .then(displayCurrentWeather)
    .catch(error => {
      console.error('There was a problem fetching the weather data:', error);
    });

  fetch(forecastUrl)
    .then(handleResponse)
    .then(displayForecast)
    .catch(error => {
      console.error('There was a problem fetching the forecast data:', error);
    });
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function displayCurrentWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <div>
      <img class="weather-icon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
      <p>Temperature: ${data.main.temp}°</p>
      <p>Description: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    </div>
  `;
}

function displayForecast(data) {
  const forecast = document.getElementById('forecast');
  forecast.innerHTML = `<h2 data-aos="fade-up">5-Day Forecast</h2>`;
  const dailyForecast = {};

  // Group forecast data by day
  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        date: date,
        temps: [],
        humidity: [],
        windSpeed: [],
        icons: [],
        descriptions: [],
      };
    }
    dailyForecast[date].temps.push(item.main.temp);
    dailyForecast[date].humidity.push(item.main.humidity);
    dailyForecast[date].windSpeed.push(item.wind.speed);
    dailyForecast[date].icons.push(item.weather[0].icon);
    dailyForecast[date].descriptions.push(item.weather[0].description);
  });

  // Display the daily forecast
  for (const key in dailyForecast) {
    if (dailyForecast.hasOwnProperty(key)) {
      const dayForecast = dailyForecast[key];
      const maxTemp = Math.max(...dayForecast.temps);
      const minTemp = Math.min(...dayForecast.temps);
      const avgHumidity = Math.round(dayForecast.humidity.reduce((a, b) => a + b) / dayForecast.humidity.length);
      const avgWindSpeed = (dayForecast.windSpeed.reduce((a, b) => a + b) / dayForecast.windSpeed.length).toFixed(2);
      const date = new Date(dayForecast.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

      forecast.innerHTML += `
        <div class="forecast-item" data-aos="fade-up">
          <p>${dayName}</p>
          <img class="weather-icon" src="http://openweathermap.org/img/w/${dayForecast.icons[0]}.png" alt="Weather Icon">
          <p>Max Temp: ${maxTemp}°</p>
          <p>Min Temp: ${minTemp}°</p>
          <p>Avg Humidity: ${avgHumidity}%</p>
          <p>Avg Wind Speed: ${avgWindSpeed} m/s</p>
        </div>
      `;
    }
  }

  // Initialize AOS for the newly added elements
  AOS.refresh();
}


function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      alert('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
      alert('An unknown error occurred.');
      break;
  }
}

function changeMetric() {
  const selectElement = document.getElementById('metricSelect');
  selectedMetric = selectElement.value;
  // If you want to automatically fetch weather data when metric changes, you can call getWeather() here.
}
