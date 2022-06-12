import React from "react";
import EventDate from "../EventDate";
import classes from "./MyEvent.module.css";

const MyEvent = (props) => {
  const date = new Date(props.date * 1000);

  const myEventClasses = `${classes.container} row`;

  return (
    <div className={myEventClasses}>
      <EventDate className="col" date={date} />
      <h3 className={`${classes.title} col`}>{props.title}</h3>
      <button className={`${classes.btn} col`}>Edit</button>
      <button className={`${classes.btn} col`}>Delete</button>
      <p className={`${classes.location} col`}>Location: {props.address}</p>
    </div>
  );
};

export default MyEvent;
