const express = require("express");
const route = express.Router();
const { getByUserId, getById, getAllData, createPlace } = require("../controller/placeController");

route.get("/", getAllData);

route.get("/:id", getById);

route.get("/user/:age", getByUserId);

route.post("/", createPlace)

module.exports = route;
