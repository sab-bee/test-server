import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.listen(port, () => {
  console.log("listening", port);
});
