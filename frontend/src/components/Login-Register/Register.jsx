import axios from "axios";
import React, { useState } from "react";
import classes from "./Register.module.css";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameRegister = (e) => {
    setName(e.target.value);
  };

  const emailRegister = (e) => {
    setEmail(e.target.value);
  };

  const passwordRegister = (e) => {
    setPassword(e.target.value);
  };

  function cookieSetter(newName) {
    props.setCookie("user", newName, { path: "/" });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    //const userData = { name, email, password };
    axios
      .post("/users/register", { name: name, email: email, password: password })
      .then((user) => {
        console.log("USER ID = ", user.data.id);
        cookieSetter({ id: user.data.id, name: user.data.name });
        props.setLogin(true);
        props.close();
        props.setName(name)
      });
    //console.log(userData);
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
          <h3>Register</h3>
          <div className={formClass}>
            <label>Name:</label>
            <input
              className={classes.w}
              type="text"
              value={name}
              onChange={nameRegister}
              required
            />
          </div>
          <div className={formClass}>
            <label>Email:</label>
            <input
              className={classes.w}
              type="email"
              value={email}
              onChange={emailRegister}
              required
            />
          </div>
          <div className={formClass}>
            <label>Password:</label>
            <input
              className={classes.w}
              type="password"
              value={password}
              onChange={passwordRegister}
              required
            />
          </div>
          <button className={classes.btn} type="submit">
            REGISTER!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
