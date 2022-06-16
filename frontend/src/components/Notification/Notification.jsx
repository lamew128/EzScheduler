import React, { useEffect, useState } from "react";
import classes from "./Notification.module.css";



// const useFocus = () => {
//   const htmlElRef = useRef(null)
//   const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
//   return [ htmlElRef, setFocus ] 
// }


const Notification = (props) => {
  const date = new Date(props.date * 1000);
  const humanDate = date.toLocaleString("en-CA");
 
  return (
  <>
    <div 
      className={classes.container}
      onClick={() => {console.log("clicked");
      let event = document.getElementById(`${props.eventId}`);
      event.focus({preventScroll:false});
    }}

      
      // onClick={e => props.} 
    >
      Please respond to {props.creator}'s invite to {props.title} at {humanDate} 
    </div>
  </>
  );
}

export default Notification;
