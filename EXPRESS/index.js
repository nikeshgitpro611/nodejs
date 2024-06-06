// const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const peopleRoute =  require('./routes/routes')
// const { people } = require('./data')

//Middleware
// app.use(bodyParser.json());

//route
app.use('/api/people', peopleRoute)
app.listen(5000, () => console.log('Server connected!!'))