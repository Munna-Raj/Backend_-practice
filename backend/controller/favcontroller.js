import Product from '../model/product.js';
import User from '../model/User.js';

// Add product to user's favorites
export const addToFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: 'userId and productId are required' });
    }

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found' });
    }

    // Prevent duplicates
    if (user.favorites.includes(productId)) {
      return res.status(400).json({ message: 'Product already favorited' });
    }

    user.favorites.push(productId);
    await user.save();

    return res.status(200).json({
      message: 'Product added to favorites',
      favorites: user.favorites
    });
  } catch (err) {
    console.error('Error adding to favorites:', err);
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message
    });
  }
};

// Get all favorite products for a user
export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// Remove a product from favorites
export const removeFromFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.favorites = user.favorites.filter(id => id.toString() !== productId);
    await user.save();

    return res.status(200).json({
      message: 'Removed from favorites',
      favorites: user.favorites
    });
  } catch (err) {
    console.error('Error removing favorite:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// Clear all favorites
export const clearFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.favorites = [];
    await user.save();

    return res.status(200).json({
      message: 'All favorites cleared',
      favorites: []
    });
  } catch (err) {
    console.error('Error clearing favorites:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
