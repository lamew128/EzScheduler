import React from "react";
import EventDate from "../EventDate";
import classes from "./EventPage.module.css";

const EventPage = () => {
  const date = new Date(1655147792 * 1000);
  return (
    <article className={classes.container}>
      <h3 className="row">Event Title</h3>
      <div className="row">
        <div className="col">
          <button className={classes.btn}>Accept</button>
          <button className={classes.btn}>Maybe</button>
          <button className={classes.btn}>Decline</button>
        </div>
        <div className="col">
          <EventDate date={date} />
        </div>
      </div>
      {/* {user === creatorId} */}
    </article>
  );
};

export default EventPage;
