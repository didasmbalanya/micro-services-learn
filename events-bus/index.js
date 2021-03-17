const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
    
  console.log("Event bus in Event: >>>> ", event.type);

  events.push(event);
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  axios.post("http://localhost:4003/events", event);

  console.log("Sending out Event: >>>> ", event.type);
  
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

const PORT = 4005;

app.listen(PORT, () => console.log(`Event bus running on port: ${PORT}`));
