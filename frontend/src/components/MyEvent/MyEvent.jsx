import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventDate from "../EventDate";
import classes from "./MyEvent.module.css";

const MyEvent = (props) => {
  // Cancel Confirmation
  const [confirmation, setConfirmation] = useState(false);
  const date = new Date(props.date * 1000);

  const container = `${classes.container} row`;

  const deleteEvent = () => {
    // Axios Delete request
    props.setDeleted(true);
    axios.delete(`/event/${props.eventId}`);
  };

  return (
    <>
      <div className={container}>
        <EventDate className="col" date={date} />
        <Link className={`${classes.fit}`} to={`/events/${props.eventId}`}>
          <button className={classes.btn}>OPEN EVENT</button>
        </Link>
        <h3 className={`${classes.title} col`}>{props.title}</h3>
        <div className="col align-self-center text-center">
          {!confirmation && (
            <>
              <button className={classes.btn}>Edit</button>
              <button
                className={classes.btncancel}
                onClick={() => setConfirmation(true)}
              >
                Cancel Event
              </button>
            </>
          )}
          {confirmation && (
            <>
              <p className="p-0 m-0">
                <b>CONFIRM CANCELLATION?</b>
              </p>
              <button
                className={classes.btn}
                onClick={() => setConfirmation(false)}
              >
                No
              </button>
              <button className={classes.btncancel} onClick={deleteEvent}>
                Yes
              </button>
            </>
          )}
        </div>
        <p className={`${classes.location} col`}>Location: {props.address}</p>
      </div>
    </>
  );
};

export default MyEvent;
