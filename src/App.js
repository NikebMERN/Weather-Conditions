import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const api = {
  base: 'https://api.openweathermap.org/data/2.5/',
  key: process.env.REACT_APP_apikey
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function App () {
  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState({});
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
    const search = e => {
      if (e.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            // console.log(result);
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
      ul = Math.round(el / 100);

      return ul;
    }

    const farhanit = (rr) => {
      let ror;
      ror = Math.round(rr * (9/5)) + 32;

      return ror;
    }
  
    return (
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 18.14) ? 'app warn' : 'app cold') : 'app'}>
        <main>
          <center className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Enter Location"
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </center>
            <div className='d-flex mx-auto'>
          <Box
      sx={{ flexGrow: 1, display: 'flex', height: 440 }}
      className="col-3"
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        <Tab label="" className="fw-bolder" onClick={() => setQuery('')} />
        <Tab label="Addis Ababa" className="fw-bolder" onClick={() => setQuery('Addis Ababa, ETH')} />
        <Tab label="Malden" className="fw-bolder" onClick={() => setQuery('Malden')} />
        <Tab label="Virginia" className="fw-bolder" onClick={() => setQuery('Virginia')} />
        <Tab label="California" className="fw-bolder" onClick={() => setQuery('California')} />
        <Tab label="Spain" className="fw-bolder" onClick={() => setQuery('Spain')} />
        <Tab label="Brazil" className="fw-bolder" onClick={() => setQuery('Brazil')} />
        <Tab label="China" className="fw-bolder" onClick={() => setQuery('China')} />
        <Tab label="German" className="fw-bolder" onClick={() => setQuery('German')} />
        <Tab label="Russia" className="fw-bolder" onClick={() => setQuery('Russia, RU')} />
        <Tab label="Paris" className="fw-bolder" onClick={() => setQuery('Paris')} />
      </Tabs>
    </Box>
    <div className="col-9">
          {(typeof weather.main != "undefined") ? (
          <>
            <div className="location-box">
              <Accordion className='Accordion col-7 bg-secondary'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>More INFO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div className='weather-boe bg-black d-lg-flex d-md-flex'>
            <div>
              <div className="humidity temp border">
            <p className='bold'><p>Humidity</p>: {weather.main.humidity}%</p>
            </div>
            <div className="wind temp border px-3">
              <p className='bold'><p>Wind-Speed</p>: {weather.wind.speed.toFixed()} MPH</p>
            </div>
            </div>
            <div>
            <div className="far temp border px-3">
              <p className='bold'><p>Farhaneite</p>: {farhanit(weather.main.temp)}°F</p>
            </div>
            <div className="kelvin temp border">
              <p className='bold'><p>Kelvine</p>: {kelvin(weather.main.temp)}K</p>
            </div>
            </div>
              </div>
          </Typography>
        </AccordionDetails>
      </Accordion>    
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
            </div>
          </>
          ) : (<><h1 className='text-center mt-5'>No Result Found</h1></>)}
              </div>
                      </div>
        </main>
      </div>
    );
  }
export default App;

// +  Deploy complete!

// Project Console: https://console.firebase.google.com/project/weather-83250/overview
// Hosting URL: https://weather-83250.web.app