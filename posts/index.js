const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const { default: axios } = require("axios");

const app = express();

const posts = {};

app.use(bodyParser.json());
app.use(cors({ origin: "*", methods: "GET,PUT,POST,DELETE" }));

app.get("/", (req, res) => res.send({ data: "welcome to posts api" }));
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  const post = { id, title };
  posts[id] = post;

  await axios.post(`http://event-bus-srv:4005/events`, {
    type: "PostCreated",
    data: post,
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Recieved Event: >>>>>", req.body.type);

  res.send({ data: "OK" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("version 50");
  console.info(`Post service running on port: ${PORT}`);
});
