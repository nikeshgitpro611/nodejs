const express = require("express");
const app = express();
const cors = require("cors");
const allRoutePath = require("./route/routePath");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000", // Fixed CORS origin
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middleware
app.use(cors(corsOptions));

app.use(express.json()); // Using express.json() instead of bodyParser

app.use("/api/@ty", allRoutePath);

//Server and port connection...
const PORT = process.env.PORT || 3001; // Use environment variable or default to 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
