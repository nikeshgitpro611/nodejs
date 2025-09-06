import express from "express";
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";
import connectDb from "./db/connected.js";
import dotenv from "dotenv";
import productRoute from "./route/product.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send('<h1>Home Page</h1> <a href="/api/products">Products</a>');
});

app.use("/api/products",productRoute);

// Error Handling Middleware
app.use(errorHandlerMiddleware);

// 404 Not Found handler
app.use((req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

// Start server and connect DB inside try-catch
const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server connected at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); // Exit process with failure
  }
};

startServer();
