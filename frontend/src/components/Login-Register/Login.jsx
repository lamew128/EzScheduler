import React, { useState } from "react";
import classes from "./Login.module.css";
import axios from "axios";

const Login = (props) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function cookieSetter(newName) {
    props.setCookie("user", newName, { path: "/" });
  }

  const userLogin = (e) => {
    setUser(e.target.value);
  };

  const passwordLogin = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/users/login", { email: user, password: password })
      .then((user) => {
        if (user.data.status === 200) {
          cookieSetter({ id: user.data.id, name: user.data.name });
          props.setName(user.data.name);
          props.setIsLoggedIn(true);
          props.close();
        }
        if (user.data.status === 401) {
          setError(true);
        }
      });
  };

  const formClass = `${classes.center} row`;
  return (
    <div className={classes.container}>
      <form className={classes.login_overlay} onSubmit={submitHandler}>
        <div className={`${classes.center} align-self-end`}>
          <i
            onClick={props.close}
            className={`${classes.close} bi bi-x-lg`}
          ></i>
        </div>
        <div className={`${classes.center} row`}>
          <h3 className={classes.title}>LOGIN</h3>
          <div className={formClass}>
            <label>Email Address:</label>
            <input
              className={classes.input}
              type="email"
              value={user}
              onChange={userLogin}
              placeholder="name@email.com"
            />
          </div>
          <div className={formClass}>
            <label>Password:</label>
            <input
              className={classes.input}
              type="password"
              value={password}
              onChange={passwordLogin}
            />
          </div>
          {error && <h4>Invalid login information.</h4>}
          <button className={classes.btn} type="submit">
            LOGIN!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
