const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override")

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const mongoURI = `mongodb+srv://${process.env.MONGO_UNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(mongoURI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("connected", () => console.log("Successfully connected to Mongo DB: " + process.env.MONGO_DB_NAME));

db.on("disconnected", () => console.log("Successfully disconnected from  Mongo DB: " + process.env.MONGO_DB_NAME));

db.on("error", (err) => {
  console.log("Error while connecting to mongo db: " + err.message);
});

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

const userController = require("./controller/user_controller");
app.use("/users", userController);

const sessionController = require("./controller/session_controller");
app.use("/sessions", sessionController);

const todoListController = require("./controller/to-do-list_controller");
app.use("/todolist", todoListController);

const checkLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

app.get("/", checkLoggedIn, (req, res) => {
  res.redirect("/todolist");
});


app.listen(PORT, () => {
  console.log("Authentication application is listening on port: " + PORT);
});
