const task = require("../modal/task");
const Task = require("../modal/task");
const { asyncWrapper } = require("../utils");

const creatTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(200).json({
    message: "Successfully creatTask",
    data: task,
  });
});

const getAllTask = asyncWrapper(async (req, res) => {
  const task = await Task.find({});
  res.status(200).json({
    message: "Successfully getAllTask",
    data: task,
  });
});

const getTaskById = async (req, res) => {
  // Getting Task By Parms Id
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    console.log("Task", task, id);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: `Task is not available based on ${id}`,
      });
    }

    res.status(200).json({
      status: true,
      message: "Get Taske Based on _id",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log("TASK : ", task);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      message: "Successfully updateTask based on id",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went Worng...",
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });
    res.status(200).json({
      message: "You Deleted Sucessfully ...",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Some thing is wrong Check Please",
    });
  }
};

module.exports = {
  creatTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
};
