import React from 'react';
import './App.css';
const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: process.env.REACT_APP_apikey
}

function App() {
  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState({});
  
    const search = e => {
      if (e.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
          });
      }
    }
  
    const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
  
      return `${day} ${date}, ${month} ${year}`
    }

    const kelvin = (el) => {
      let ul;
      ul = el + 273;

      return ul;
    }

    const farhanit = (rr) => {
      let ror;
      ror = (rr * (9/5)) + 32;

      return ror;
    }
  
    return (
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 18.14) ? 'app warn' : 'app cold') : 'app'}>
        <main>
          <center className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </center>
          {(typeof weather.main != "undefined") ? (
          <>
            <div className="location-box">
              <div className="location">
                <p>{weather.name}, {weather.sys.country}</p>
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {weather.main.temp}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className='flex'>
                        <div className="humidity temp">
            <p className='bold'><p>Humidity</p>: {weather.main.humidity}%</p>
            </div>
            <div className="wind temp">
              <p className='bold'><p>Wind Speed</p>: {weather.wind.speed.toFixed()} MPH</p>
            </div>
            <div className="far temp">
              <p className='bold'><p>Farhaneite</p>: {farhanit(weather.main.temp)}°F</p>
            </div>
            <div className="kelvin temp">
              <p className='bold'><p>Kelvine</p>: {kelvin(weather.main.temp)}K</p>
            </div>
              </div>
    
            </div>
          </>
          ) : (<center><h1>No Result Found</h1></center>)}
        </main>
      </div>
    );
  }
export default App;


// +  Deploy complete!

// Project Console: https://console.firebase.google.com/project/weather-83250/overview
// Hosting URL: https://weather-83250.web.app