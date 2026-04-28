import express from 'express';
import {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity
} from '../controllers/cityController.js';

const router = express.Router();

// Route: /api/cities
router.route('/')
  .get(getAllCities)
  .post(createCity);

// Route: /api/cities/:id
router.route('/:id')
  .get(getCityById)
  .put(updateCity)
  .delete(deleteCity);

export default router;

// Made with Bob
