const express = require("express");
const app = express();
const port = 3000;
const pgp = require("pg-promise")(/* options */);
require("dotenv").config();

var db;

if (process.env.TYPE == "dev"){
    db = pgp("postgres://jonathanyaniv:carrots.19090@localhost:5432/eatlocal");
} else {
    const db = pgp(process.env.DATABASE_URL);
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


app.listen(port, () =>
  console.log(`Listening to http://localhost:${port}`)
);
