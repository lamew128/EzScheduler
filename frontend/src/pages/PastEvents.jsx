import React, { useEffect, useState } from "react";
import PastEvent from "../components/PastEvent/PastEvent";
import axios from "axios";


const PastEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const [eventChange, setEventChange] = useState(false);
  const userId = props.user ? props.user : false;


  useEffect(() => {
    if (userId) {
      axios.get(`/event/all/${userId}`).then((d) => {
        console.log(d);
        setEvents(d.data);
      });
      setShowEvents(true);
      setEventChange(false);
    } else {
      setShowEvents(false);
      setEventChange(false);
    }
  }, [userId, eventChange]);
  console.log(props);
  console.log(userId);
  console.log(events);
  console.log(Date.now()/1000);

  const pastEvents = events
    .filter(
      (event) =>
        event.end_time - Date.now() / 1000 < 0
    )
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
    )).reverse();

  return (
    <>
      <h2>Past Events</h2>
      {pastEvents}
    </>
  );
};

export default PastEvents;

