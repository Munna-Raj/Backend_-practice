import express from 'express';
import { addFavorite, removeFavorite, getFavorites, getAllFavorites } from '../controller/favcontroller.js';
// import authMiddleware from '../middleware/authMiddleware.js'; // assuming you have authentication middleware

import { isAuthenticated } from '../middleware/authMiddleware.js';


const router = express.Router();

// router.post('/add', authMiddleware, addFavorite);
// router.delete('/remove', authMiddleware, removeFavorite);
// router.get('/my-favorites', authMiddleware, getFavorites);
// router.get('/all-favorites', authMiddleware, getAllFavorites);



router.post('/add',  addFavorite);
router.delete('/remove', removeFavorite);
router.get('/my-favorites',  getFavorites);
router.get('/all-favorites', getAllFavorites);



export default router;
