const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const tabletojson = require("tabletojson").Tabletojson;

app.use(express.static(path.join(__dirname + "/public")));

let players = [];

const uri = "https://prosettings.net/lists/valorant/";
tabletojson.convertUrl(uri, (tableData) => {
  players = tableData[0];

  app.get("/", (req, res) => {
    res.json(players);
  });

  app.get("/player", (req, res) => {
    const query = req.query;
    const data = players.find((p) => str(p.Player) === query.name);
    data ? res.json(data) : res.json({ failed: true });
  });

  app.get("/team", (req, res) => {
    const query = req.query;
    const data = players.filter((p) => str(p.Team) === query.name);
    checked(data) ? res.json(data) : res.json({ failed: true });
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

function str(data) {
  return data.toLowerCase();
}

function checked(data) {
  return data.length;
}
