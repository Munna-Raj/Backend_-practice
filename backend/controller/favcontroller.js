import mongoose from 'mongoose';
import Favorite from '../model/favModel.js';
import product from '../models/product.js'; 
// import CourseFavorite from '../models/CourseFavorite.js';

// Add a product to user's favorites
export const addFavorite = async (req, res) => {
  const { productId } = req.body;  // match the key sent from frontend
  const userId = req.user.id;
  console.log("User ID:", userId);
  console.log("product ID:", productId);

  try {
    // Validate ObjectId format
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    // Find the product by ID
    const product = await product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'product not found' });
    }

    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({
      userId,
      productId: product._id,
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    // Create and save the new favorite
    const newFavorite = new Favorite({
      userId,
      productId: product._id,
    });

    await newFavorite.save();

    res.status(201).json({ message: 'Added to favorites', favorite: newFavorite });
  } catch (err) {
    console.error("Error adding favorite:", err);
    res.status(500).json({ message: 'Error adding to favorites', error: err.message });
  }
};

// export const addCourseFavorite = async (req, res) => {
//   const { courseId } = req.body;  // match the key sent from frontend
//   const userId = req.user.id;
  
//   console.log("User ID:", userId);
//   console.log("Course ID:", courseId);

//   try {
//     // Validate ObjectId format
//     if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
//       return res.status(400).json({ message: 'Invalid course ID format' });
//     }

//     // Check if the course exists and if it's already in the user's favorites
//     const existingFavorite = await CourseFavorite.findOne({
//       userId,
//       courseId: mongoose.Types.ObjectId(courseId),
//     });

//     if (existingFavorite) {
//       return res.status(400).json({ message: 'Course is already in your favorites' });
//     }

//     // Find the course by ID
//     const course = await Course.findById(courseId);

//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     // Create and save the new course favorite
//     const newFavorite = new CourseFavorite({
//       userId,
//       courseId: course._id,
//     });

//     await newFavorite.save();

//     // Send response with favorite details
//     res.status(201).json({
//       message: 'Course added to favorites',
//       favorite: {
//         userId,
//         courseId: course._id,
//         courseName: course.name,  // Example: Add the course's name to the response
//       },
//     });
//   } catch (err) {
//     console.error("Error adding course favorite:", err);
//     res.status(500).json({ message: 'Error adding course to favorites', error: err.message });
//   }
// };

// Remove a product from user's favorites
export const removeFavorite = async (req, res) => {
  const { productId } = req.body;

  try {
    const deleted = await Favorite.findOneAndDelete({ productId });

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
  const userId = req.user.id; // Get user ID from authenticated request

  try {
    // Find all favorites for the user and populate product details
    const favorites = await Favorite.find({ userId }).populate('productId');

    if (favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this user' });
    }

    res.status(200).json({ message: 'Favorites fetched successfully', data: favorites });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorites', error: err.message });
  }
};

export const getAllFavorites = async (req, res) => {
  try {
    // Fetch all favorite records, with both user and product populated
    const favorites = await Favorite.find()
      .populate('productId')
      .populate('userId'); // optional: if you want user info too

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