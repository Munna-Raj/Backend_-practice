import express from 'express';
import {
  placeOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from '../controller/orderController.js';

import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Place new order
router.post('/', isAuthenticated, placeOrder);

// Get all orders (Admin only)
router.get('/', isAuthenticated, isAdmin, getAllOrders);

// Get logged-in user orders
router.get('/my-orders', isAuthenticated, getUserOrders);

// Update order status (Admin only)
router.put('/:orderId/status', isAuthenticated, isAdmin, updateOrderStatus);

export default router;
