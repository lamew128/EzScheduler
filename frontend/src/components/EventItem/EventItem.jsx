import axios from "axios";
import React, { useState } from "react";
import EventDate from "../EventDate";
import classes from "./EventItem.module.css";

const MyEvent = (props) => {
  const date = new Date(Number(props.date) * 1000);
  const [invite, setInvite] = useState(props.response);

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
    axios
      .put("/event/response", {
        response: "yes",
        userId: props.cookies.user.id,
        eventId: props.eventId,
      })
      .then((data) => {
        console.log(data);
      });
    props.setEventChange(true);
  };

  const maybeInvite = () => {
    setInvite("maybe");
    // Axios request to send response MAYBE
    axios
      .put("/event/response", {
        response: "maybe",
        userId: props.cookies.user.id,
        eventId: props.eventId,
      })
      .then((data) => {
        console.log(data);
      });
    props.setEventChange(true);
  };

  const rejectInvite = () => {
    setInvite("no");
    axios
      .put("/event/response", {
        response: "no",
        userId: props.cookies.user.id,
        eventId: props.eventId,
      })
      .then((data) => {
        console.log(data);
      });
    props.setEventChange(true);
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
