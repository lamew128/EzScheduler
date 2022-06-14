import React, { useEffect } from "react";
import EventPage from "../components/EventPage/EventPage";
import { useParams } from "react-router-dom";

const EventMainPage = (props) => {
  const { id } = useParams();
  return (
    <>
      {id}
      <EventPage />
    </>
  );
};

export default EventMainPage;
