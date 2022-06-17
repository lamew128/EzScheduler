import React, { useEffect, useState } from "react";
import Map from "../Map";
import EventDate from "../EventDate";
import classes from "./EventPage.module.css";
import axios from "axios";

import {
  acceptInvite,
  maybeInvite,
  rejectInvite,
} from "../../helpers/inviteResponse";
import Weather from "../Weather";
import { Link } from "react-router-dom";

const EventPage = (props) => {
  const [response, setResponse] = useState(props.response);
  const [confirmation, setConfirmation] = useState(false);
  const [inviteesList, setInviteesList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [creator, setCreator] = useState("");
  const [newInvitee, setNewInvitee] = useState(false);
  const [invitee, setInvitee] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dynamicList, setDynamicList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [inviteesEmail, setInviteesEmail] = useState([]);
  const isCreator = props.cookies.user.id === props.creator;

  const deleteEvent = () => {
    // Axios Delete request
    axios.delete(`/event/${props.eventId}`);
  };

  const acceptResponse = () => {
    acceptInvite(setResponse, props);
    setResponse("yes");
  };

  const maybeResponse = () => {
    maybeInvite(setResponse, props);
    setResponse("maybe");
  };

  const declineResponse = () => {
    rejectInvite(setResponse, props);
    setResponse("no");
  };

  const inviteeChange = (e) => {
    setInvitee(e.target.value);
    setOpenDropDown(true);
  };

  const addInvitee = (p) => {
    if (invitee.trim() === "") {
      alert("Please fill out with the information!");
      return;
    }
    if (inviteesEmail.includes(p.email.trim())) {
      alert("You cannot add the same user!");
      return;
    }
    console.log(p.email, props.eventId);
    setNameList((prev) => [...prev, p]);
    setNewInvitee(false);
    setOpenDropDown(false);
    setInvitee("");
  };

  const addButton = (e) => {
    e.preventDefault();
    if (invitee.trim() === "") {
      alert("Please fill out with the information!");
      return;
    }
    if (inviteesEmail.includes(invitee.trim())) {
      alert("You cannot add the same user!");
      return;
    }
    if (!invitee.trim().includes("@")) {
      alert("Please enter a valid e-mail!");
      return;
    }
    console.log(invitee);
    setNameList((prev) => [...prev, invitee]);
    setNewInvitee(false);
    setOpenDropDown(false);
    setInvitee("");
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

  useEffect(() => {
    axios
      .get(`/users/info/${props.creator}`)
      .then((res) => setCreator(res.data.data.name));
  }, [props.creator]);

  useEffect(() => {
    axios
      .get(`/event/invitees/${props.eventId}`)
      .then((res) => setInviteesList(res.data));
  }, [props.eventId]);

  // Setting the name invitees list from user ID
  useEffect(() => {
    inviteesList.forEach((invitee) => {
      axios.get(`/users/info/${invitee.user_id}`).then((res) => {
        setNameList((prev) => [
          ...prev,
          { userId: invitee.user_id, data: res.data.data },
        ]);
        setInviteesEmail((prev) => [...prev, res.data.data.email]);
      });
    });
  }, [inviteesList]);

  // Setting up the list with names
  useEffect(() => {
    const deleteInvitee = (invitee) => {
      console.log(invitee)
      console.log(inviteesList);
      console.log(props.eventId);
      const newList = nameList.filter((elem) => {
        const inviteeName = !elem.name ? elem : elem.name;
        return inviteeName !== invitee;
      });
      // axios.delete('/event/invite', {userId: , eventId: props.eventId})
      setNameList(newList);
    };

    const list = nameList.map((invitee) => {
      console.log(invitee);
      const keyProp = !invitee.data.email ? invitee.data : invitee.data.email;
      console.log(keyProp);
      // const nameProp = !invitee.name ? invitee : invitee.name;
      return (
        <div key={keyProp} className={classes.list_item}>
          <p className={classes.p_fix}>{invitee.data.name}</p>
          <button
            onClick={() => deleteInvitee(invitee.data)}
            className={`${classes.btn} ${classes.delete}`}
          >
            <i className={`bi bi-x-lg col`}></i>
          </button>
        </div>
      );
    });
    setShowList(list);
  }, [nameList, inviteesList, props.eventId]);

  useEffect(() => {
    if (invitee.trim() === "") {
      setOpenDropDown(false);
    }
  }, [invitee]);

  const date = new Date(props.date * 1000);

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
    <article className={classes.container}>
      <h3 className={`${classes.title} row`}>
        {props.title}{" "}
        {isCreator && (
          <Link
            style={{ width: "fit-content" }}
            to={`/events/${props.eventId}/edit`}
          >
            Edit
            {/* <button>EDIT</button> */}
          </Link>
        )}
        <p>Created by {creator}</p>
      </h3>
      <div className="row">
        <div className="col">
          {!isCreator && (
            <>
              <button
                onClick={acceptResponse}
                className={`${classes.btn} ${classes.accept}`}
              >
                Accept
              </button>
              <button
                onClick={maybeResponse}
                className={`${classes.btn} ${classes.maybe}`}
              >
                Maybe
              </button>
              <button
                onClick={declineResponse}
                className={`${classes.btn} ${classes.decline}`}
              >
                Decline
              </button>
            </>
          )}
          {isCreator && !confirmation && (
            <>
              <button
                onClick={() => setConfirmation(true)}
                className={`${classes.btn} ${classes.decline}`}
              >
                CANCEL EVENT
              </button>
            </>
          )}
          {confirmation && (
            <>
              <button
                onClick={() => setConfirmation(false)}
                className={`${classes.btn} ${classes.accept}`}
              >
                CANCEL
              </button>
              <Link to="/">
                <button
                  onClick={deleteEvent}
                  className={`${classes.btn} ${classes.decline}`}
                >
                  CONFIRM DELETION
                </button>
              </Link>
            </>
          )}
        </div>
        <div className={`${classes.date} col`}>
          <EventDate date={date} />
        </div>
      </div>
      <div className="row">
        {response === "yes" && (
          <p>
            Responded with: <strong>Accepted</strong>
          </p>
        )}
        {response === "no" && (
          <p>
            Responded with: <strong>Declined</strong>
          </p>
        )}
        {response === "maybe" && (
          <p>
            Responded with: <strong>Maybe</strong>
          </p>
        )}
        <p>
          Description: <strong>{props.description}</strong>
        </p>
        <p>
          Address: <strong>{props.address}</strong>
        </p>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          Invitees:
          <div className={classes.invitees}>
            {showList}
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
            {isCreator && (
              <i
                onClick={() => setNewInvitee(true)}
                className={`${classes.add} bi bi-plus-lg`}
              ></i>
            )}
          </div>
        </div>
        <div className="col">
          Weather Information:
          <div className={classes.weather}>
            <Weather lat={props.lat} long={props.long} date={props.date} />
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <Map lat={props.lat} lng={props.long} height={"400px"} zoom={15} />
      </div>
    </article>
  );
};

export default EventPage;
