import React from "react";
import EventDate from "../EventDate";
import classes from "./EventPage.module.css";

const EventPage = () => {
  const date = new Date(1655147792 * 1000);
  return (
    <article className={classes.container}>
      <h3 className="row">Event Title</h3>
      <div className="row">
        <EventDate date={date} />
      </div>
      {/* {user === creatorId} */}
      <button>Accept</button>
      <button>Maybe</button>
      <button>Decline</button>
    </article>
  );
};

export default EventPage;
