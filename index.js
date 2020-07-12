const express = require("express");
const app = express();
const port = 3000;
const pgp = require("pg-promise")(/* options */);
require("dotenv").config();

console.log(process.env.TYPE)
var db;

if (process.env.TYPE == "dev"){
    db = pgp("postgres://jonathanyaniv:carrots.19090@localhost:5432/eatlocal");
} else {
    const db = pgp(process.env.DATABASE_URL);
}

app.get("/api/locations", (req, res) => {
    db.any("SELECT * FROM locations")
      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
});

app.get("/api/location-types", (req, res) => {
    db.any("SELECT * FROM location_types")
      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
