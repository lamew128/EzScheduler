import React, { useState } from "react";
import EventDate from "../EventDate";
import classes from "./EventItem.module.css";

const MyEvent = (props) => {
  const date = new Date("10-24-2022");
  const [invite, setInvite] = useState("");

  const myEventClasses = `${classes.container} row`;

  const icon = classes.icon;
  const x = classes.x;
  const check = classes.check;
  const maybe = classes.maybe;
  const click = classes.clickable;

  const acceptInvite = () => {
    setInvite("accepted");
  };

  const maybeInvite = () => {
    setInvite("maybe");
  };

  const rejectInvite = () => {
    setInvite("rejected");
  };

  return (
    <div className={myEventClasses}>
      <EventDate className="col" date={date} />
      <h3 className={`${classes.title} col`}>Event Title</h3>
      {!invite && (
        <i
          onClick={rejectInvite}
          className={`${icon} ${x} ${click} bi bi-x-lg col`}
        ></i>
      )}
      {!invite && (
        <i
          onClick={maybeInvite}
          className={`${icon} ${maybe} ${click} bi bi-question-lg col`}
        ></i>
      )}
      {!invite && (
        <i
          onClick={acceptInvite}
          className={`${icon} ${check} ${click} bi bi-check-lg col`}
        ></i>
      )}
      {invite === "rejected" && (
        <i className={`${icon} ${x} bi bi-x-lg col`}></i>
      )}
      {invite === "maybe" && (
        <i className={`${icon} ${maybe} bi bi-question-lg col`}></i>
      )}
      {invite === "accepted" && (
        <i className={`${icon} ${check} bi bi-check-lg col`}></i>
      )}
      <p className={`${classes.location} col`}>Location: XXXXXX</p>
    </div>
  );
};

export default MyEvent;
