// const express =  require('express');
const Task = require('../modal/task')



const taskGet = (req, res) => {
    res.send('Welcom Data Connected')
    // return res.status(200).json({success : true, msg : "Welcom page"})
}

const getAllTask = (req, res) => {
    res.send("Data AllTask......!!")
}
const creatTask = async (req, res) => {
    const taskData = await Task.create(req.body)
    // res.send("update AllTask......!!")
    res.status(201).json(taskData)
}
const getTask = (req, res) => {
    res.json({ id: req.params.id })
    // res.send("Data AllTask......!!")
}
const updateTask = (req, res) => {
    res.send(" AllTask......!!")
}
const deleteTask = (req, res) => {
    res.send("Data AllTask......!!")
}

module.exports = {
    getAllTask, creatTask,
    deleteTask, taskGet,
    updateTask, getTask
}


