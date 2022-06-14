import React, { useEffect, useState } from "react";
import Button from "../components/CreateEventButton";
import UpcomingEvents from "../components/Upcoming/UpcomingEvents";
import EventItem from "../components/EventItem/EventItem";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";


const MainPage = (props) => {
  const [cookies, setCookie] = useCookies(["user"]);
  console.log(cookies)
  let userId = cookies.user.id;
  console.log(userId)
  const [user, setUser] = useState(userId);
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

  useEffect(() => {
    console.log(cookies)
  }, [cookies])

  const upcomingEvents = events
  .filter(event => event.start_time - Date.now()/1000 <= 388800)         
  .map((event) => (
    <UpcomingEvents
      key={event.event_id}
      eventId={event.event_id}
      title={event.title}
      date={event.start_time}
      address={event.address}
    />
  ));



  const acceptedEventsList = events
  .filter(event => event.response === "yes")
  .map((event) => (
    <EventItem
      key={event.event_id}
      eventId={event.event_id}
      title={event.title}
      date={event.start_time}
      address={event.address}
    />
  ));

  const notRespondedEventsList = events
  .filter(event => event.response === null)
  .map((event) => (
    <EventItem
      key={event.event_id}
      eventId={event.event_id}
      title={event.title}
      date={event.start_time}
      address={event.address}
    />
  ));

  const maybeEventsList =  events
  .filter(event => event.response === "maybe")
  .map((event) => (
    <EventItem
      key={event.event_id}
      eventId={event.event_id}
      title={event.title}
      date={event.start_time}
      address={event.address}
    />
  ));

  const rejectedEventsList = events
  .filter(event => event.response === "no")
  .map((event) => (
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
      {upcomingEvents}
      <h3>My Events</h3>
      {acceptedEventsList}
      <h2>Open Invites</h2>
      {notRespondedEventsList}
      {maybeEventsList}
      <h2>Rejected Invites</h2>
      {rejectedEventsList}
    </>
  );
};

export default MainPage;
