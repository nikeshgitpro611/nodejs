const express =  require('express')
// const route = express.Router();
const { people } = require('../data')

// route.use(bodyParser.json())

const peopleGet = (req, res) => {
    res.json(people)
}

module.exports = {peopleGet}