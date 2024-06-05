//Task -  show product on click [{id,img ,title}]

const express =  require('express');
const app =  express();
const {products} = require('./data')

//Show Product Btn
app.get('/', (req, res) => {
    res.status(200).send(`<h1> Welcom Home Page</h1> <a href = '/api/product'> product</a>`)
})

// route -  API/ product then json Data Show
app.get('/api/product', (req, res) => {
    const prductData =  products.map(data => {
        const {id, image, desc} =  data
        return {id, image, desc}
    })
    res.json(prductData)
})

app.listen(5000, () => console.log('Server Connected!!'))



