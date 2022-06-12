import React, { useState } from "react";
import Button from "../components/CreateEventButton";
import UpcomingEvents from "../components/Upcoming/UpcomingEvents";
import EventItem from "../components/EventItem/EventItem";
import { Link } from "react-router-dom";
import axios from "axios";

const MainPage = (props) => {
  const [events, setEvents] = useState([]);
  axios.get("/event/created/1").then((data) => {
    console.log(data.data);
    const date = new Date(Number(data.data[0].start_time) * 1000);
    console.log(date);
  });

  // const date1 = new Date(16548972061);
  // const date2 = new Date(1655066724424);
  // const date3 = new Date().getTime()
  // console.log(date1);
  // console.log(date2);

  return (
    <>
      <Link to="/new">
        <Button>Create new event!</Button>
      </Link>
      <UpcomingEvents />
      <h3>My Events</h3>
      <EventItem id={1} />
      <EventItem id={2} />
      <EventItem id={3} />
      <h2>Open Invites</h2>
      <EventItem id={4} />
      <EventItem id={5} />
      <h2>Rejected Invites</h2>
      <EventItem id={6} />
      <EventItem id={7} />
    </>
  );
};

export default MainPage;
