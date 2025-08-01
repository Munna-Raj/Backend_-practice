import Order from '../model/order.js';
import Product from '../model/product.js';

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    const { productId, quantity, shippingAddress, paymentMethod } = req.body;
    const userId = req.user.id; // assume you have authentication middleware

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check stock
    if (product.Stock < quantity) {
      return res.status(400).json({ msg: 'Not enough stock available' });
    }

    // Calculate total price
    const totalPrice = product.Price * quantity;

    // Create order
    const order = new Order({
      userId,
      productId,
      quantity,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    // Reduce product stock
    product.Stock -= quantity;
    await product.save();

    await order.save();

    res.status(201).json({ msg: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('productId', 'ProductName Price');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

// Get orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).populate('productId', 'ProductName Price');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ msg: 'Order status updated', order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};
