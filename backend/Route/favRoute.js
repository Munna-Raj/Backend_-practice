import express from 'express';
import { addFavorite, removeFavorite, getFavorites, getAllFavorites } from '../controller/favcontroller.js';
// import authMiddleware from '../middleware/authMiddleware.js'; // assuming you have authentication middleware

import { isAuthenticated } from '../middleware/authMiddleware.js';


const router = express.Router();

// router.post('/add', authMiddleware, addFavorite);
// router.delete('/remove', authMiddleware, removeFavorite);
// router.get('/my-favorites', authMiddleware, getFavorites);
// router.get('/all-favorites', authMiddleware, getAllFavorites);



router.post('/add', isAuthenticated, addFavorite);
router.delete('/remove', isAuthenticated, removeFavorite);
router.get('/my-favorites', isAuthenticated, getFavorites);
router.get('/all-favorites', isAuthenticated, getAllFavorites);



export default router;
