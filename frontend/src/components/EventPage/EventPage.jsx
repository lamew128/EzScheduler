import React, { useEffect, useState } from "react";
import Map from "../Map";
import EventDate from "../EventDate";
import classes from "./EventPage.module.css";
import CommentSection from "./CommentSection";
import axios from "axios";

import {
  acceptInvite,
  maybeInvite,
  rejectInvite,
} from "../../helpers/inviteResponse";
import Weather from "../Weather";
import { Link } from "react-router-dom";

const EventPage = (props) => {
  const [response, setResponse] = useState(props.response);
  const [confirmation, setConfirmation] = useState(false);
  const [inviteesList, setInviteesList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [creator, setCreator] = useState("");
  const [newInvitee, setNewInvitee] = useState(false);
  const [invitee, setInvitee] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dynamicList, setDynamicList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [inviteesEmail, setInviteesEmail] = useState([]);
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

  const deleteEvent = () => {
    // Axios Delete request
    axios.delete(`/event/${props.eventId}`);
  };

  const acceptResponse = () => {
    if (response === "yes") {
      return;
    }
    acceptInvite(setResponse, props);
    setResponse("yes");
    setNameList([]);
  };

  const maybeResponse = () => {
    if (response === "maybe") {
      return;
    }
    maybeInvite(setResponse, props);
    setResponse("maybe");
    setNameList([]);
  };

  const declineResponse = () => {
    if (response === "no") {
      return;
    }
    rejectInvite(setResponse, props);
    setResponse("no");
    setNameList([]);
  };

  const inviteeChange = (e) => {
    setInvitee(e.target.value);
    setOpenDropDown(true);
  };

  const addInvitee = (p) => {
    if (invitee.trim() === "") {
      alert("Please fill out with the information!");
      return;
    }
    if (inviteesEmail.includes(p.email.trim())) {
      alert("You cannot add the same user!");
      return;
    }
    console.log(inviteesList);
    axios
      .post("/event/invite", { userId: p.id, eventId: props.eventId })
      .then((res) => console.log(res));
    const user = { userId: p.id, data: p };
    setNameList((prev) => [...prev, user]);
    setNewInvitee(false);
    setOpenDropDown(false);
    setInvitee("");
  };

  useEffect(() => {
    axios.get(`/users`).then((e) => {
      const list = e.data.filter(
        (user) =>
          user.email.toLowerCase().includes(invitee.toLowerCase()) ||
          user.name.toLowerCase().includes(invitee.toLowerCase())
      );
      setDynamicList(list);
    });
  }, [invitee]);

  useEffect(() => {
    axios
      .get(`/users/info/${props.creator}`)
      .then((res) => setCreator(res.data.data.name));
  }, [props.creator]);

  useEffect(() => {
    axios
      .get(`/event/invitees/${props.eventId}`)
      .then((res) => setInviteesList(res.data));
  }, [props.eventId, response]);

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
        setInviteesEmail((prev) => [...prev, res.data.data.email]);
      });
    });
  }, [inviteesList]);

  const inviteeFormBlur = () => {
    if (invitee.trim() === "") {
      setNewInvitee(false);
    }
  };

  // Setting up the list with names
  useEffect(() => {
    const deleteInvitee = (invitee) => {
      const newList = nameList.filter(
        (elem) => elem.data.name !== invitee.data.name
      );
      const deleteInvitee = {
        userId: invitee.userId,
        eventId: Number(props.eventId),
      };

      axios({
        method: "DELETE",
        url: "/event/invite",
        data: deleteInvitee,
      });

      setNameList(newList);
    };

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
              {isCreator && (
                <button
                  onClick={() => deleteInvitee(invitee)}
                  className={`${classes.btn} ${classes.delete}`}
                >
                  <i className={`bi bi-x-lg col`}></i>
                </button>
              )}
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

  useEffect(() => {
    if (invitee.trim() === "") {
      setOpenDropDown(false);
    }
  }, [invitee]);

  const date = new Date(props.date * 1000);

  const addList = dynamicList.map((p) => (
    <p
      className={classes.list_name}
      onClick={() => addInvitee(p)}
      key={p.email}
    >
      {p.name} ({p.email})
    </p>
  ));

  return (
    <article className={`${classes.container} row`}>
      <div className={`${classes.invitees} col-3`}>
        Invitees:
        {showList}
        {newInvitee && (
          <div className="row align-items-center justify-content-center">
            <input
              className={classes.invitee_form}
              value={invitee}
              onChange={inviteeChange}
              onBlur={inviteeFormBlur}
              required
            />
          </div>
        )}
        {openDropDown && (
          <div className={`${classes.dropdown} row`}>
            <div className={classes["dropdown-content"]}>{addList}</div>
          </div>
        )}
        {isCreator && (
          <i
            onClick={() => setNewInvitee(true)}
            className={`${classes.add} bi bi-plus-lg`}
          ></i>
        )}
      </div>

      <main className="col">
        <h3 className={`${classes.title} row`}>
          {props.title}{" "}
          {isCreator && (
            <Link
              style={{ width: "fit-content" }}
              to={`/events/${props.eventId}/edit`}
            >
              <button>EDIT</button>
            </Link>
          )}
          <p>Created by {creator}</p>
        </h3>
        <div className="row">
          <div className="col">
            {!isCreator && (
              <>
                <button
                  onClick={acceptResponse}
                  className={`${classes.btn} ${classes.accept}`}
                >
                  Accept
                </button>
                <button
                  onClick={maybeResponse}
                  className={`${classes.btn} ${classes.maybe}`}
                >
                  Maybe
                </button>
                <button
                  onClick={declineResponse}
                  className={`${classes.btn} ${classes.decline}`}
                >
                  Decline
                </button>
              </>
            )}
            {isCreator && !confirmation && (
              <>
                <button
                  onClick={() => setConfirmation(true)}
                  className={`${classes.btn} ${classes.decline}`}
                >
                  CANCEL EVENT
                </button>
              </>
            )}
            {confirmation && (
              <>
                <button
                  onClick={() => setConfirmation(false)}
                  className={`${classes.btn} ${classes.accept}`}
                >
                  CANCEL
                </button>
                <Link to="/">
                  <button
                    onClick={deleteEvent}
                    className={`${classes.btn} ${classes.decline}`}
                  >
                    CONFIRM DELETION
                  </button>
                </Link>
              </>
            )}
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
          <div className="col">
            Weather Information:
            <div className={classes.weather}>
              <Weather lat={props.lat} long={props.long} date={props.date} />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <Map lat={props.lat} lng={props.long} height={"400px"} zoom={15} />
        </div>
      </main>
      <div className={`${classes.comments} col-3`}>
        Comments
        <CommentSection
          className={classes.comments}
          cookies={props.cookies}
          eventId={props.eventId}
          setChange={setChange}
          comments={comments}
        />
      </div>
    </article>
  );
};

export default EventPage;
