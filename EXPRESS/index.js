const express = require('express');
const app = express();
const {people, products} = require('./data')

app.get('/',(req, res) => {
    res.json(products)
})



app.listen(5000, () => console.log('Server connected!'))