const express = require("express");
const RouterPath = require("./route/router");
const app = express();
const cors = require("cors");
const connectDb = require("./db/connect");
const { errorHandler } = require("./utils");
require("dotenv").config();

// Check if the environment variables are loaded correctly
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env file");
}

// CORS
const corsOptions = {
  origin: "http://localhost:5173", // Fixed CORS origin (no trailing slash)
  optionsSuccessStatus: 200, // some legacy browsers (IE11, SmartTVs) choke on 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/v1/tasks", RouterPath);
app.use(errorHandler);

//Port
const port = process.env.PORT || 5000;
// console.log('PORT : ',port);


const start = async () => {
  try {
    // Connect to MongoDB using the URI from the environment variable
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server connected on port ${port}`));
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};

start();
