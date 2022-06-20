import React, { useEffect, useState } from "react";
import PastEvent from "../components/PastEvent/PastEvent";
import axios from "axios";
import classes from "../pages/MainPage.module.css";

const PastEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [eventChange, setEventChange] = useState(false);
  const userId = props.user ? props.user : false;

  useEffect(() => {
    if (userId) {
      axios.get(`/event/all/${userId}`).then((d) => {
        console.log(d);
        setEvents(d.data);
      });
      setEventChange(false);
    } else {
      setEventChange(false);
    }
  }, [userId, eventChange]);

  const pastEvents = events
    .filter((event) => event.end_time - Date.now() / 1000 < 0)
    .map((event) => (
      <PastEvent
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        lat={event.lat}
        long={event.long}
      />
    ))
    .reverse();

  return (
    <>
      <h1 className={classes.invite_sections}>Past Events</h1>
      {pastEvents}
    </>
  );
};

export default PastEvents;
