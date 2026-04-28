import pg from 'pg';
const { Pool } = pg;

// Create connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : 'root',
  database: process.env.DB_NAME || 'dvdrental',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Debug: Log connection details (remove password for security)
console.log('Database Config:', {
  host: pool.options.host,
  user: pool.options.user,
  database: pool.options.database,
  port: pool.options.port
});

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL Database connected successfully');
    client.release();
  } catch (error) {
    console.error('❌ PostgreSQL Database connection failed:', error.message);
    process.exit(1);
  }
};

export { pool, testConnection };

// Made with Bob
