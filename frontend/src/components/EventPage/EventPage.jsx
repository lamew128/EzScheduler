import React, { useEffect, useState } from "react";
import Map from "../../pages/Map";
import EventDate from "../EventDate";
import classes from "./EventPage.module.css";

import {
  acceptInvite,
  maybeInvite,
  rejectInvite,
} from "../../helpers/inviteResponse";

const EventPage = (props) => {
  const [invite, setInvite] = useState(props.response);
  const [response, setResponse] = useState(props.response);

  const acceptResponse = () => {
    acceptInvite(setInvite, props);
    setResponse("Accepted");
  };

  const maybeResponse = () => {
    maybeInvite(setInvite, props);
    setResponse("Maybe");
  };

  const declineResponse = () => {
    rejectInvite(setInvite, props);
    setResponse("Declined");
  };

  const date = new Date(props.date * 1000);
  return (
    <article className={classes.container}>
      <h3 className={`${classes.title} row`}>{props.title}</h3>
      <div className="row">
        <div className="col">
          <button
            onClick={acceptResponse}
            className={`${classes.btn} ${classes.accept}`}
          >
            Accept
          </button>
          <button
            onClick={maybeResponse}
            className={`${classes.btn} ${classes.maybe}`}
          >
            Maybe
          </button>
          <button
            onClick={declineResponse}
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
          Responded with: <strong>{props.response}</strong>
        </p>
        <p>
          Description: <strong>{props.description}</strong>
        </p>
        <p>
          Address: <strong>{props.address}</strong>
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
