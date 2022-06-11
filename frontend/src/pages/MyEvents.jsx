import React from "react";
import MyEvent from "../components/MyEvent/MyEvent";

const MyEvents = () => {
  return (
    <>
      <h2>My Events</h2>
      <MyEvent choice={"accepted"} />
      <MyEvent choice={"maybe"} />
      <MyEvent choice={"rejected"} />
    </>
  );
};

export default MyEvents;
