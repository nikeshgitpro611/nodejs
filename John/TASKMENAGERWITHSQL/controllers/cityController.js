import * as cityService from '../services/cityService.js';


export const getAllCities = async (req, res) => {
  try {
    const result = await cityService.getAllCities(req.query);

    const formattedDate = result.data.map(data => {
      const dateFormatter = new Date(data.task_date);
      console.log('F:', dateFormatter)

      return {...data, date: dateFormatter.toISOString().split('T')[0], Time : dateFormatter.toISOString().split('T')[1].split('.')[0] }
    })
    
    res.status(200).json({
      success: result.success,
      count: result.data.length,
      data: formattedDate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

// @desc    Get single city
// @route   GET /api/cities/:id
// @access  Public
export const getCityById = async (req, res) => {
  try {
    const result = await cityService.getCityById(req.params.id);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new city
// @route   POST /api/cities
// @access  Public
export const createCity = async (req, res) => {
  try {
    const { name, completed, task_date } = req.body;
    
    if (!name || !completed) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and country'
      });
    }
    
    const result = await cityService.createCity({ name, completed, task_date : new Date()});
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update city
// @route   PUT /api/cities/:id
// @access  Public
export const updateCity = async (req, res) => {
  try {
    const result = await cityService.updateCity(req.params.id, req.body);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete city
// @route   DELETE /api/cities/:id
// @access  Public
export const deleteCity = async (req, res) => {
  try {
    const result = await cityService.deleteCity(req.params.id);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Made with Bob
