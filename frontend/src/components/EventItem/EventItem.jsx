import React, { useState } from "react";
import EventDate from "../EventDate";
import classes from "./EventItem.module.css";
import {
  acceptInvite,
  maybeInvite,
  rejectInvite,
} from "../../helpers/inviteResponse";
import { Link } from "react-router-dom";

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

  const acceptResponse = () => {
    acceptInvite(setInvite, props);
    props.setEventChange(true);
    props.setResponded(true);
  };

  const maybeResponse = () => {
    maybeInvite(setInvite, props);
    props.setEventChange(true);
    props.setResponded(true);
  };

  const declineResponse = () => {
    rejectInvite(setInvite, props);
    props.setEventChange(true);
    props.setResponded(true);
  };

  return (
    <div className={container} id={`${props.eventId}`}>
      <EventDate className="col" date={date} />
      <Link className={`${classes.fit}`} to={`/events/${props.eventId}`}>
        <button className={classes.btn}>OPEN EVENT</button>
      </Link>
      <h3 className={`${classes.title} col`}>{props.title}</h3>
      {invite === null && (
        <>
          <i
            onClick={declineResponse}
            className={`${icon} ${x} bi bi-x-lg col`}
          ></i>
          <i
            onClick={maybeResponse}
            className={`${icon} ${maybe} bi bi-question-lg col`}
          ></i>
          <i
            onClick={acceptResponse}
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
