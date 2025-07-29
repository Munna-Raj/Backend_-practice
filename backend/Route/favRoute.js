import express from 'express';
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  clearFavorites,
} from '../controller/favcontroller.js';

const router = express.Router();

// Protected routes
router.post('/add', addToFavorites);
router.get('/', getFavorites);
router.delete('/remove', removeFromFavorites);
router.delete('/clear', clearFavorites);

export default router;
