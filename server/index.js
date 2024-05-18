const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
var CryptoJS = require("crypto-js");
var name;
// const userEmail = sessionStorage.getItem("u");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "exerguider",
});

app.get("/user/:u", (req, res) => {
  db.query(
    `SELECT * FROM user WHERE email = '${req.params.u}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/add", (req, res) => {
  const weight = req.body.weight;
  const height = req.body.height;
  const birthday = req.body.birthday;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO user (email, fullname, height, weight, birthday, password) VALUES (?,?,?,?,?,?)",
    [email, fullname, height, weight, birthday, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("value inserted");
      }
    }
  );
});

app.listen("3001", () => {
  console.log("Server started on 3001");
});
