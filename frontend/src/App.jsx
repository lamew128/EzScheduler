import React from "react";
import classes from "./App.module.css";
import TopNav from "./components/TopNav";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyEvents from "./pages/MyEvents";
import NewEvent from "./pages/NewEvent";
import PastEvents from "./pages/PastEvents";
import EventMainPage from "./pages/EventMainPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

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
            <EventMainPage />
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
