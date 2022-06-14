import React, { useEffect, useState } from "react";
import MyEvent from "../components/MyEvent/MyEvent";
import axios from "axios";

const MyEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios
      .get(`/event/created/${props.user}`)
      .then((data) => {
        console.log(data.data);
        setEvents(data.data);
      })
      .then(setDeleted(false));
  }, [deleted, props.user]);

  const eventsList = events.map((event) => (
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
      <h2>My Events</h2>
      {eventsList}
    </>
  );
};

export default MyEvents;
