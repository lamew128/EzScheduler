import React, { useEffect, useState } from "react";
import classes from "./NewEventForm.module.css";
import Map from "../../pages/Map";
import axios from "axios";

const NewEvent = () => {
  const [coords, setCoords] = useState({});
  const [title, setTitle] = useState("");
  const [location, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      setCoords({ lng: e.coords.longitude, lat: e.coords.latitude });
    });
  }, []);

  const addressChange = (e) => {
    setAddress(e.target.value);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const getLocation = () => {
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address,
          key: process.env.REACT_APP_API_KEY,
        },
      })
      .then((data) => {
        const dataCoords = data.data.results[0].geometry.location;
        setCoords({ lat: dataCoords.lat, lng: dataCoords.lng });
      });
  };

//save the new event data to database
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = { title, location, address, date, coords};
    console.log(formData);
    return axios.post(`/event/new`, formData)
    .then((response) => {
      console.log(response);
    });
  };

  return (
    <div className={classes.container}>
      <h3 className="row">New Event</h3>
      <form className="row" onSubmit={submitHandler}>
        <div className={`${classes.inputs} col`}>
          <label>Title:</label>
          <input type="text" value={title} onChange={titleChange} />
          <label>Description:</label>
          <input type="text" value={location} onChange={descriptionChange} />
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={addressChange}
            onBlur={getLocation}
            name="address"
          />
        </div>
        <div className="col">
          <label>Date:</label>
          <input type="date" value={date} onChange={dateChange} />
        </div>
        <hr className="mt-3" />
        <div className="row mb-3">
          <div className="col-4">
            Invitees
            <div className={classes.invitees}>
              <i className={`${classes.add} bi bi-plus-lg`}></i>
            </div>
          </div>
          <div className="col-8">
            MAP
            <div className={classes.map}>
              <Map lat={coords.lat} lng={coords.lng} height={'400px'} zoom={18}/>
            </div>
          </div>
        </div>
        <hr />
        <div className={`${classes.center} row`}>
          <button className={classes.btn} type="submit">
            Create New Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;
