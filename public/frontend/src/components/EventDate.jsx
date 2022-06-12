import React from "react";

import classes from "./EventDate.module.css";

const EventDate = (props) => {
  const month = props.date.toLocaleString("en-CA", { month: "long" });
  const day = props.date.toLocaleString("en-CA", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className={classes.date}>
      <div className={classes.date__month}>{month}</div>
      <div className={classes.date__year}>{year}</div>
      <div className={classes.date__day}>{day}</div>
    </div>
  );
};

export default EventDate;
