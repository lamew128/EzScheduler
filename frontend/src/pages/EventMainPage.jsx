import React, { useEffect, useState } from "react";
import EventPage from "../components/EventPage/EventPage";
import PastEventPage from "../components/EventPage/PastEventPage";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventMainPage = (props) => {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const user = props.cookies.user.id;

  useEffect(() => {
    axios.get(`/event/${id}`).then((data) => {
      data.data.forEach((e) => {
        if (e.invitee_id === user) {
          setEvent(e);
        }
      });
    });
  }, [id, user, event.creator]);

  //fixing time display
const humanStartTime = new Date(event.start_time*1000);
const humanEndTime = new Date(event.end_time*1000);

const humanStartYear  = humanStartTime.getFullYear();
const humanStartMonth = (humanStartTime.getMonth() + 1).toString().padStart(2, "0");
const humanStart = humanStartTime.getDate().toString().padStart(2, "0");

const humanEndYear  = humanEndTime.getFullYear();
const humanEndMonth = (humanEndTime.getMonth() + 1).toString().padStart(2, "0");
const humanEnd = humanEndTime.getDate().toString().padStart(2, "0");

const humanStartDate = `${humanStartYear}-${humanStartMonth}-${humanStart}`;
const humanEndDate = `${humanEndYear}-${humanEndMonth}-${humanEnd}`;

const humanStartHour = humanStartTime.getHours().toString().padStart(2,"0");
const humanStartMinute = humanStartTime.getMinutes().toString().padStart(2,"0");
const humanStartDayTime = `${humanStartHour}:${humanStartMinute}`;

const humanEndHour = humanEndTime.getHours().toString().padStart(2,"0");
const humanEndMinute = humanEndTime.getMinutes().toString().padStart(2,"0");
const humanEndDayTime = `${humanEndHour}:${humanEndMinute}`;

const displayStart = `${humanStartDate} ${humanStartDayTime}`;
const displayEnd = `${humanEndDate}  ${humanEndDayTime}`;

  return (
    <>
      {!event.event_id && <>This event does not exist!</>}
      {event.event_id && (event.start_time > (Date.now() / 1000)) && (
        <>
          <EventPage
            cookies={props.cookies}
            eventId={id}
            title={event.title}
            description={event.description}
            address={event.address}
            date={event.start_time}
            response={event.response}
            lat={event.lat}
            long={event.long}
            creator={event.creator}
            start_time={displayStart}
            end_time={displayEnd}
          />
        </>
      )}
      {event.event_id && (event.start_time < (Date.now() / 1000)) && (
        <>
          <PastEventPage
            cookies={props.cookies}
            eventId={id}
            title={event.title}
            description={event.description}
            address={event.address}
            date={event.start_time}
            response={event.response}
            lat={event.lat}
            long={event.long}
            creator={event.creator}
            start_time={displayStart}
            end_time={displayEnd}
          />
        </>
      )}
    </>
  );
};

export default EventMainPage;
