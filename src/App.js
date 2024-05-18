import React from "react";
import Home from "./Home";
import Graph from "./Graph";
import Register from "./Register";
import Login from "./Login";
import Exercise from "./Exercise";
import Shop from "./Shop";
import "./css/header.css";
import { Route, Link, Redirect } from "react-router-dom";

const Info = () => {
  const login = sessionStorage.getItem("u");
  return (
    <div className="mainctn">
      <Route exact path="/">
        <Redirect to="/exercise" />
      </Route>

      <Route exact path="/graph" component={Graph} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/exercise" component={Exercise} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </div>
  );
};

export default Info;
