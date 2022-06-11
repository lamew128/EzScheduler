import React from "react";
import classes from "./App.module.css";
import TopNav from "./components/TopNav";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyEvents from "./pages/MyEvents";
import NewEvent from "./pages/NewEvent";
import PastEvents from "./pages/PastEvents";
import EventPage from "./pages/EventPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Map from "./pages/Map";

function App() {
  return (
    <>
      <TopNav />
      <main className={classes.main}>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/my-events">
            <MyEvents />
          </Route>
          <Route path="/new">
            <NewEvent />
          </Route>
          <Route exact path="/events/past">
            <PastEvents />
          </Route>
          <Route path="/events/:id">
            <EventPage />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
