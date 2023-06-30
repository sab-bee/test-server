const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const tabletojson = require("tabletojson").Tabletojson;

app.use(express.static(path.join(__dirname + "/public")));

let players = [];

async function server() {
  app.get("/", (req, res) => {
    res.json({ success: false });
  });

  app.get("/home", (req, res) => {
    res.json({ home: false });
  });

  app.listen(port, () => {
    console.log("listening", port);
  });
}

server()