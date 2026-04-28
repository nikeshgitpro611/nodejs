-- Create database
CREATE DATABASE nodejs_db;

-- Connect to the database
\c nodejs_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO users (name, email) VALUES
  ('John Doe', 'john@example.com'),
  ('Jane Smith', 'jane@example.com')
ON CONFLICT (email) DO NOTHING;

-- Create city table
CREATE TABLE IF NOT EXISTS city (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  population INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger to automatically update updated_at for city
CREATE TRIGGER update_city_updated_at
BEFORE UPDATE ON city
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert sample city data
INSERT INTO city (name, country, population) VALUES
  ('New York', 'USA', 8336817),
  ('London', 'UK', 9002488),
  ('Tokyo', 'Japan', 13960000),
  ('Paris', 'France', 2161000),
  ('Mumbai', 'India', 20411000)
ON CONFLICT DO NOTHING;

-- Made with Bob
