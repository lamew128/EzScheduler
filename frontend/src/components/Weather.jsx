import axios from "axios";
import React, { useState, useEffect } from "react";

//props require: lat, long, time
const Weather = (props) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://api.openweathermap.org/data/2.5/forecast";
  const LAT = props.lat;
  const LONG = props.long;
  const API_KEY = process.env.REACT_APP_API_KEY_WEATHER;
  const FULL_API_URL = `${API_URL}?lat=${LAT}&lon=${LONG}&appid=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(FULL_API_URL)
      .then((res) => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].dt >= props.date) {
            setWeather(res.data.list[i]);
            break;
          }
        }
      })
      .then(() => setLoading(false))
      .catch((e) => console.log(e));
  }, [FULL_API_URL, props.date]);

  //console.log({weather});

  return (
    <>
      {loading && (
        <>
          <div className="spinner-border text-info" role="status" />
        </>
      )}
      {!loading && (
        <>
          {weather && (
            <>
              <h3>{`${Math.round(weather.main.temp - 273.15)}°C`}</h3>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              ></img>
              <p>{weather.weather[0].description}</p>

              {weather.weather[0].main === "Clear" && <p>Enjoy your event!</p>}

              {weather.weather[0].main === "Rain" && (
                <p>Bring an umbrella! ☂️</p>
              )}
            </>
          )}
          {!weather && (
            <>
              <p>No weather information yet, Please check later.</p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Weather;
