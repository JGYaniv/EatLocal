const express = require("express");
const app = express();
const path = require('path');
const pgp = require("pg-promise")(/* options */);
const getPlacePicture = require("./maps_api_utils")
require("dotenv").config();

var db;

if (process.env.TYPE == "dev"){
  db = pgp(process.env.LOCAL_DATABASE_URL);
} else {
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

        let queryString = [
          data[0].city.trim().split().join("+"),
          data[0].state,
        ].join("+");
        
        getPlacePicture(queryString)
          .then(function (photoUrl) {
            data[0].photoUrl = photoUrl;
            res.json(data);
          })
          .catch((e) => console.log(e));
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
