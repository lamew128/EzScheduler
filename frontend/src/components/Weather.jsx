import axios from "axios";
import React, { useState, useEffect } from "react";

//props require: lat, long, time
const Weather = (props) => {

  const [weather, setWeather] = useState({});
  
  const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
  const LAT = `${props.lat}`;
  const LONG = `${props.long}`;
  const API_KEY = 'b6c15dcbe8b4a2a7df28700233152283';
  const FULL_API_URL = `${API_URL}?lat=${LAT}&lon=${LONG}&appid=${API_KEY}`;

  const now = Math.round(new Date().getTime()/1000);
  const weatherAvaiable = (props.time - now < 421200) ? true : false;

  useEffect(() => {
    axios.get(FULL_API_URL)
    .then((res) => {
      console.log("res.data : ", res.data);
      for (let i = 0; i < res.data.list.length; i++) {
        if (res.data.list[i].dt >= props.time) {
          console.log("res.data.list[i] : ",res.data.list[i]);
          setWeather(res.data.list[i]);
          break;
        }
      }
    })
  }, [])

  return (
    <div>
      time = {weather.dt} temp = {weather.main.temp} <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
    </div>
  );
};

export default Weather;
