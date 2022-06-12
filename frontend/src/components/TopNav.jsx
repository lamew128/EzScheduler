import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login-Register/Login";
import Register from "./Login-Register/Register";

import classes from "./TopNav.module.css";

import { useCookies } from "react-cookie";

const TopNav = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies([""]);
  const loggedIn = !!cookies.user;
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const [loginWindow, setLoginWindow] = useState(false);
  const [registerWindow, setRegisterWindow] = useState(false);

  const buttonClass = `${classes.btncls} btn btn-primary`;

  const openLogin = () => {
    loginWindow ? setLoginWindow(false) : setLoginWindow(true);
  };

  const openRegister = () => {
    registerWindow ? setRegisterWindow(false) : setRegisterWindow(true);
  };

  // Logout function (Still have to implement clear cookies)
  const logout = () => {
    setIsLoggedIn(false);
    removeCookie("user");
  };

  // Classes
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
              <NavLink
                exact
                to="/"
                activeClassName={classes.active}
                className={navitemClass}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/my-events"
                activeClassName={classes.active}
                className={navitemClass}
              >
                My Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/new"
                activeClassName={classes.active}
                className={navitemClass}
              >
                New Event
              </NavLink>
            </li>
          </ul>
          {!isLoggedIn && (
            <>
              <button className={buttonClass} onClick={openLogin}>
                Login
              </button>
              <button className={buttonClass} onClick={openRegister}>
                Register
              </button>
              {loginWindow && (
                <Login close={openLogin} setLogin={setIsLoggedIn} />
              )}
              {registerWindow && <Register close={openRegister} />}
            </>
          )}
          {isLoggedIn && (
            <>
              <span className="nav-item">
                Logged in as <b>Heron</b>
              </span>
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
