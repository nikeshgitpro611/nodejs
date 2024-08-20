const express = require("express");
const app = express();
const placeRoutes = require("./router/placeRoutes");
// const bodyParser = require("body-parser");
require("dotenv").config();

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1/api", placeRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred." });
});

app.listen(3002, () => {
  console.log("Server connected on port 3002");
});
