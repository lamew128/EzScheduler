import React, { useState } from "react";
import classes from "./Login.module.css";
import axios from "axios";

const Login = (props) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

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
    // Axios POST (Login) request. cookieSetter will be set with userID returned from request.
    e.preventDefault();
    //const userData = { user, password };
    axios
      .post("/users/login", { email: user, password: password })
      .then((user) => {
        console.log("USER ID = ", user.data.id);
        cookieSetter({ id: user.data.id, name: user.data.name });
        props.setName(user.data.name);
        props.setIsLoggedIn(true);
        props.close();
      });
  };

  const formClass = `${classes.center} row`;
  return (
    <div className={classes.container}>
      <form className={classes.login_overlay} onSubmit={submitHandler}>
        <div className={`${classes.center} row`}>
          <i
            onClick={props.close}
            className={`${classes.close} bi bi-x-lg`}
          ></i>
        </div>
        <div className={`${classes.center} row`}>
          <h3>LOGIN</h3>
          <div className={formClass}>
            <label>Email:</label>
            <input
              className={classes.w}
              type="email"
              value={user}
              onChange={userLogin}
            />
          </div>
          <div className={formClass}>
            <label>Password:</label>
            <input
              className={classes.w}
              type="password"
              value={password}
              onChange={passwordLogin}
            />
          </div>
          <button className={classes.btn} type="submit">
            LOGIN!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
