const express = require("express");
const app = express();
const placeRoures = require("./router/placeRoutes");
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/api',placeRoures);

app.use((error, req, res,next)=>{
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An Unknown Error Occured...!'});
})

app.listen("3002", () => {
  console.log("Server Connected on 3002");
});
