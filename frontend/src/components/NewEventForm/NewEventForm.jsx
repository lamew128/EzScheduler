import React from "react";
import classes from "./NewEventForm.module.css";

const NewEvent = () => {
  return (
    <div className={classes.container}>
      <h3 className="row">New Event</h3>
      <form className="row">
        <div className={`${classes.inputs} col`}>
          <label>Title:</label>
          <input type="text" />
          <label>Name of Location:</label>
          <input type="text" />
          <label>Address:</label>
          <input type="text" />
        </div>
        <div className="col">
          <label>Date:</label>
          <input type="date" />
        </div>
      </form>
      <hr />
      <div className="row">
        <div className="col-4">
          Invitees
          <div className={classes.invitees}></div>
        </div>
        <div className="col-8">
          MAP
          <div className={classes.invitees}></div>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
