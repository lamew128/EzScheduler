import React, { useEffect, useState } from "react";
import Button from "../components/CreateEventButton";
import UpcomingEvents from "../components/Upcoming/UpcomingEvents";
import EventItem from "../components/EventItem/EventItem";
import Notification from "../components/Notification/Notification";
import { Link } from "react-router-dom";
import axios from "axios";

const MainPage = (props) => {
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const [eventChange, setEventChange] = useState(false);
  const userId = props.cookies.user ? props.cookies.user.id : false;

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
  }, [userId, props.cookies.user, eventChange]);

  console.log(Date.now()/1000);
  const upcomingEvents = events
    .filter(
      (event) =>
        
        event.start_time - Date.now() / 1000 <= 388800 &&
        event.end_time - Date.now() / 1000 >= 0
    )
    .map((event) => (
      <UpcomingEvents
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        lat={event.lat}
        long={event.long}
      />
    ));
    console.log("events:");
    console.log(events);

  const acceptedEventsList = events
    .filter((event) =>
     event.response === "yes" &&
     event.end_time - Date.now() / 1000 >= 0
     )
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  const notRespondedEventsList = events
    .filter((event) => 
    event.response === null &&
    event.end_time - Date.now() / 1000 >= 0
    )
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));
  

  const maybeEventsList = events
    .filter((event) => 
    event.response === "maybe" &&
    event.end_time - Date.now() / 1000 >= 0
    )
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  const notificationList = events
  .filter((event) => 
  event.response === null &&
  event.end_time - Date.now() / 1000 >= 0
  )
  .map((event) => (
    <Notification
      cookies={props.cookies}
      setCookie={props.setCookie}
      removeCookie={props.removeCookie}
      key={event.event_id}
      eventId={event.event_id}
      creator={event.creator}
      title={event.title}
      date={event.start_time}
      address={event.address}
      response={event.response}
      setEventChange={setEventChange}
    />
  ));

  const rejectedEventsList = events
    .filter((event) => 
    event.response === "no" &&
    event.end_time - Date.now() / 1000 >= 0
    )
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  return (
    <>
      {showEvents && (
        <>
          {notificationList}
          <Link to="/new">
            <Button>Create new event!</Button>
          </Link>
          {upcomingEvents}
          <h3>My Events (Accepted)</h3>
          {acceptedEventsList}
          <h2>Open Invites</h2>
          {notRespondedEventsList}
          {maybeEventsList}
          <h2>Rejected Invites</h2>
          {rejectedEventsList}
        </>
      )}
      {!showEvents && <h3>Please Login to See Your Events</h3>}
    </>
  );
};

export default MainPage;
