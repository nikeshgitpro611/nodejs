const express = require('express');
const app = express();
const connectDb = require('./db/connect')
const routerPath = require('./route/router')
require('dotenv').config();

//Middleware
app.use(express.json());

app.use('/api/v1/tasks', routerPath);
// const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(5000, () => console.log('Server Connected on 5000.....!!'))
    } catch (error) {
        console.log('Error connecting to MongoDB: : ', error.message);
    }
};

start()
