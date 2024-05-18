import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/index.css";
import Footer from "./Footer";

const Info = () => {
  const login = sessionStorage.getItem("u");
  const [user, setUser] = useState([]);
  const calories = user.map((val, key) => {
    return val.calories;
  });

  // var CryptoJS = require("crypto-js");
  // var bytes = CryptoJS.AES.decrypt(login, "keys");
  // var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  // const getuser = () => {
  //   Axios.get("http://localhost:3001/user/" + decryptedData).then(
  //     (response) => {
  //       setUser(response.data);
  //     }
  //   );
  // };
  const showDate = () => {
    const date = new Date();
    const formatdate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return formatdate;
  };
  const calculatedCal = () => {
    return ((calories / 2048) * 100).toFixed(1);
  };

  return (
    <div className="main" id="main">
      {/* {getuser()} */}
      <div className="balance">
        <h1>Your Balance</h1>
        <div className="bar inlineb vm">
          <p> 300</p>
        </div>
        <div className="label inlineb vm" title="Active Point">
          <p className="rem4">AP</p>
        </div>
        <div className="name">
          <p>
            {user.map((val, key) => {
              return val.fullname;
            })}
          </p>
        </div>
      </div>
      <div className="content">
        <div className="experience vt inlineb">
          <h2>Total Experience:</h2>
          <h3 className="vm">Gain experience by exercising</h3>
          <p className="rem4">0 / 1500</p>
        </div>
        <div className="smallLabelxp vt inlineb">
          <p className="rem2">XP</p>
        </div>
        <div className="experience vt inlineb">
          <h2>Calories Burned:</h2>
          <h3 className="vm">Estimated calories burnt</h3>
          <Link to="/graph">SEE THE GRAPH</Link>
        </div>
        <div className="smallLabelcal vt inlineb">
          <p className="rem2">CAL</p>
        </div>
        <div className="showcalories">
          <h1 className="inlineb">
            CALORIES <strong> {calories} / 2048</strong>
          </h1>
          <p className="inlineb">{showDate()}</p>
          <div className="bar">
            <p>{calculatedCal()}% Completed</p>
          </div>
        </div>
        <div className="record">
          <div className="content">
            <div className="circle" id="timespend">
              <p>0%</p>
            </div>
            <p>
              <h2>TIME SPENDING ON EXERCISING</h2>
              goal for intermediat is set to 1 hour/day
            </p>
          </div>
          <div className="content">
            <div className="circle" id="timespend">
              <p>0%</p>
            </div>
            <p>
              <h2>PROGRESS ON YOUR BODY</h2>
              Percentage of goal achieve in a month
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Info;
