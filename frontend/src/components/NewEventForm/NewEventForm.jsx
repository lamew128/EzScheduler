import React, { useEffect, useState } from "react";
import classes from "./NewEventForm.module.css";
import Map from "../../pages/Map";
import axios from "axios";
import TimePicker from "react-time-picker";

const NewEvent = (props) => {
  const [coords, setCoords] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [startTimestamp, setStartTime] = useState("");
  const [endTimestamp, setEndTime] = useState("");

  console.log(props.user);

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
    const dateE = date.split("-");
    const start = startTimestamp.split(":");
    const startTime =
      new Date(dateE[0], Number(dateE[1])-1, dateE[2], start[0], start[1]).getTime() /
      1000;
    const end = endTimestamp.split(":");
    const endTime =
      new Date(dateE[0], Number(dateE[1])-1, dateE[2], end[0], end[1]).getTime() / 1000;
    const formData = {
      title,
      description,
      startTime,
      endTime,
      address,
      lat: coords.lat,
      long: coords.lng,
      creator: props.user,
    };
    console.log(formData);
    return axios.post(`/event/new`, formData).then((response) => {
      console.log(response.data.data.id);
      //invite myself
      axios.post('/event/invite', {response: 'yes', userId: props.user, eventId: response.data.data.id})
      .then((data) => {
        console.log(data.data.data);
      })
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
          <input type="text" value={description} onChange={descriptionChange} />
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
          <div className="row">
            <label>Date:</label>
            <input type="date" value={date} onChange={dateChange} />
          </div>
          <div className="row">
            <label>Start Time:</label>
            <TimePicker onChange={setStartTime} value={startTimestamp} />
          </div>
          <div className="row">
            <label>End Time:</label>
            <TimePicker onChange={setEndTime} value={endTimestamp} />
          </div>
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
              <Map
                lat={coords.lat}
                lng={coords.lng}
                height={"400px"}
                zoom={18}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className={`${classes.center} row`}>
          <button className={classes.btn} type="submit">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;
