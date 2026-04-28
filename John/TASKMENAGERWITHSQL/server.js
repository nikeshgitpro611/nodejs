import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import database connection
import { testConnection } from './config/database.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import cityRoutes from './routes/cityRoutes.js';

// Import middleware
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Node.js MVC API' });
});

app.use('/api/users', userRoutes);
app.use('/api/cities', cityRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Made with Bob
