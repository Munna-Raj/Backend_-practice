khaltiRoute.js
import express from 'express';
import { addKhalti, verifyTransaction } from '../controllers/khaltiController.js';

const router = express.Router();

router.post('/initiate', addKhalti);
router.post('/verify', verifyTransaction);

export default router;