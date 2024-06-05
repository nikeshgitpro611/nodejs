const express = require('express');
const app = express();
const {getHome,authrise} = require('./middleWareval')
var morgan = require('morgan')
// const authrise = require('./middleWareBasic')
//middleware
app.use(morgan('tiny'))
// app.use(getHome)
// for multiple middleware
// app.use([getHome, authrise])

app.get('/', (req, res) => { res.send('Wlcom to home') })

app.get('/about', (req, res) =>{
    console.log('User : ', req.user);
    res.send('About')
})

app.listen(5000, () => console.log('Connected...'))