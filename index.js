const express = require("express");
const app = express();
const path = require('path');
const pgp = require("pg-promise")(/* options */);
require("dotenv").config();

var db;

if (process.env.TYPE == "dev"){
  console.log("connecting to local db");
  console.log(process.env.LOCAL_DATABASE_URL);
  db = pgp(process.env.LOCAL_DATABASE_URL);
} else {
  console.log("connecting to remote db");
  console.log(process.env.DATABASE_URL)
  db = pgp(process.env.DATABASE_URL);
}

app.get("/api/locations", (req, res) => {
    db.any("SELECT id, title, type, street, city, state, zip, x, y, schedule FROM locations")
      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
});

app.get("/api/locations/:id", (req, res) => {
    db.any("SELECT * FROM locations WHERE id=$1", req.params.id)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
});

app.use(express.static("./"));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "", "index.html"));
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening to ${process.env.PORT || 3000}`)
);
