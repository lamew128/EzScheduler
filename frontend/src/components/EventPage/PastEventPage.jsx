import React, { useEffect, useState } from "react";
import Map from "../Map";
import EventDate from "../EventDate";
import classes from "./EventPage.module.css";
import CommentSection from "./CommentSection";
import axios from "axios";

const EventPage = (props) => {
  const [response, setResponse] = useState(props.response);
  const [inviteesList, setInviteesList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [creator, setCreator] = useState("");
  const [showList, setShowList] = useState([]);
  const isCreator = props.cookies.user.id === props.creator;

  const [comments, setComments] = useState([]);
  const [change, setChange] = useState(false);

  // COMMENTS SECTION
  useEffect(() => {
    axios.get(`/event/comments/${props.eventId}`).then((commentsData) => {
      setComments(commentsData.data);
      setChange(false);
    });
  }, [change, props.eventId]);

  useEffect(() => {
    axios
      .get(`/users/info/${props.creator}`)
      .then((res) => setCreator(res.data.data.name));
  }, [props.creator]);

  useEffect(() => {
    axios
      .get(`/event/invitees/${props.eventId}`)
      .then((res) => setInviteesList(res.data));
  }, []);

  // Setting the name invitees list from user ID
  useEffect(() => {
    inviteesList.forEach((invitee) => {
      axios.get(`/users/info/${invitee.user_id}`).then((res) => {
        setNameList((prev) => [
          ...prev,
          {
            userId: invitee.user_id,
            response: invitee.response,
            data: res.data.data,
          },
        ]);
      });
    });
  }, [inviteesList]);

  // Setting up the list with names
  useEffect(() => {

    const list = nameList.map((invitee) => {
      return (
        <div key={invitee.data.email} className={classes.list_item}>
          {(invitee.userId !== props.creator ||
            props.cookies.user.id !== props.creator) && (
            <>
              {invitee.response === "yes" && (
                <i className={`${classes.check} bi bi-check-lg col`}></i>
              )}
              {invitee.response === "no" && (
                <i className={`${classes.x} bi bi-x-lg col`}></i>
              )}
              {invitee.response === "maybe" && (
                <i className={`${classes.question} bi bi-question-lg col`}></i>
              )}
              <p className={classes.p_fix}>{invitee.data.name}</p>
              {/* {isCreator && (
                <button
                  onClick={() => deleteInvitee(invitee)}
                  className={`${classes.btn} ${classes.delete}`}
                >
                  <i className={`bi bi-x-lg col`}></i>
                </button>
              )} */}
            </>
          )}
        </div>
      );
    });
    setShowList(list);
  }, [
    nameList,
    inviteesList,
    props.eventId,
    isCreator,
    props.cookies.user.id,
    props.creator,
  ]);

  const date = new Date(props.date * 1000);

  return (
    <article className={`${classes.container} row`}>
      <div className={`${classes.adjust_height} col-3`}>
        <div className={`${classes.invitees} row`}>
          <span className={classes.section_title}>INVITEES:</span>
          {showList}
        </div>
        <div className={`${classes.comments}`}>
          <span className={`${classes.section_title} text-center`}>
            COMMENTS
          </span>
          <CommentSection
            className={classes.comments}
            cookies={props.cookies}
            eventId={props.eventId}
            setChange={setChange}
            comments={comments}
          />
        </div>
      </div>
      <main className="col">
        <h3 className={`${classes.title} row`}>
          {props.title}{" "}
          <p>Created by {creator}</p>
        </h3>
        <div className="row">
          <div className="col">
          </div>
          <div className={`${classes.date} col`}>
            <EventDate date={date} />
          </div>
        </div>
        <div className="row">
          <div className="col align-self-center">
            {response === "yes" && (
              <p>
                Responded with: <strong>Accepted</strong>
              </p>
            )}
            {response === "no" && (
              <p>
                Responded with: <strong>Declined</strong>
              </p>
            )}
            {response === "maybe" && (
              <p>
                Responded with: <strong>Maybe</strong>
              </p>
            )}
            <p>
              Description: <strong>{props.description}</strong>
            </p>
            <p>
              Address: <strong>{props.address}</strong>
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <Map lat={props.lat} lng={props.long} height={"400px"} zoom={15} />
        </div>
      </main>
    </article>
  );
};

export default EventPage;
