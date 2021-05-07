const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios").default;

const app = express();

const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send({ data: "welcome to comments api" }));

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id } = req.params;

  const comments = commentsByPostId[id] || [];
  const comment = { id: commentId, content, postId: id, status: "pending" };

  comments.push(comment);
  commentsByPostId[id] = comments;

  await axios.post("http://events-bus-srv:4005/events", {
    type: "CommentCreated",
    data: comment,
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Recieved Event: >>>>>", type);
  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http://events-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id, status, postId, content
      },
    });
  }

  res.send({ data: "OK" });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.info(`Comments service running on port: ${PORT}`);
});
