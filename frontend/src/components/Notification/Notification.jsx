import React, { useEffect, useState } from "react";
// import classes from "./NewEventForm.module.css";
import axios from "axios";

const Notification = (props) => {
  const date = new Date(props.date * 1000);
  const humanDate = date.toLocaleString("en-CA");
  console.log(humanDate);

  console.log(date);
  return (
    <div>
      Please respond to {props.creator}'s invite to {props.title} at {humanDate} 
    </div>
  );
}

export default Notification;
