const express =  require('express');
const app = express();
const routerPath =  require('./route/router')

//Middleware
app.use(express.json());

app.use('/api/v1/tasks', routerPath)

app.listen(5000, ()=>console.log('Server Connected.....!!'))