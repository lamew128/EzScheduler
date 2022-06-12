import React from "react";
import Button from "../components/CreateEventButton";
import UpcomingEvents from "../components/Upcoming/UpcomingEvents";
import EventItem from "../components/EventItem/EventItem";
import { Link } from "react-router-dom";

const MainPage = (props) => {
  return (
    <>
      <Link to="/new">
        <Button>Create new event!</Button>
      </Link>
      <UpcomingEvents />
      <h3>My Events</h3>
      <EventItem />
      <EventItem />
      <EventItem />
      <h2>Open Invites</h2>
      <EventItem />
      <EventItem />
      <h2>Rejected Invites</h2>
      <EventItem />
      <EventItem />
    </>
  );
};

export default MainPage;
