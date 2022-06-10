import React, { useState } from "react";

import classes from "./TopNav.module.css";

const TopNav = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const buttonClass = `${classes.btncls} btn btn-primary`;

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const navbarClass = `${classes.navbar} navbar navbar-expand-lg`

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
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
          </ul>
          {!isLoggedIn && (
            <button className="btn btn-primary" onClick={login}>
              Login
            </button>
          )}
          {isLoggedIn && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <button onClick={logout} className={buttonClass}>
                  Log out
                </button>
              </li>
              <li className="nav-item">
                <button className={buttonClass}>Register</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
