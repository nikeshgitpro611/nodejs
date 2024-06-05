//Use data.js file and after routing show data on ui of product id-1 and 2

const express = require('express');
const app = express();
const { products } = require('./data')

//btn prdct with home page
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Welcom To home Page <a href = '/api/products'>Product</a>`)
})

//navigate after clk on btn
app.get('/api/products', (req, res) => {
    res.status(200).json(products)
})

//routing behalf of productid
app.get('/api/products/:productId', (req, res) => {
    const { productId } = req.params;
    console.log('productId : ', req.params.productId);
    const findDataById = products.find(data => data.id === Number(productId))
    // console.log('findDataById : ', findDataById);
    !findDataById ? res.status(400).send('Item does not exist') : res.status(200).json(findDataById)

})

app.listen(5000, () => console.log("Hey Server connected!!"))