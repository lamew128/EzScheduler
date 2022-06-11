import React from "react";
import EventDate from "../EventDate";
import classes from "./MyEvent.module.css";

const MyEvent = (props) => {
  const date = new Date("10-24-2022");

  const myEventClasses = `${classes.container} row`;

  const icon = classes.icon;
  const x = classes.x;
  const check = classes.check;
  const maybe = classes.maybe;

  return (
    <div className={myEventClasses}>
      <EventDate className="col" date={date} />
      <h3 className={`${classes.title} col`}>Event Title</h3>
      {props.choice === 'rejected' && <i className={`${icon} ${x} bi bi-x-lg col`}></i>}
      {props.choice === 'maybe' && <i className={`${icon} ${maybe} bi bi-question-lg col`}></i>}
      {props.choice === 'accepted' &&<i className={`${icon} ${check} bi bi-check-lg col`}></i>}
      <p className={`${classes.location} col`}>Location: XXXXXX</p>
    </div>
  );
};

export default MyEvent;
