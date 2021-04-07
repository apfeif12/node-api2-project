// implement your server here
// require your posts router and connect it here

const express = require("express");
const PostsRouter = require("./posts/posts-router.js");

const server = express();

server.use(express.json());
server.use("/api/posts", PostsRouter);

server.use("*", (req, res) => {
  res.status(404).json({ message: "Data not found" });
});

module.exports = server;
