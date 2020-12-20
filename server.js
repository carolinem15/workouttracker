// dependencies

const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path");

// starts up express app
const app = express();

// i don't know what this does
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// setting up variables
const databaseUrl = "workout";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

// get default homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });

// view all exercises on stats page
// or should the found argument be data?
app.get("/stats", (req, res) => {
  db.workouts.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
        // this retrieves everything out of our database
      res.json(found);
    }
  });
});

// submit new exercise to homepage
app.post("/submit", (req, res) => {
    console.log(req.body);
  
    db.workouts.insert(req.body, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    });
  });

app.listen(3000, () => {
  console.log("App running on port 3000!");
});
