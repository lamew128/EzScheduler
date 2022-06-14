import axios from "axios";
import React, { useState } from "react";
import EventDate from "../EventDate";
import classes from "./EventItem.module.css";
import { useCookies } from "react-cookie";

const MyEvent = (props) => {
  const date = new Date(Number(props.date) * 1000);
  const [invite, setInvite] = useState(props.response);
  const [cookies] = useCookies(["user"]);

  // CSS Classes
  const container = `${classes.container} row`;
  const icon = classes.icon;
  const x = classes.x;
  const check = classes.check;
  const maybe = classes.maybe;

  const changeInvite = () => {
    setInvite(null);
  };

  const acceptInvite = () => {
    setInvite("yes");
    // Axios request to send response YES
    axios.put('/event/response', { response: 'yes', userId: cookies.user.id, eventId: props.eventId})
    .then((data) => {
      console.log(data);
      console.log(`YES, EVENT: ${props.eventId}, ${cookies.user}`)
    });
    props.setEventChange(true)
  };

  const maybeInvite = () => {
    setInvite("maybe");
    // Axios request to send response MAYBE
    axios.put('/event/response', { response: 'maybe', userId: cookies.user.id, eventId: props.eventId})
    .then((data) => {
      console.log(data);
      console.log(`MAYBE, EVENT: ${props.eventId}`)
    });
    props.setEventChange(true)
  };

  const rejectInvite = () => {
    setInvite("no");
    // Axios request to send response NO
    axios.put('/event/response', { response: 'no', userId: cookies.user.id, eventId: props.eventId})
    .then((data) => {
      console.log(data);
      console.log(`NO, EVENT: ${props.eventId}`)
    });
    props.setEventChange(true)
  };

  return (
    <div className={container}>
      <EventDate className="col" date={date} />
      <h3 className={`${classes.title} col`}>{props.title}</h3>
      {invite === null && (
        <>
          <i
            onClick={rejectInvite}
            className={`${icon} ${x} bi bi-x-lg col`}
          ></i>
          <i
            onClick={maybeInvite}
            className={`${icon} ${maybe} bi bi-question-lg col`}
          ></i>
          <i
            onClick={acceptInvite}
            className={`${icon} ${check} bi bi-check-lg col`}
          ></i>
        </>
      )}
      {invite === "no" && (
        <i onClick={changeInvite} className={`${icon} ${x} bi bi-x-lg col`}></i>
      )}
      {invite === "maybe" && (
        <i
          onClick={changeInvite}
          className={`${icon} ${maybe} bi bi-question-lg col`}
        ></i>
      )}
      {invite === "yes" && (
        <i
          onClick={changeInvite}
          className={`${icon} ${check} bi bi-check-lg col`}
        ></i>
      )}
      <p className={`${classes.location} col`}>Location: {props.address}</p>
    </div>
  );
};

export default MyEvent;
