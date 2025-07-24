import express from 'express';
import { addFavorite, removeFavorite, getFavorites, getAllFavorites } from '../controller/favcontroller.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect routes with authentication middleware
router.post('/add', isAuthenticated, addFavorite);
router.delete('/remove', isAuthenticated, removeFavorite);
router.get('/my-favorites', isAuthenticated, getFavorites);
router.get('/all-favorites', isAuthenticated, getAllFavorites);

export default router;
