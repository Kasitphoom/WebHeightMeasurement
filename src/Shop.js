import Footer from "./Footer";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/shop.css";

const Shop = () => {
  const login = sessionStorage.getItem("u");
  const [user, setUser] = useState([]);

  var CryptoJS = require("crypto-js");
  var bytes = CryptoJS.AES.decrypt(login, "keys");
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  const getuser = () => {
    Axios.get("http://localhost:3001/user/" + decryptedData).then(
      (response) => {
        setUser(response.data);
      }
    );
  };

  return (
    <div className="mainctn">
      {getuser()}
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
      <div className="shopsctn">
        <div className="shops">
          <div className="shop coupon">
            <div className="logo">
              <img src="/image/coin.png" alt="" />
            </div>
            <div className="name">
              <h1>COUPON</h1>
              <h2>TRADING</h2>
            </div>
          </div>
          <div className="shop healthy">
            <div className="logo">
              <img src="/image/healthy.png" alt="" />
            </div>
            <div className="name">
              <h1>HEALTHY</h1>
              <h2>FOOD DELIVERY</h2>
            </div>
          </div>
          <div className="shop"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
