const express = require('express');
const fetch = require('node-fetch');

const app = express();
const apiKey = 'baa4de147223662aeea4b168ca732d61';

app.get('/currentWeather/:city', async (req, res) => {
  const city = req.params.city;
  const weatherUrl = `https://api.weather.gov/points/${city}/forecast`;

  try {
    const response = await fetch(weatherUrl, {
      headers: {
        'User-Agent': 'Your App Name', // Replace with your app name
        'Accept': 'application/geo+json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      throw new Error('Weather data not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/forecast/:city', async (req, res) => {
  const city = req.params.city;
  const forecastUrl = `https://api.weather.gov/points/${city}/forecast`;

  try {
    const response = await fetch(forecastUrl, {
      headers: {
        'User-Agent': 'Your App Name', // Replace with your app name
        'Accept': 'application/geo+json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      throw new Error('Forecast data not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
