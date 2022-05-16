require("dotenv").config();
const express = require("express");
const http = require("http");

const app = express();
app.use(express.static("./public"));
const server = http.createServer(app);

// set up express routes
app.get("/", (_, res) => {
  res.sendFile("public/pages/index.html", { root: "." });
});

app.get("/resume", (_, res) => {
  res.sendFile("public/pages/resume.html", { root: "." });
});

app.get("*", (_, res) => {
  res.status(404);
  res.sendFile("public/pages/404.html", { root: "." });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on at http://localhost:${process.env.PORT}.`);
});
