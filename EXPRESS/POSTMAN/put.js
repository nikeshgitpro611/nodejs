const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { people } = require('./data')


app.use(bodyParser.json())

app.put('/putreq/:id', (req, res) => {
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
    res.status(200).json({ success: true, message: people, user: userNameChange})

})

app.listen(5000, () => console.log('Server connected!!'))