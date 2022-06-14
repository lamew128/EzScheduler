import React, {useEffect} from "react";
import EventPage from "../components/EventPage/EventPage";
import { useParams } from "react-router-dom";
import axios from "axios";



const EventMainPage = (props) => {
  const {id} = useParams();
  useEffect(() => {
    axios.get(`/event/${id}`).then((event) => {
      console.log(event.data);

    })
  }, []);

  return (
    <>
      <EventPage eventId={id} />
    </>
  );
};



  // useEffect(() => {
  //   if (userId) {
  //     axios.get(`/event/${eventId}`).then((event) => {
  //       console.log(event.data);
  //       setEvents(event.data);
  //     });
  //     setShowEvents(true);
  //     setEventChange(false);
  //   } else {
  //     setShowEvents(false);
  //     setEventChange(false);
  //   }
  // }, [userId, props.cookies.user, eventChange]);


  



export default EventMainPage;
