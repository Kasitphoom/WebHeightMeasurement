import Axios from "axios";
import { useState } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import "./css/register.css";
var loggedIn = false;

const Register = () => {
  var CryptoJS = require("crypto-js");

  const [user, setUser] = useState([]);

  const [Height, setHeight] = useState(0);
  const [Weight, setWeight] = useState(0);
  const [Birthday, setBirthday] = useState(0);
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const AddUser = (e) => {
    e.preventDefault();
    Axios.get(`http://localhost:3001/user/${Email}`).then((response) => {
      setUser(response.data);
      console.log(JSON.stringify(response.data));
      if (JSON.stringify(response.data) === "[]") {
        sessionStorage.setItem(
          "u",
          CryptoJS.AES.encrypt(Email, "keys").toString()
        );

        Axios.post("http://localhost:3001/add", {
          height: Height,
          weight: Weight,
          birthday: Birthday,
          fullname: FullName,
          email: Email,
          password: Password,
        }).then(() => {
          setUser([
            ...user,
            {
              height: Height,
              weight: Weight,
              birthday: Birthday,
              fullname: FullName,
              email: Email,
              password: Password,
            },
          ]);
        });
        loggedIn = true;
      } else {
        return alert(`This email: ${Email}, is already exists`);
      }
    });
  };
  if (loggedIn === true) {
    return <Redirect to="/" />;
  }
  return (
    <div className="mainctn">
      <img class="logo" src="/image/LOGO_AR.png" alt="" />
      <div className="form">
        <form action="">
          <div className="inlineb">
            <label htmlFor="height">HEIGHT</label>
            <br />
            <input
              type="number"
              name="height"
              id="height"
              placeholder=" - cm"
              onChange={(e) => {
                setHeight(e.target.value);
              }}
              required
            />
          </div>
          <div className="inlineb">
            <label htmlFor="weight">WEIGHT</label>
            <br />
            <input
              type="number"
              name="weight"
              id="weight"
              placeholder=" - kg"
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              required
            />
          </div>
          <div className="large">
            <label htmlFor="age">BIRTHDAY (Year in A.D.)</label>
            <br />
            <input
              type="date"
              name="birthday"
              id="birthday"
              placeholder=" - "
              onChange={(e) => {
                setBirthday(e.target.value);
              }}
              required
            />
          </div>
          <div className="large">
            <label htmlFor="full-name">FULL NAME</label>
            <br />
            <input
              type="text"
              name="full-name"
              id="full-name"
              min="10"
              max="100"
              placeholder=" Enter your Full name "
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              required
            />
          </div>
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
          <div className="large">
            <label htmlFor="password">CONFIRM PASSWORD</label>
            <br />
            <input
              type="password"
              name="password"
              id="re-password"
              min="10"
              max="100"
              placeholder=" Re-enter Password "
              required
            />
          </div>
          <div className="large lastctnreg">
            <Link to="/login"> LOGIN </Link>
            <input
              type="submit"
              id="register"
              value="REGISTER"
              onClick={AddUser}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
