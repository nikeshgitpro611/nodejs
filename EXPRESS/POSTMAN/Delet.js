const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { people } = require('./data')

//Middleware
app.use(bodyParser.json());

app.delete('/api/:id', (req, res) => {
    const { id } = req.params;
    const peopleId = people.find(data => data.id === Number(id))
    console.log(peopleId);
    if (!peopleId) {
        return res.status(400).json({ success: false, msg: `Hey! id ${id} not matched with db...` })
    }
    const matchedId =  people.filter(data => data.id !== Number(id))
    console.log('matchedId : ', matchedId);
    return res.status(200).json({success: true, msg : matchedId})
})


app.listen(5000, () => console.log('Server connected!!'))