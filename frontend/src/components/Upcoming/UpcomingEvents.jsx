import React, { useEffect, useState } from "react";
import axios from "axios";
import EventDate from "../EventDate";
import Weather from "../Weather";

import classes from "./UpcomingEvents.module.css";

const UpcomingEvents = (props) => {
  const [list, setList] = useState([]);
  const date = new Date(props.date * 1000);

  useEffect(() => {
    axios.get(`/event/invitees/${props.eventId}`).then((d) => {
      setList(d.data);
    });
  }, [props.eventId]);

  const timestampToTime = (time) => {
    const date = new Date(time * 1000).toLocaleString("en-US", {
      month:"long",
      day:"numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    return date;
  };
  
  const going = list.filter((invitee) => invitee.response === "yes").length;

  return (
    <article className={classes["upcoming-events"]}>
      <section>
        <div className="row">
          <div className="col">
            <header className={classes.title}>
              <h3>Upcoming Events</h3>
            </header>
            <div className={`col`}>
              <div>{props.description}</div>
              <div>Location: {props.address}</div>
              <div>Event Starting At:{timestampToTime(props.start_time)}</div>
              <div>Event Ending At:{timestampToTime(props.end_time)}</div>
            </div>
            <div className={`${classes.content} d-flex`}>
              <h3 className={classes.title__event}>{props.title}</h3>
              <section className={classes.weather}>
                <h4>Weather</h4>
                <Weather lat={props.lat} long={props.long} date={props.date} />
              </section>
            </div>
          </div>
          <div className={`${classes.date__invitees} col-2`}>
            <EventDate date={date} />
            {going > 1 && <p>{going} people are going</p>}
            {going === 1 && <p>{going} person is going</p>}
          </div>
        </div>
      </section>
    </article>
  );
};

export default UpcomingEvents;
