const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost:8080",
  user: "phoom",
  password: "phoom1234",
  database: "exerguider",
});

module.exports = connection;
