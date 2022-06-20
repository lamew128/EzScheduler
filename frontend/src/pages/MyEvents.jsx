import React, { useEffect, useState } from "react";
import MyEvent from "../components/MyEvent/MyEvent";
import axios from "axios";
import classes from "../pages/MainPage.module.css";

const MyEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios
      .get(`/event/created/${props.user}`)
      .then((data) => {
        setEvents(data.data);
      })
      .then(setDeleted(false));
  }, [deleted, props.user]);

  const eventsList = events
    .filter((event) => event.end_time - Date.now() / 1000 >= 0)
    .map((event) => (
      <MyEvent
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        address={event.address}
        date={event.start_time}
        setDeleted={setDeleted}
      />
    ));

  return (
    <>
      <h1 className={classes.invite_sections}>My Events</h1>
      {eventsList}
    </>
  );
};

export default MyEvents;
