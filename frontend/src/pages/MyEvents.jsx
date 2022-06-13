import React, { useEffect, useState } from "react";
import MyEvent from "../components/MyEvent/MyEvent";
import axios from "axios";

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/event/created/1").then((data) => {
      console.log(data.data);
      setEvents(data.data);
    });
  }, []);

  const eventsList = events.map((event) => (
    <MyEvent
      key={event.event_id}
      eventId={event.event_id}
      title={event.title}
      address={event.address}
      date={event.start_time}
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
