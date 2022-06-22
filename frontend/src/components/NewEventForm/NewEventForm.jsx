import React, { useEffect, useState } from "react";
import classes from "./NewEventForm.module.css";
import Map from "../Map";
import axios from "axios";
import TimePicker from "react-time-picker";
import { useHistory } from "react-router-dom";

const NewEvent = (props) => {
  const [coords, setCoords] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [startTimestamp, setStartTime] = useState("");
  const [endTimestamp, setEndTime] = useState("");
  const [invitee, setInvitee] = useState("");
  const [newInvitee, setNewInvitee] = useState(false);
  const [inviteesList, setInviteesList] = useState([]);
  const [dynamicList, setDynamicList] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [showList, setShowList] = useState([]);

  let history = useHistory();
  const redirectToHome = () => {
    history.push("/my-events");
  };

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

  const dateStartChange = (e) => {
    setDateStart(e.target.value);
  };

  const dateEndChange = (e) => {
    setDateEnd(e.target.value);
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const inviteeChange = (e) => {
    setInvitee(e.target.value);
    setOpenDropDown(true);
  };

  useEffect(() => {
    axios.get(`/users`).then((e) => {
      const list = e.data.filter(
        (user) =>
          user.email.toLowerCase().includes(invitee.toLowerCase()) ||
          user.name.toLowerCase().includes(invitee.toLowerCase())
      );
      setDynamicList(list);
    });
  }, [invitee]);

  const getLocation = () => {
    if (address.trim() === "") {
      return;
    }
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

  const inviteeFormBlur = () => {
    if (invitee.trim() === "") {
      setNewInvitee(false);
    }
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
      creator: props.user,
    };
    console.log(formData);

    const allUsersData = await axios.get(`/users`);
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
    
    const emailArray = inviteesList.map((e) => e.email);

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
    //send an email to all invitees
    axios.post(`/event/email`,{
      emailArray: emailArray,
      title: formData.title,
      description: formData.description
    });
    Promise.all(axiosCalls).then((data) => {
      //  console.log("promise all succeeded!");
      console.log(data[0]);
      console.log(data[1]);
    });
    redirectToHome();
  };

  const addInvitee = (p) => {
    if (invitee.trim() === "") {
      alert("Please fill out with the information!");
      return;
    }
    let notAdd = true;
    inviteesList.forEach((elem) => {
      if (elem.email === p.email.trim()) {
        alert("You cannot add the same user!");
        notAdd = false;
      }
    });
    if (!notAdd) return;
    if (p.id === props.user) {
      alert("You cannot add yourself!");
      return;
    }
    setInviteesList((prev) => [...prev, p]);
    setNewInvitee(false);
    setOpenDropDown(false);
    setInvitee("");
  };

  useEffect(() => {
    if (invitee.trim() === "") {
      setOpenDropDown(false);
    }
  }, [invitee]);

  useEffect(() => {
    const deleteInvitee = (e, inv) => {
      e.preventDefault();
      const newList1 = inviteesList.filter((elem) => elem.name !== inv.name);
      console.log(inviteesList);
      setInviteesList(newList1);
    };

    const list = inviteesList.map((invitee) => (
      <div key={invitee.email} className={classes.list_item}>
        <p className={classes.p_fix}>{invitee.name}</p>
        <button
          onClick={(e) => deleteInvitee(e, invitee)}
          className={`${classes.btn} ${classes.delete}`}
        >
          <i className={`bi bi-x-lg col`}></i>
        </button>
      </div>
    ));
    setShowList(list);
  }, [inviteesList]);

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
      <h1 className={`${classes.new_event_title} row`}>New Event</h1>
      <form className="row justify-content-center">
        <div className={`${classes.inputs} col`}>
          <label>Title:</label>
          <input
            className={classes.input_form}
            type="text"
            value={title}
            onChange={titleChange}
            required
          />
          <label>Description:</label>
          <input
            className={classes.input_form}
            type="text"
            value={description}
            onChange={descriptionChange}
            required
          />
          <label>Location:</label>
          <input
            className={classes.input_form}
            type="text"
            value={address}
            onChange={addressChange}
            onBlur={getLocation}
            name="address"
            required
          />
        </div>
        <div className="col-3">
          <div className="row">
            <label>Date:</label>
            <input
              className={classes.input_form_date}
              type="date"
              value={dateStart}
              onChange={dateStartChange}
              required
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
        <div className="row mb-4">
          <div className="col-4">
            <h4>INVITEES</h4>
            <div className={classes.invitees}>
              {showList}
              {newInvitee && (
                <div className="row align-items-center justify-content-center">
                  <input
                    className={classes.invitee_form}
                    value={invitee}
                    onChange={inviteeChange}
                    onBlur={inviteeFormBlur}
                    required
                  />
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
            <h4>MAP</h4>
            <Map lat={coords.lat} lng={coords.lng} height={"400px"} zoom={18} />
          </div>
        </div>
        <hr />
        <div className={`${classes.center} row`}>
          <button type="submit" className={classes.btn} onClick={submitHandler}>
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;
