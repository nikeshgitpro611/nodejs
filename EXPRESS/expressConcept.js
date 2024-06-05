const express = require('express');
const app = express();


//MiddleWare
app.get('/', (req, res) => {
    console.log('Home Page');
    res.send('Welcom to home Page')
});
app.get('/about', (req, res) => {
    // console.log('Home Page');
    res.status(200).send('Welcom to about Page')
});

app.all('*', (req, res) => {
    // console.log('Home Page');
    res.send('<h1>Hey Page Not</h1>')
});

//Port Listen

app.listen(5000, () => console.log('Server connected!'))