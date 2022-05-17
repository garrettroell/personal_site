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

app.get("/blog", (_, res) => {
  res.sendFile("public/blog/0_blog.html", { root: "." });
});

app.get("/blog/why-digital-ocean", (_, res) => {
  console.log("inside create droplet route");
  res.sendFile("public/blog/1_why_digital_ocean.html", { root: "." });
});

app.get("/blog/create-droplet", (_, res) => {
  console.log("inside create droplet route");
  res.sendFile("public/blog/2_create_droplet.html", { root: "." });
});

app.get("/blog/deploy-node-server", (_, res) => {
  console.log("inside create droplet route");
  res.sendFile("public/blog/3_deploy_node_server.html", { root: "." });
});

app.get("/blog/deploy-python-server", (_, res) => {
  console.log("inside create droplet route");
  res.sendFile("public/blog/4_deploy_python_server.html", { root: "." });
});

app.get("*", (_, res) => {
  res.status(404);
  res.sendFile("public/pages/404.html", { root: "." });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on at http://localhost:${process.env.PORT}.`);
});
