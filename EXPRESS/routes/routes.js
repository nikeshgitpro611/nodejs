const bodyParser = require('body-parser');
const express = require('express')
const route = express.Router();
const { people } = require('../data')
const { peopleGet } = require('../controller/controller')

route.use(bodyParser.json())

route.get('/', peopleGet)

route.post('/', (req, res) => {
    const { user } = req.body;
    let msg;
    console.log(req.body);
    if (!user) {
        msg = "please check credantial"
        return res.status(400).json({ sucessful: false, message: msg })
    }
    res.status(200).json({ sucessful: true, message: `Hey ! ${user}` })
})

route.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    const personId = people.find(data => data.id === Number(id))
    console.log(personId);
    if (!personId) {
        return res.status(400).json({ success: false, message: `Hey This Id ${id} not exist in db` })
    }

    const userNameChange = people.map(data => {
        if (data.id === Number(id)) {

            data.name = user
        }
        return data
    })
    res.status(200).json({ success: true, message: people, user: userNameChange })

})

route.delete('/:id', (req, res) => {
    const { id } = req.params;
    const peopleId = people.find(data => data.id === Number(id))
    console.log(peopleId);
    if (!peopleId) {
        return res.status(400).json({ success: false, msg: `Hey! id ${id} not matched with db...` })
    }
    const matchedId = people.filter(data => data.id !== Number(id))
    console.log('matchedId : ', matchedId);
    return res.status(200).json({ success: true, msg: matchedId })
})

module.exports = route;