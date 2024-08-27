const express = require("express");
const {
  getAllTyData,
  getDataByLocation,
  getPlotlyWindowAndAccuranceData,
  getAllFilterLineData,
  getAllDataForBarChartGui,
  getAllFilterDataForBarChart,
} = require("../controller/controllerAllData");
const route = express.Router();

route.get("/", getAllTyData);
route.get("/location", getDataByLocation);
route.get("/plotly", getPlotlyWindowAndAccuranceData);
route.post("/postLineChart", getAllFilterLineData);
route.get("/barChart", getAllDataForBarChartGui);
route.post("/postBarChart", getAllFilterDataForBarChart);

module.exports = route;
