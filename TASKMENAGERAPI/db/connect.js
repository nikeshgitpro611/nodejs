const mongoose = require('mongoose')
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;


const connectDb = (url) => {
    
    return mongoose.connect(url, {
        useNewUrlParser: true, useUnifiedTopology: true 
    })
};

module.exports = connectDb