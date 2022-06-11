import React, { useEffect, useState } from "react";
import classes from "./NewEventForm.module.css";
import Map from "../../pages/Map";

const NewEvent = () => {
  const [coords, setCoords] = useState({});
  let coordsLat;
  let coordsLng;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      coordsLat = e.coords.latitude;
      coordsLng = e.coords.longitude;
      setCoords({ lng: coordsLng, lat: coordsLat });
    });
  }, []);

  return (
    <div className={classes.container}>
      <h3 className="row">New Event</h3>
      <form className="row">
        <div className={`${classes.inputs} col`}>
          <label>Title:</label>
          <input type="text" />
          <label>Name of Location:</label>
          <input type="text" />
          <label>Address:</label>
          <input type="text" />
        </div>
        <div className="col">
          <label>Date:</label>
          <input type="date" />
        </div>
      </form>
      <hr />
      <div className="row">
        <div className="col-4">
          Invitees
          <div className={classes.invitees}>
            <i className={`${classes.add} bi bi-plus-lg`}></i>
          </div>
        </div>
        <div className="col-8">
          MAP
          <div className={classes.map}>
            <Map lat={coords.lat} lng={coords.lng} />
          </div>
        </div>
      </div>
      <hr />
      <div className={`${classes.center} row`}>
        <button className={classes.btn} type="submit">
          Create New Event
        </button>
      </div>
    </div>
  );
};

export default NewEvent;
