import React, { useEffect, useState } from "react";
import EventPage from "../components/EventPage/EventPage";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventMainPage = (props) => {
  const [event, setEvent] = useState([]);
  const [response, setResponse] = useState("");
  const { id } = useParams();
  const user = props.cookies.user.id;

  useEffect(() => {
    axios
      .get(`/event/${id}`)
      .then((event) => {
        event.data.forEach((e) => {
          if (e.invitee_id === user) {
            console.log(e);
            setEvent(e);
          }
        });
      })
      .then(() => {
        console.log(event.response);
        switch (event.response) {
          case "yes":
            setResponse("Accepted");
            break;
          case "maybe":
            setResponse("Maybe");
            break;
          case "no":
            setResponse("Declined");
            break;
          default:
            setResponse("No Response");
            break;
        }
      });
  }, [id, user]);

  return (
    <>
      {!event.length && <>This event does not exist!</>}
      {event && (
        <>
          <EventPage
            cookies={props.cookies}
            eventId={id}
            title={event.title}
            description={event.description}
            //how to convert long and lat to full address?
            address={event.address}
            date={event.start_time}
            response={response}
          />
        </>
      )}
    </>
  );
};

export default EventMainPage;
