import React from "react";
import Button from '../components/Button'
import UpcomingEvents from "../components/Upcoming/UpcomingEvents";

const MainPage = () => {
  return (
    <>
      <Button>Create new event!</Button>
      <UpcomingEvents />
    </>
  );
};

export default MainPage;
