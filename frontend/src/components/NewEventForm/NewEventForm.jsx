import React, { useEffect, useState } from "react";
import classes from "./NewEventForm.module.css";
import Map from "../Map";
import axios from "axios";
import TimePicker from "react-time-picker";
import { Link } from "react-router-dom";

const NewEvent = (props) => {
  const [coords, setCoords] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [startTimestamp, setStartTime] = useState("");
  const [endTimestamp, setEndTime] = useState("");
  const [invitee, setInvitee] = useState("");
  const [newInvitee, setNewInvitee] = useState(false);
  const [inviteesList, setInviteesList] = useState([]);
  const [inviteesListSubmission, setInviteesListSubmission] = useState([]);
  const [dynamicList, setDynamicList] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);

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

  const inviteeChange = (e) => {
    setInvitee(e.target.value);
    setOpenDropDown(true);
  };

  useEffect(() => {
    axios.get(`/users/test`).then((e) => {
      const list = e.data.filter(
        (user) =>
          user.email.toLowerCase().includes(invitee.toLowerCase()) ||
          user.name.toLowerCase().includes(invitee.toLowerCase())
      );
      setDynamicList(list);
    });
  }, [invitee]);

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
    const dateE = date.split("-");
    const start = startTimestamp.split(":");
    const startTime =
      new Date(
        dateE[0],
        Number(dateE[1]) - 1,
        dateE[2],
        start[0],
        start[1]
      ).getTime() / 1000;
    const end = endTimestamp.split(":");
    const endTime =
      new Date(
        dateE[0],
        Number(dateE[1]) - 1,
        dateE[2],
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
      creator: props.user,
      invitees: inviteesListSubmission,
    };
    console.log(formData);
    console.log(inviteesListSubmission);

    const allUsersData = await axios.get(`/users/test`);
    const allUsers = allUsersData.data;
    //create the event
    const response = await axios.post(`/event/new`, formData);
    const eventId = response.data.data.id;
    //invite myself
    const data = await axios.post("/event/invite", {
      response: "yes",
      userId: props.user,
      eventId: response.data.data.id,
    });
    //invite others with fake email array
    // email Array will be an input from the form. put in dummy place hoder for now
    const emailArray = inviteesListSubmission;
    const userIdArray = allUsers
      .filter((user) => emailArray.includes(user.email))
      .map((user) => user.id);
    const axiosCalls = userIdArray.map((userId) =>
      axios.post(`/event/invite`, {
        response: null,
        userId,
        eventId,
      })
    );
    Promise.all(axiosCalls).then((data) => {
      //  console.log("promise all succeeded!");
      console.log(data[0]);
      console.log(data[1]);
    });
  };

  const addInvitee = (p) => {
    if (invitee.trim() === "") {
      alert("Please fill out with the information!");
      return;
    }
    if (inviteesListSubmission.includes(p.email.trim())) {
      alert("You cannot add the same user!");
      return;
    }
    setInviteesList((prev) => [...prev, p.name]);
    setNewInvitee(false);
    setInviteesListSubmission((prev) => [...prev, p.email]);
    setOpenDropDown(false);
    setInvitee("");
  };

  const addButton = (e) => {
    e.preventDefault();
    if (invitee.trim() === "") {
      alert("Please fill out with the information!");
      return;
    }
    if (inviteesListSubmission.includes(invitee.trim())) {
      alert("You cannot add the same user!");
      return;
    }
    if (!invitee.trim().includes("@")) {
      alert("Please enter a valid e-mail!");
      return;
    }
    setInviteesList((prev) => [...prev, invitee]);
    setNewInvitee(false);
    setInviteesListSubmission((prev) => [...prev, invitee]);
    setOpenDropDown(false);
    setInvitee("");
  };

  useEffect(() => {
    if (invitee.trim() === "") {
      setOpenDropDown(false);
    }
  }, [invitee]);

  const list = inviteesList.map((invitee) => (
    <div className={classes.list_item}>
      <p className={classes.p_fix} key={invitee}>{invitee}</p>
      <button className={`${classes.btn} ${classes.delete}`}>
        <i className={`bi bi-x-lg col`}></i>
      </button>
    </div>
  ));

  const addList = dynamicList.map((p) => (
    <p
      className={classes.list_name}
      onClick={() => addInvitee(p)}
      key={p.email}
    >
      {p.name} ({p.email})
    </p>
  ));

  return (
    <div className={classes.container}>
      <h3 className="row">New Event</h3>
      <form className="row">
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
              {list}
              {newInvitee && (
                <div className="row align-items-center justify-content-center">
                  <input
                    className={classes.invitee_form}
                    value={invitee}
                    onChange={inviteeChange}
                    required
                  />
                  <button onClick={addButton} className={classes.btn_add}>
                    ADD
                  </button>
                </div>
              )}
              {openDropDown && (
                <div className={`${classes.dropdown} row`}>
                  <div className={classes["dropdown-content"]}>{addList}</div>
                </div>
              )}
              <i
                onClick={() => setNewInvitee(true)}
                className={`${classes.add} bi bi-plus-lg`}
              ></i>
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
          <Link to="/">
            <button className={classes.btn} onClick={submitHandler}>
              Create Event
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;
