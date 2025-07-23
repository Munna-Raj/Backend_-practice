import mongoose from 'mongoose';
import Favorite from '../model/favModel.js';
import Product from '../model/product.js'; 

// Add a product to user's favorites
export const addFavorite = async (req, res) => {
  const { productId } = req.body;
  const userId = req.body.userId;

  console.log("User ID:", userId);
  console.log("Product ID:", productId);

  try {
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const foundProduct = await Product.findById(productId); 
    
    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingFavorite = await Favorite.findOne({
      userId,
      productId: foundProduct._id,
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    const newFavorite = new Favorite({
      userId,
      productId: foundProduct._id,
    });

    await newFavorite.save();

    res.status(201).json({ message: 'Added to favorites', favorite: newFavorite });
  } catch (err) {
    console.error("Error adding favorite:", err);
    res.status(500).json({ message: 'Error adding to favorites', error: err.message });
  }
};

// Remove a product from user's favorites
export const removeFavorite = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const deleted = await Favorite.findOneAndDelete({ userId, productId });

    if (!deleted) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing favorite', error: err.message });
  }
};

// Get all favorites for a user
export const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const favorites = await Favorite.find({ userId }).populate('productId');

    if (favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this user' });
    }

    res.status(200).json({ message: 'Favorites fetched successfully', data: favorites });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorites', error: err.message });
  }
};

// Get all favorites for all users (admin)
export const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find()
      .populate('productId')
      .populate('userId');

    res.status(200).json({
      message: 'All favorites fetched successfully',
      data: favorites,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching all favorites',
      error: err.message,
    });
  }
};
