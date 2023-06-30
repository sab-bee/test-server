import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.json({ success: false });
});

app.get("/home", (req, res) => {
  res.json({ home: true });
});

app.listen(port, () => {
  console.log("listening", port);
});
