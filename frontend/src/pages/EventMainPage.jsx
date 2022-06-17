import React, { useEffect, useState } from "react";
import EventPage from "../components/EventPage/EventPage";
import CommentSection from "../components/EventPage/CommentSection";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventMainPage = (props) => {
  const [event, setEvent] = useState({});
  const [comments, setComments] = useState([]);
  const [change, setChange] = useState(false);
  const { id } = useParams();
  const user = props.cookies.user.id;

  useEffect(() => {
      axios.get(`/event/${id}`)
      .then((data) => {
      data.data.forEach((e) => {
        if (e.invitee_id === user) {
          setEvent(e);
        }
      });     
    });
  }, [id, user, event.creator]);

  useEffect(() => {
    axios.get(`/event/comments/${id}`)
    .then((data) => {
      setComments(data.data);
      setChange(false);
    })
  }, [change]);

  // const submitHandler = (comment) => {
  //   const formData = {
  //     eventId: id, 
  //     userId: props.cookies.user.id, 
  //     time: Math.round(Date.now()/1000), 
  //     text: comment
  //   };
  //   axios.post('/event/comment', formData)
  //   .then((res) => {
  //     console.log(res.data);
  //     setChange
  //   })
  // }

  
  return (
    <>
      {!event.event_id && <>This event does not exist!</>}
      {event.event_id && (
        <>
          <EventPage
            cookies={props.cookies}
            eventId={id}
            title={event.title}
            description={event.description}
            //how to convert long and lat to full address?
            address={event.address}
            date={event.start_time}
            response={event.response}
            lat={event.lat}
            long={event.long}
            creator={event.creator}
          />
          <CommentSection
            cookies={props.cookies}
            eventId={id}
            setChange={setChange}
            comments={comments}
          />
        </>
      )}
    </>
  );
};

export default EventMainPage;
