// normay call get method and retriv data
const express = require('express');
const app =  express();
const {people,} =  require('./data')

app.get('/get', (req, res) => {
    res.json(people)
})

app.listen(5000, ()=> console.log('Connected..!'))