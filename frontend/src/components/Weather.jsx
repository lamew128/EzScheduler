import axios from "axios";
import React, { useState, useEffect } from "react";

//props require: lat, long, time
const Weather = (props) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://api.openweathermap.org/data/2.5/forecast";
  const LAT = `${props.lat}`;
  const LONG = `${props.long}`;
  const API_KEY = process.env.REACT_APP_API_KEY_WEATHER;
  const FULL_API_URL = `${API_URL}?lat=${LAT}&lon=${LONG}&appid=${API_KEY}`;

  // const now = Math.round(new Date().getTime() / 1000);
  // const weatherAvaiable = props.time - now < 421200 ? true : false;

  useEffect(() => {
    // console.log("NOW = ", new Date(now * 1000));
    // console.log("TIME = ", new Date(props.time * 1000));
    // console.log("weatherAvaiable = ", weatherAvaiable);
    setLoading(true);
    axios
      .get(FULL_API_URL)
      .then((res) => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].dt >= props.date) {
            console.log("res.data.list[i] : ", res.data.list[i]);
            setWeather(res.data.list[i]);
            break;
          }
        }
      })
      .then(() => setLoading(false));
  }, [FULL_API_URL, props.date]);

  return (
    <>
      {loading && (
        <>
          <div className="spinner-border text-info" role="status" />
        </>
      )}
      {!loading && (
        <>
          <p>
            The temperature on day of the event will be{" "}
            {weather && Math.round(weather.main.temp - 273.15)}
            {"°"}
          </p>
          <img
            src={
              weather &&
              `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
            }
            alt="Weather Icon"
          ></img>
        </>
      )}
    </>
  );
};

export default Weather;
