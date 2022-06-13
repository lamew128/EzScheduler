import React, { useEffect, useState } from "react";
import Button from "../components/CreateEventButton";
import UpcomingEvents from "../components/Upcoming/UpcomingEvents";
import EventItem from "../components/EventItem/EventItem";
import { Link } from "react-router-dom";
import axios from "axios";

const MainPage = (props) => {
  const [user, setUser] = useState("1");
  const [events, setEvents] = useState([]);
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    axios
      .get(`/event/all/${user}`)
      .then((event) => {
        console.log(event.data);
        setEvents(event.data);
      })
      .then(
        events.forEach((event) => {
          axios
            .get(`/event/invitees/${event.event_id}`)
            .then((invitees) => {
              const acceptedEvents = invitees.data.filter(
                (e) => String(e.user_id) === user
              );
              setAccepted((prev) => [...prev, acceptedEvents[0].event_id]);
            })
            .then(console.log(accepted));
        })
      );
  }, []);

  const acceptedEventsList = events.map((event) => (
    <EventItem
      key={event.event_id}
      eventId={event.event_id}
      title={event.title}
      date={event.start_time}
      address={event.address}
    />
  ));

  return (
    <>
      <Link to="/new">
        <Button>Create new event!</Button>
      </Link>
      <UpcomingEvents />
      <h3>My Events</h3>
      {acceptedEventsList}
      <h2>Open Invites</h2>
      <h2>Rejected Invites</h2>
    </>
  );
};

export default MainPage;
