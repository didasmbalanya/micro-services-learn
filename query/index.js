const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    posts[data.id] = { ...data, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ data: "OK" });
});
const PORT = 4002;
app.listen(PORT, async () => {
  console.log(`Query service running on port: ${PORT}`);

  const { data } = await axios.get("http://localhost:4005/events");

  for (let event of data) {
    console.log("Processing event: ", event.type);

    handleEvent(event.type, event.data);
  }
});
