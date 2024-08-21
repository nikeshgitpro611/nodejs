const express = require("express");
const route = express.Router();
const { getByUserId, getById, getAllData, createPlace, updatePlaceById, deletePlaceById } = require("../controller/placeController");

route.get("/", getAllData);

route.get("/:id", getById);

route.get("/user/:age", getByUserId);

route.post("/", createPlace);

route.patch("/:id", updatePlaceById);

route.delete("/:id", deletePlaceById)

module.exports = route;
