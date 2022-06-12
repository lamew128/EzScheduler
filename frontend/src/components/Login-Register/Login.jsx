import React, { useState } from "react";
import classes from "./Login.module.css";

const Login = (props) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = (e) => {
    setUser(e.target.value);
  };

  const passwordLogin = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = { user, password };
    console.log(userData);
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
