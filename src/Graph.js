import { Line } from "react-chartjs-2";
import Axios from "axios";
import { useState } from "react";
import Footer from "./Footer";

import "./css/graph.css";

const Graph = () => {
  const login = sessionStorage.getItem("u");
  const Data = [0, 0, 200, 100, 30, 0, 0, 0];
  const [user, setUser] = useState([]);
  const calories = user.map((val, key) => {
    return val.calories;
  });

  var CryptoJS = require("crypto-js");
  var bytes = CryptoJS.AES.decrypt(login, "keys");
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  const calculatedCal = () => {
    getuser();
    return ((calories / 2048) * 100).toFixed(1);
  };

  const getuser = () => {
    Axios.get("http://localhost:3001/user/" + decryptedData).then(
      (response) => {
        setUser(response.data);
      }
    );
  };
  const CalculateCal = () => {
    const num = Data.reduce((a, b) => a + b, 0);
    return num;
  };
  const date = new Date();
  const dateArray = [];
  for (var i = 7; i > -1; i--) {
    dateArray.push(date.getHours() - i + ":00");
  }

  return (
    <div className="mainctn">
      <div className="top">
        <div className="title vt inlineb">
          <h1>Burned Calories:</h1>
          <p>Estimated calories burned</p>
        </div>
        <div className="Labelcal vt inlineb">
          <p className="rem2">CAL</p>
        </div>
        <div className="graphdisplay">
          <Line
            data={{
              labels: dateArray,
              datasets: [
                {
                  label: "Calories burned",
                  data: Data,
                  borderColor: "rgba(90,130,203,255)",
                  pointBorderColor: "rgba(220,24,14,255)",
                  pointBackgroundColor: "rgba(220,24,14,255)",
                },
              ],
            }}
            width={300}
            height={300}
            options={{
              maintainAspectRatio: false,
              scale: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <div className="showcalories">
          <h1 className="inlineb">
            CALORIES <strong>{calories} / 2048</strong>
          </h1>
          <div className="bar">
            <p>{calculatedCal()}% Completed</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Graph;
