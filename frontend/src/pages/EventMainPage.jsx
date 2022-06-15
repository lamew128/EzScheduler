import React, { useEffect, useState } from "react";
import EventPage from "../components/EventPage/EventPage";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventMainPage = (props) => {
  const [event, setEvent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/event/${id}`).then((event) => {
      console.log(event.data);
      setEvent(event.data);
    });
  }, [id]);

  return (
    <>
      {!event.length && <>This event does not exist!</>}
      {event.length > 0 && (
        <>
          <EventPage
            cookies={props.cookies}
            eventId={id}
            title={event[0].title}
            description={event[0].description}
            //how to convert long and lat to full address?
            address={event[0].address}
            date={event[0].start_time}
            response={event[0].response}
          />
        </>
      )}
    </>
  );
};

export default EventMainPage;
