const express = require('express');
const { getTask, getAllTask, creatTask, updateTask, deleteTask } = require('../controller/controller');
const route = express.Router();

// route.get('/', getTask);
// or
route.route('/').get(getAllTask).post(creatTask);
route.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = route;