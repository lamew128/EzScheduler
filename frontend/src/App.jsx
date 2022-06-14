import React from "react";
import classes from "./App.module.css";
import TopNav from "./components/TopNav";
import { Redirect, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyEvents from "./pages/MyEvents";
import NewEvent from "./pages/NewEvent";
import PastEvents from "./pages/PastEvents";
import EventMainPage from "./pages/EventMainPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  return (
    <>
      <TopNav
        cookies={cookies}
        setCookie={setCookie}
        removeCookie={removeCookie}
      />
      <main className={classes.main}>
        <Switch>
          <Route exact path="/">
            <MainPage
              cookies={cookies}
              setCookie={setCookie}
              removeCookie={removeCookie}
            />
          </Route>
          <Route path="/my-events">
            {cookies.user ? <MyEvents /> : <Redirect to="/" />}
          </Route>
          <Route path="/new">
            {cookies.user ? <NewEvent /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/events/past">
            {cookies.user ? <PastEvents /> : <Redirect to="/" />}
          </Route>
          <Route path="/events/:id">
            {cookies.user ? <EventMainPage /> : <Redirect to="/" />}
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
