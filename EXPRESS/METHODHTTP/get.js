const express = require('express');
const app =  express();
const {people} = require('./data')

app.get('/', (req,res)=>{
    res.status(200).json({sucess: true, people})
})


app.listen(5000, ()=> console.log('Connected..!'))