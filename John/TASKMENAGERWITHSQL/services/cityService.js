import { pool } from '../config/database.js';
import { cityQueries } from '../queries/cityQueries.js';

// Get all cities
export const getAllCities = async (queryParams = {}) => {
  try {
    const { name,        completed, sortBy = 'city_id', order = 'ASC', limit, offset } = queryParams;
    
    // Build dynamic query
    let query = 'SELECT * FROM city WHERE 1=1';
    const values = [];
    let paramCount = 1;
    
    // Add filters
    if (name) {
      query += ` AND city_name ILIKE $${paramCount++}`;
      values.push(`%${name}%`);
    }
    
    if (completed !== undefined) {
      query += ` AND completed = $${paramCount++}`;
      values.push(completed);
    }
    
    // Add sorting
    const validSortFields = ['city_id', 'city_name', 'completed', 'task_date'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'city_id';
    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    query += ` ORDER BY ${sortField} ${sortOrder}`;
    
    // Add pagination
    if (limit) {
      query += ` LIMIT $${paramCount++}`;
      values.push(parseInt(limit));
    }
    
    if (offset) {
      query += ` OFFSET $${paramCount++}`;
      values.push(parseInt(offset));
    }
    
    const result = await pool.query(query, values);
    return {
      success: true,
      data: result.rows
    };
  } catch (error) {
    throw new Error(`Error fetching cities: ${error.message}`);
  }
};

// Get city by ID
export const getCityById = async (id) => {
  try {
    const result = await pool.query(cityQueries.getById, [id]);
    
    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'City not found'
      };
    }
    
    return {
      success: true,
      data: result.rows[0]
    };
  } catch (error) {
    throw new Error(`Error fetching city: ${error.message}`);
  }
};

// Create new city
export const createCity = async (cityData) => {
  const { name,completed, task_date } = cityData;
  
  try {
    const result = await pool.query(cityQueries.create, [name, completed, task_date]);
    
    return {
      success: true,
      data: result.rows[0]
    };
  } catch (error) {
    if (error.code === '23505') {
      throw new Error('City already exists');
    }
    throw new Error(`Error creating city: ${error.message}`);
  }
};

// Update city
export const updateCity = async (id, cityData) => {
  const { name, country, population } = cityData;
  
  try {
    // Check if city exists
    const existingCity = await pool.query(cityQueries.exists, [id]);
    
    if (existingCity.rows.length === 0) {
      return {
        success: false,
        message: 'City not found'
      };
    }
    
    // Build update query
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (name !== undefined) {
      updates.push(`city_name = $${paramCount++}`);
      values.push(name);
    }
    
    if (country !== undefined) {
      updates.push(`country_name = $${paramCount++}`);
      values.push(country);
    }
    
    if (population !== undefined) {
      updates.push(`population = $${paramCount++}`);
      values.push(population);
    }
    
    if (updates.length === 0) {
      return {
        success: false,
        message: 'No fields to update'
      };
    }
    
    values.push(id);
    const query = `UPDATE city SET ${updates.join(', ')} WHERE city_id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);
    
    return {
      success: true,
      data: result.rows[0]
    };
  } catch (error) {
    throw new Error(`Error updating city: ${error.message}`);
  }
};

// Delete city
export const deleteCity = async (id) => {
  try {
    const existingCity = await pool.query(cityQueries.delete, [id]);
    
    if (existingCity.rows.length === 0) {
      return {
        success: false,
        message: 'Not valid id - City not found (404)'
      };
    }
    
    await pool.query(cityQueries.delete, [id]);
    
    return {
      success: true,
      message: 'City deleted successfully'
    };
  } catch (error) {
    throw new Error(`Error deleting city: ${error.message}`);
  }
};

// Made with Bob
