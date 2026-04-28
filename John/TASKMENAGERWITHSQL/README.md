# Node.js MVC Setup with PostgreSQL

A basic Node.js project setup with Express.js following the MVC (Model-View-Controller) pattern, including middleware, routes, controllers, and PostgreSQL database integration.

## Project Structure

```
.
├── config/
│   ├── database.js          # PostgreSQL database connection
│   └── schema.sql           # Database schema and sample data
├── controllers/
│   └── userController.js    # Business logic for user operations
├── middleware/
│   ├── logger.js            # Request logging middleware
│   └── errorHandler.js      # Error handling middleware
├── routes/
│   └── userRoutes.js        # User route definitions
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── server.js               # Main application entry point
└── README.md               # This file
```

## Features

- **Express.js** - Fast, unopinionated web framework
- **PostgreSQL Database** - Powerful relational database with pg driver
- **Connection Pooling** - Efficient database connection management
- **ES6 Modules** - Modern import/export syntax
- **Nodemon** - Auto-restart server on file changes
- **MVC Pattern** - Organized code structure
- **Middleware** - Logger and error handler
- **RESTful API** - CRUD operations for users
- **Environment Variables** - Configuration management
- **Error Handling** - Comprehensive error handling for database operations

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up PostgreSQL database:
   - Install PostgreSQL on your system if not already installed
   - Create a database and run the schema:
   ```bash
   psql -U postgres -f config/schema.sql
   ```
   Or manually:
   ```bash
   psql -U postgres
   CREATE DATABASE nodejs_db;
   \c nodejs_db
   \i config/schema.sql
   ```

3. Configure environment variables:
   - Edit `.env` file with your PostgreSQL credentials:
   ```
   PORT=3000
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=root
   DB_NAME=nodejs_db
   DB_PORT=5432
   ```

## Running the Application

### Development Mode (with nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Example Requests

**Get all users:**
```bash
GET http://localhost:3000/api/users
```

**Create a new user:**
```bash
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Update a user:**
```bash
PUT http://localhost:3000/api/users/1
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

**Delete a user:**
```bash
DELETE http://localhost:3000/api/users/1
```

## Middleware

### Logger Middleware
- Logs all incoming requests with timestamp, method, and URL
- Located in `middleware/logger.js`

### Error Handler Middleware
- Catches and handles errors
- Returns formatted error responses
- Located in `middleware/errorHandler.js`

## Controllers

Controllers contain the business logic for handling requests:
- `userController.js` - Handles all user-related operations (CRUD)

## Routes

Routes define the API endpoints and map them to controller functions:
- `userRoutes.js` - User API routes

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=development
```

## Database Schema

The application uses a PostgreSQL database with the following schema:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

PostgreSQL features:
- **SERIAL** for auto-incrementing primary keys
- **Triggers** for automatic updated_at timestamp updates
- **Parameterized queries** ($1, $2) for SQL injection prevention

## Database Connection

The database connection is managed through a connection pool for better performance:
- Located in [`config/database.js`](config/database.js:1)
- Uses pg (node-postgres) driver
- Automatic connection testing on server start
- Connection pooling with configurable limits

## Next Steps

To extend this setup:

1. **Add Authentication:**
   - Install JWT or Passport.js
   - Create auth middleware
   - Add login/register routes

2. **Add Validation:**
   - Install express-validator
   - Add validation middleware

3. **Add More Models:**
   - Create additional tables
   - Add relationships between tables
   - Implement foreign keys

4. **Add More Features:**
   - File upload
   - Email service
   - Caching (Redis)
   - Rate limiting
   - Pagination
   - Search functionality

5. **Add Migrations:**
   - Use a migration tool like Knex.js
   - Version control your database schema

## Troubleshooting

**Database Connection Issues:**
- Verify PostgreSQL is running: `psql -U postgres`
- Check credentials in `.env` file
- Ensure database exists: `CREATE DATABASE nodejs_db;`
- Check PostgreSQL port (default: 5432)
- Check pg_hba.conf for authentication settings

**Common Errors:**
- `23505`: Email already exists (unique constraint violation)
- `relation "users" does not exist`: Run schema.sql to create tables
- `ECONNREFUSED`: PostgreSQL server is not running
- `password authentication failed`: Check DB_USER and DB_PASSWORD in .env

**PostgreSQL Commands:**
- List databases: `\l`
- Connect to database: `\c nodejs_db`
- List tables: `\dt`
- Describe table: `\d users`
- Exit: `\q`

## License

ISC