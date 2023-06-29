const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/public")));

app.get("/home", (req, res) => {
  res.send({ data: "hey" });
});

app.listen(port, () => {
  console.log("listening to port", port);
});
