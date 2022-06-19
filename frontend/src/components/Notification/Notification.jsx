import React, { useEffect, useState } from "react";
import classes from "./Notification.module.css";
import axios from "axios";

const Notification = (props) => {
  const [ownerName, setOwnerName] = useState("");
  const date = new Date(props.date * 1000);
  const humanDate = date.toLocaleString("en-CA");
  const getData = async () => {
    let ownerName = await (
      await axios.get(`users/info/${props.creator}`)
    ).data.data.name;
    setOwnerName(ownerName);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <a className={`${classes.event_text} row`} href={`#${props.eventId}`}>
        Please respond to {ownerName}'s invite to {props.title} on {humanDate}
      </a>
    </>
  );
};

export default Notification;
