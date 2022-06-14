import React, {useEffect, useState} from "react";
import EventPage from "../components/EventPage/EventPage";
import { useParams } from "react-router-dom";
import axios from "axios";



const EventMainPage = (props) => {
  const [event, setEvent] = useState([]);
  const {id} = useParams();
  useEffect(() => {
    axios.get(`/event/${id}`).then((event) => {
      console.log(event.data);
      setEvent(event.data);
    })
  }, []);

  return (
    <>
      <EventPage 
        eventId={id}
        eventTitle={event.length ? event[0].title: 'loading'}
        eventDescription={event.length ? event[0].description: 'loading'}
        //how to convert long and lat to full address?
        eventAddress={""} 
        eventDate={""} 
      />
        
    </>
  );
};


export default EventMainPage;
