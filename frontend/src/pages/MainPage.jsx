import React, { useEffect, useState } from "react";
import Button from "../components/CreateEventButton";
import UpcomingEvents from "../components/Upcoming/UpcomingEvents";
import User from "../components/User";
import axios from "axios";

const MainPage = () => {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios.get("/users/test").then((data) => {
  //     setUsers(data.data);
  //   });
  // }, []);

  return (
    <>
      <Button>Create new event!</Button>
      <UpcomingEvents />
      <h3>My Events</h3>
    </>
  );
};

export default MainPage;
