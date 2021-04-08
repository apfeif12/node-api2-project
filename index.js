// require your server and launch it here
require("dotenv").config();

const server = require("./api/server");

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/api/", (_, res) => {
    res.json({ data: "API working" });
});

