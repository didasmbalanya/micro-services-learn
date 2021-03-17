const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const {
    type,
    data: { content, id, postId },
  } = req.body;

  console.log("Recieved Event: >>>>>", type);

  if (type === "CommentCreated") {
    const status = content.includes("fuck") ? "rejected" : "approved";
    axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: { id, postId, status, content },
    });
  }

  res.send({ data: "Ok" });
});

const PORT = 4003;
app.listen(PORT, () =>
  console.log(`Moderation service running on port: `, PORT)
);
