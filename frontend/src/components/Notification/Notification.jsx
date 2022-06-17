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
    <a  className={classes.container} href= {`#${props.eventId}`}>
      
      {/* onClick={() => {
      console.log("clicked");
      // location.href = `#${props.eventId}`;
      document.querySelector(`#${props.eventId}`).scrollIntoView({
        behavior: 'smooth'
      }); */}
      {/* // let event = document.getElementById(`${props.eventId}`);
      // // console.log(event);
      // window.setTimeout(() => { */}
      {/* //   console.log("setTimeout called");
      //   event.scroll()}, 1000);
      // event.focus({preventScroll:false});
    }} */}

      
      {/* // onClick={e => props.}  */}
    
      Please respond to {props.creator}'s invite to {props.title} at {humanDate} 
    </a>
  </>
  );
}

export default Notification;
