require("dotenv").config();
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const showdown = require("showdown");
const converter = new showdown.Converter();
const logger = require("morgan");
const http = require("http");

const app = express();

// Initialise Mongo DB and Passport
require("./config");

app.use(logger("dev"));
// Cors Start
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.set("trust proxy", 1);
// Cors End
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  fs.readFile("./README.md", "utf8", (err, data) => {
    if (err) throw err;
    res.render("index", { data: converter.makeHtml(data) });
  });
});

// app.use("/", indexRouter);
// app.use("/users", userRouter);
// app.use("/room", decode, chatRoomRouter);
// app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

/** Create HTTP server. */
const server = http.createServer(app);
server.listen(process.env.PORT || 5000);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(
    `Listening on port :: http://localhost:${server.address().port}/`
  );
});
