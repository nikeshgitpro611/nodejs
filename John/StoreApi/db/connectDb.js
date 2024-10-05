const mongoose = require("mongoose");

const connectDbWithMongoose = async (url) => {
    
  try {
    const connect = await mongoose.connect(url); // No options needed in Mongoose 6.x and later
    console.log("Mongoose connected ....");
    return connect;
  } catch (error) {
    console.log("Something went wrong...", error.message);
  }
};

module.exports = connectDbWithMongoose;
