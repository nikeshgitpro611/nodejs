const express = require("express");
const { getAllProduct, creatData } = require("../controller/product");
const router = express.Router();

router.route("/").get(getAllProduct).post(creatData);

module.exports = router;
