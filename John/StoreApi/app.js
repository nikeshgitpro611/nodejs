import express from "express";
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";
import connectDb from "./db/connected.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
// const port = 5000;

app.use(express.json());
connectDb(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send('<h1>Home Page</h1> <a href = "/api/products">Products</a>');
});

app.get("/api/products", (req, res) => {
  res.send('<h1>Product Page</h1> <a href = "/">Home</a>');
});

app.use(errorHandlerMiddleware);

// 404 Not Found handler (should be the last route)
app.use((req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(process.env.PORT, () =>
  console.log(`Server connected http://localhost:/${process.env.PORT}`)
);
