import React from "react";
import classes from "./App.module.css";
import TopNav from "./components/TopNav";
import Button from "./components/Button";
import UpcomingEvents from "./components/Upcoming/UpcomingEvents";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <TopNav />
      <main className={classes.main}>
        <Route path='/'>
          
        </Route>
        <Button>Create new event!</Button>
        <UpcomingEvents />
      </main>
    </>
  );
}

export default App;
