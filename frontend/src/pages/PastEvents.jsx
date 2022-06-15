import React, { useEffect, useState } from "react";
import MyEvent from "../components/MyEvent/MyEvent";
import axios from "axios";


const PastEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const [eventChange, setEventChange] = useState(false);
  const userId = props.user ? props.user : false;

  useEffect(() => {
    if (userId) {
      axios.get(`/event/all/${userId}`).then((d) => {
        setEvents(d.data);
      });
      setShowEvents(true);
      setEventChange(false);
    } else {
      setShowEvents(false);
      setEventChange(false);
    }
  }, [userId, eventChange]);

  const pastEvents = events
    .filter(
      (event) =>
        event.end_time - Date.now() / 1000 < 0
    )
    .map((event) => (
      <MyEvent
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        lat={event.lat}
        long={event.long}
      />
    ));

  return (
    <>
      <h2>PastEvents</h2>
      {pastEvents}
    </>
  );
};

export default PastEvents;

