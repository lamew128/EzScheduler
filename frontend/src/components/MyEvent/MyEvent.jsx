import React from "react";
import EventDate from "../EventDate";
import classes from "./MyEvent.module.css";

const MyEvent = (props) => {
  const date = new Date("10-24-2022");

  const myEventClasses = `${classes.container} row`;

  return (
    <div className={myEventClasses}>
      <EventDate className="col" date={date} />
      <h3 className={`${classes.title} col`}>Event Title</h3>
      <button className={`${classes.btn} col`}>Edit</button>
      <button className={`${classes.btn} col`}>Delete</button>
      <p className={`${classes.location} col`}>Location: XXXXXX</p>
    </div>
  );
};

export default MyEvent;
