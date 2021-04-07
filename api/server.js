const express = require("express");

const server = express();

const PostsRouter = require("./posts/posts-router.js");

server.use(express.json());
server.use("/api/posts", PostsRouter);

server.use("*", (req, res) => {
  res.status(404).json({ message: "Data not found" });
});

module.exports = server;
