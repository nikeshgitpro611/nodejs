const bodyParser = require('body-parser');
const express = require('express');
const app = express();


app.use(bodyParser.json())

app.post('/postdata', (req, res) => {
    const { user } = req.body;
    let msg;
    console.log(req.body);
    if (!user) {
        msg = "please check credantial"
        return res.status(400).json({ sucessful: false, message: msg })
    }
    res.status(200).json({ sucessful: true, message: `Hey ! ${user}` })
})

app.listen(5000, () => console.log('Server connected!!'))







// const express = require('express');
// const app =  express();
// const bodyParser = require('body-parser');
// const {people,products} =  require('./data')

// //middleware static
// app.use(express.static('./PostPublic'))
// //2nd middleware for form data
// app.use(express.urlencoded({extended: false}))
// app.use(bodyParser.json())

// app.post('/login/pepol', (req,res)=>{
//     const {user} = req.body;
//     console.log('Body Data : ', req.body);
//     if (!user) {
//        return res.status(400).json({sucess : false, message : 'Provide Name val' })
//     }
//     res.status(200).json({sucess : true, msg : `${user}`})
// })
// app.post('/login', (req,res)=>{
//     const {name} = req.body;
//     console.log('Body Data : ', req.body);
//     if (name) {
//         res.status(200).send(`wlecom to you ${name}`)
//     }
//     res.status(400).send('Plesase put credential....!')
// })


// app.get('/get', (req, res) => {
//     res.json(products)
// })

// app.listen(5000, ()=> console.log('Connected..!'))