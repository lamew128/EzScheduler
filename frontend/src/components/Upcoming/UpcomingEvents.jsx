import React, { useEffect, useState } from "react";
import axios from "axios";
import EventDate from "../EventDate";
import Weather from "../Weather";

import classes from "./UpcomingEvents.module.css";
import { Link } from "react-router-dom";

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
      month: "long",
      day: "numeric",
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
            <div className={`${classes.content} row d-flex`}>
              <div className="col">
                <h3 className={classes.title__event}>{props.title}</h3>
                <p className={classes.description}>{props.description}</p>
                <p>Location: {props.address}</p>
                <p>Event Starting On: {timestampToTime(props.start_time)}</p>
                <p>Event Ending On: {timestampToTime(props.end_time)}</p>
              </div>
              <div className={`${classes.open_event_btn} col`}>
                <Link
                  className={`${classes.fit}`}
                  to={`/events/${props.eventId}`}
                >
                  <button className={classes.btn}>OPEN EVENT</button>
                </Link>
              </div>
              <div className={`${classes.weather_section} col`}>
                <section className={classes.weather}>
                  <h4>
                    <strong>WEATHER</strong>
                  </h4>
                  <Weather
                    lat={props.lat}
                    long={props.long}
                    date={props.date}
                  />
                </section>
              </div>
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
