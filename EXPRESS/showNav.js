// Task :  on click home page show on navbar

const express =  require('express')
const app =  express();
const path = require('path');

//Using Midddle Ware app logo and all are not working
app.use(express.static('./public'))

// Same thing we can handle by middle ware only need to be move all file in public dir
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "./navBar/index.html"))
// })

app.all('*', (req, res) => {
    res.status(401).send('No page found...')
})

app.listen(5000, () => console.log('Server connected!!'))