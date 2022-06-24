import React, { useEffect, useState } from "react";
import classes from "./EditEventForm.module.css";
import Map from "../Map";
import axios from "axios";
import TimePicker from "react-time-picker";
import { useHistory } from "react-router-dom";

const EditEventForm = (props) => {
  const [coords, setCoords] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [startTimestamp, setStartTime] = useState("");
  const [endTimestamp, setEndTime] = useState("");

  let history = useHistory();
  const redirectToHome = () => {
    history.push("/my-events");
  };

  const addressChange = (e) => {
    setAddress(e.target.value);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const dateStartChange = (e) => {
    setDateStart(e.target.value);
  };

  const dateEndChange = (e) => {
    setDateEnd(e.target.value);
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
  const submitHandler = async (e) => {
    e.preventDefault();

    const dateStartE = dateStart.split("-");
    const dateEndE = dateEnd.split("-");

    if (
      title.trim() === "" ||
      description.trim() === "" ||
      address.trim() === "" ||
      dateStartE === "" ||
      dateEndE === "" ||
      startTimestamp === "" ||
      endTimestamp === ""
    ) {
      alert("Please fill out the empty fields!");
      return;
    }

    const start = startTimestamp.split(":");
    const startTime =
      new Date(
        dateStartE[0],
        Number(dateStartE[1]) - 1,
        dateStartE[2],
        start[0],
        start[1]
      ).getTime() / 1000;

    const end = endTimestamp.split(":");
    const endTime =
      new Date(
        dateEndE[0],
        Number(dateEndE[1]) - 1,
        dateEndE[2],
        end[0],
        end[1]
      ).getTime() / 1000;

    const formData = {
      title,
      description,
      startTime,
      endTime,
      address,
      lat: coords.lat,
      long: coords.lng,
      creator: props.creator,
      id: props.eventId,
    };
    axios.put(`/event`, formData).then((data) => {

    });
    redirectToHome();
  };

  useEffect(() => {
    setTitle(props.title);
    setDescription(props.description);
    setAddress(props.address);
    setDateStart(humanStartDate);
    setDateEnd(humanEndDate);
    setStartTime(humanStartDayTime);
    setEndTime(humanEndDayTime);
    setCoords({ lat: props.lat, lng: props.long });
  }, []);

  //fixing time display
  const humanStartTime = new Date(props.start_time * 1000);
  const humanEndTime = new Date(props.end_time * 1000);

  const humanStartYear = humanStartTime.getFullYear();
  const humanStartMonth = (humanStartTime.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const humanStart = humanStartTime.getDate().toString().padStart(2, "0");

  const humanEndYear = humanEndTime.getFullYear();
  const humanEndMonth = (humanEndTime.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const humanEnd = humanEndTime.getDate().toString().padStart(2, "0");

  const humanStartDate = `${humanStartYear}-${humanStartMonth}-${humanStart}`;
  const humanEndDate = `${humanEndYear}-${humanEndMonth}-${humanEnd}`;

  const humanStartHour = humanStartTime.getHours().toString().padStart(2, "0");
  const humanStartMinute = humanStartTime
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const humanStartDayTime = `${humanStartHour}:${humanStartMinute}`;

  const humanEndHour = humanEndTime.getHours().toString().padStart(2, "0");
  const humanEndMinute = humanEndTime.getMinutes().toString().padStart(2, "0");
  const humanEndDayTime = `${humanEndHour}:${humanEndMinute}`;

  return (
    <article className={classes.container}>
      <h1 className={`${classes.new_event_title} row`}>Edit Event</h1>
      <form className="row">
        <div className={`${classes.inputs} col`}>
          <label>Title:</label>
          <input
            className={classes.input_form}
            type="text"
            value={title}
            onChange={titleChange}
          />
          <label>Description:</label>
          <input
            className={classes.input_form}
            type="text"
            value={description}
            onChange={descriptionChange}
          />
          <label>Address:</label>
          <input
            className={classes.input_form}
            type="text"
            value={address}
            onChange={addressChange}
            onBlur={getLocation}
            name="address"
          />
        </div>
        <div className="col-3">
          <div className="row">
            <label>Start Date:</label>
            <input
              className={classes.input_form_date}
              type="date"
              value={dateStart}
              onChange={dateStartChange}
            />
          </div>
          <div className="row">
            <label>Start Time:</label>
            <TimePicker
              className={classes.input_form_time}
              onChange={setStartTime}
              value={startTimestamp}
            />
          </div>
          <div className="row">
            <label>End Date:</label>
            <input
              className={classes.input_form_date}
              type="date"
              value={dateEnd}
              onChange={dateEndChange}
            />
          </div>
          <div className="row">
            <label>End Time:</label>
            <TimePicker
              className={classes.input_form_time}
              onChange={setEndTime}
              value={endTimestamp}
            />
          </div>
        </div>
        <hr className="mt-3" />
        <div className="row mb-3">
          <div className="col-12">
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
          <button type="submit" className={classes.btn} onClick={submitHandler}>
            Edit Event
          </button>
        </div>
      </form>
    </article>
  );
};

export default EditEventForm;
