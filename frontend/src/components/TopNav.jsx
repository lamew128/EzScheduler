import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./TopNav.module.css";

const TopNav = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const buttonClass = `${classes.btncls} btn btn-primary`;

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const navbarClass = `${classes.navbar} navbar navbar-expand-lg`;
  const navitemClass = `${classes.navitem} nav-link active`;

  return (
    <nav className={navbarClass}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          E.Z.Scheduler
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/welcome" activeClassName={classes.active} className={navitemClass}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/my-events" activeClassName={classes.active} className={navitemClass}>
                My Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/new" activeClassName={classes.active} className={navitemClass}>
                New Event
              </NavLink>
            </li>
          </ul>
          {!isLoggedIn && (
            <>
              <button className="btn btn-primary" onClick={login}>
                Login
              </button>
              <button className={buttonClass}>Register</button>
            </>
          )}
          {isLoggedIn && (
            <>
              <span className="nav-item">Logged in as Heron</span>
              <button onClick={logout} className={buttonClass}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
