const express = require("express");
const { getAllTask, creatTask, getTaskById, deleteTask, updateTask } = require("../controller/controller");
const router = express.Router();

router.route("/").get(getAllTask).post(creatTask);
router.route('/:id').get(getTaskById).delete(deleteTask).patch(updateTask);

module.exports = router;
