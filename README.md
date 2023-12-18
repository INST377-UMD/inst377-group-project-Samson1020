# Weather Forecast Application
By: Kyle Duong, Samson Mulugeta, & Zoe Cheng

## Description
This project aims to provide accurate and up-to-date weather forecasts through a user-friendly web application. Users can access detailed weather information for their desired locations, including hourly and daily forecasts, radar data, severe weather alerts, and historical weather data.

### Target Browsers
The application is compatible with modern browsers on desktop and mobile platforms, including but not limited to:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

## Documentation
- [User Manual](link_to_user_manual.md)
- [Developer Manual](link_to_developer_manual.md)

---

## Developer Manual

### Installation and Dependencies
1. **Clone the repository:** `git clone https://github.com/your_username/your_repository.git`
2. **Navigate to the project directory:** `cd your_repository`
3. **Install dependencies:** `npm install`

### Running the Application
- **Local Development:** `npm start`
- **Production Build:** `npm run build`

### Running Tests
- Run tests using: `npm test`

### API Endpoints
#### External Data Source
- **GET /weather-info/:location**
  - Fetches weather information for the specified location.
- **GET /forecast/:location**
  - Retrieves a 5-day forecast for the given location.

#### External Database Connection
- **GET /historical-data/:location**
  - Connects to an external weather database to retrieve historical weather data for the specified location.

### Known Bugs and Future Development
- **Known Bugs:** 
- **Future Development Roadmap:**
