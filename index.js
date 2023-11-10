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

app.get("/cv", (_, res) => {
  res.sendFile("public/files/Roell_CV.pdf", { root: "." });
});

app.get("/blog", (_, res) => {
  res.sendFile("public/blog/blog_home.html", { root: "." });
});

app.get("/papers/gpt4-knowledge-mining", (_, res) => {
  res.sendFile("public/papers/gpt4-knowledge-mining.pdf", { root: "." });
});

app.get("/papers/r-opacus-genome-scale-model", (_, res) => {
  res.sendFile("public/papers/r-opacus-genome-scale-model.pdf", { root: "." });
});

app.get("/papers/syngas-machine-learning", (_, res) => {
  res.sendFile("public/papers/syngas-machine-learning.pdf", { root: "." });
});

app.get("/papers/system-biology-r-opacus", (_, res) => {
  res.sendFile("public/papers/system-biology-r-opacus.pdf", { root: "." });
});

app.get("/papers/division-of-labor-review", (_, res) => {
  res.sendFile("public/papers/division-of-labor-review.pdf", { root: "." });
});

app.get("/blog/how-to-set-up-a-digitalocean-droplet", (_, res) => {
  res.sendFile("public/blog/1_setup_droplet.html", { root: "." });
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

// this is to help ImpactDB
app.get("/molecular-inventory", (_, res) => {
  res.sendFile("public/files/molecular_inventory.xlsx", { root: "." });
});

app.get("*", (_, res) => {
  res.status(404);
  res.sendFile("public/pages/404.html", { root: "." });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on at http://localhost:${process.env.PORT}`);
});
