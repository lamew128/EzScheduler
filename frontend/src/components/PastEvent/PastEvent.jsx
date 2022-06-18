
import { Link } from "react-router-dom";
import EventDate from "../EventDate";
import classes from "./PastEvent.module.css";

const PastEvent = (props) => {
  const date = new Date(props.date * 1000);
  const container = `${classes.container} row`;

  return (
    <>
      <div className={container}>
        <EventDate className="col" date={date} />
        <Link className={`${classes.fit} col`} to={`/events/${props.eventId}`}>
          <button className={classes.btn}>VIEW EVENT</button>
        </Link>
        <h3 className={`${classes.title} col`}>{props.title}</h3>
        <p className={`${classes.location} col`}>Location: {props.address}</p>
      </div>
    </>
  );
};

export default PastEvent;
