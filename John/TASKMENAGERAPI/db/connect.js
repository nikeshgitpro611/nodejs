const mongoose = require("mongoose");

// const connectiong =
//   "mongodb+srv://nik:1234@nodewithexpress.7cbu6.mongodb.net/NodeWithExpress?retryWrites=true&w=majority&appName=NodeWithExpress";

const connectDb = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected To The Db.."))
    .catch((err) => console.error("Error connecting to DB:", err.message));
};

module.exports = connectDb;
