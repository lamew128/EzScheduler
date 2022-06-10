import React from "react";
import classes from "./App.module.css";
import TopNav from "./components/TopNav";
import Button from "./components/Button";
import UpcomingEvents from "./components/Upcoming/UpcomingEvents";

function App() {
  return (
    <>
      <TopNav />
      <main className={classes.main}>
        <Button>Create new event!</Button>
        <UpcomingEvents />
      </main>
    </>
  );
}

export default App;
