const express = require("express");
const {
  errorHandlerMiddleware,
  notFound,
} = require("./middleware/error-handler");
const connectDbWithMongoose = require("./db/connectDb");
const app = express();
const cors = require("cors");
const allRoutesPath = require("./routes/allRoutes");
const Product = require('./modals/productSchemaDefine')
require("dotenv").config();
require("express-async-errors");

//CORs
const corsConfig = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

// Middleware
app.use(express.json());
app.use(cors(corsConfig));
app.use(errorHandlerMiddleware);

app.use("/api/v1/products", allRoutesPath);
app.use(notFound);


const port = process.env.Port || 6000;

const start = async () => {
  try {
    await connectDbWithMongoose(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server connected on port ${port}`));
  } catch (error) {
    console.error("Something went wrong...", error);
  }
};

start();
