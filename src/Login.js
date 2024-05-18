import Axios from "axios";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import "./css/login.css";
var loggedIn = false;

const Login = () => {
  var CryptoJS = require("crypto-js");

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const findUser = (e) => {
    e.preventDefault();
    Axios.get(`http://localhost:3001/user/${Email}`).then((response) => {
      if (JSON.stringify(response.data) === "[]") {
        return alert(`There is no user email ${Email}`);
      } else {
        if (response.data[0].password === Password) {
          sessionStorage.setItem(
            "u",
            CryptoJS.AES.encrypt(Email, "keys").toString()
          );
          loggedIn = true;
        } else {
          return alert(`Your password is not correct`);
        }
      }
    });
  };

  if (loggedIn === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="mainctn">
      <div className="mainctn">
        <img class="logo" src="/image/LOGO_AR.png" alt="" />
        <div className="form">
          <form action="">
            <div className="large">
              <label htmlFor="email">EMAIL</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                min="10"
                max="100"
                placeholder=" example@email.com "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="large">
              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                min="10"
                max="100"
                placeholder=" Password "
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="large lastctnlog">
              <Link to="/register"> REGISTER </Link>
              <input
                type="submit"
                id="register"
                value="LOGIN"
                onClick={findUser}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
