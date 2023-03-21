const express = require("express");
const app = express();
const cors = require("cors");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(express.urlencoded({ extended: true }));

// routes
const userRoute = require("./routes/user.routes");
app.use("/api/", userRoute);

module.exports = app;
