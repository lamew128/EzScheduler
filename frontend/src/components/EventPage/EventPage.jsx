import React, { useState } from "react";
import Map from "../../pages/Map";
import EventDate from "../EventDate";
import classes from "./EventPage.module.css";

const EventPage = (props) => {
  const [response, setResponse] = useState("Accept");
  const date = new Date(1655147792 * 1000);
  return (
    <article className={classes.container}>
      <h3 className={`${classes.title} row`}>
        {props.eventTitle}
      </h3>
      <div className="row">
        <div className="col">
          <button
            onClick={() => setResponse("Accept")}
            className={`${classes.btn} ${classes.accept}`}
          >
            Accept
          </button>
          <button
            onClick={() => setResponse("Maybe")}
            className={`${classes.btn} ${classes.maybe}`}
          >
            Maybe
          </button>
          <button
            onClick={() => setResponse("Decline")}
            className={`${classes.btn} ${classes.decline}`}
          >
            Decline
          </button>
        </div>
        <div className={`${classes.date} col`}>
          <EventDate date={date} />
        </div>
      </div>
      <div className="row">
        <p>
          Responded with: <strong>{response}</strong>
        </p>
        <p>
          Description: <strong>{props.eventDescription}</strong>
        </p>
        <p>
          Address: <strong>1 Yonge St., Toronto, ON</strong>
        </p>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          Invitees:
          <div className={classes.invitees}>
            <i className={`${classes.add} bi bi-plus-lg`}></i>
          </div>
        </div>
        <div className="col">
          Weather Information:
          <div className={classes.weather} />
        </div>
      </div>
      <hr />
      <div className="row">
        <Map lat={43.7181557} lng={-79.5181417} height={"400px"} zoom={15} />
      </div>
    </article>
  );
};

export default EventPage;
