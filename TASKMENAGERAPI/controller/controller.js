const taskGet = (req, res) => {
    res.send('Welcom Data Connected')
    // return res.status(200).json({success : true, msg : "Welcom page"})
}

const getAllTask = (req, res) => {
    res.send("Data AllTask......!!")
}
const creatTask = (req, res) => {
    res.send("update AllTask......!!")
}
const getTask = (req, res) => {
    res.send("Data AllTask......!!")
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


