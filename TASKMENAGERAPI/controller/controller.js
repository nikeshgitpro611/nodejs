// const express =  require('express');
const Task = require('../modal/task')



const taskGet = (req, res) => {
    res.send('Welcom Data Connected')
    // return res.status(200).json({success : true, msg : "Welcom page"})
}

const getAllTask = async (req, res) => {
    // res.send("Data AllTask......!!")
    try {
        //Getting all Task
        const tasksGet = await Task.find({});
        res.status(200).json({ tasksGet })
    } catch (error) {
        res.status(500).json({ mes: error })
    }
}
const creatTask = async (req, res) => {
    try {
        const taskData = await Task.create(req.body)
        res.status(201).json({ taskData })
    } catch (error) {
        res.status(500).json({ mes: error.message })
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const taskData = await Task.findOne({ _id: taskId });
        if (!taskData) {
            return res.status(404).json({ msg: `No Id Match ${taskId}` })
        }
        res.status(200).json({ taskData });
    } catch (error) {
        res.status(500).json({ msg: error.message })
    };
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


