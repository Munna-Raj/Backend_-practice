// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  const userId = '68706e554aa642201b7b4867'; // Same as in ProductList

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/favorites/${userId}`);
        setFavorites(response.data.favorites);
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
        setError('Failed to fetch favorites. Please try again later.');
      }
    };

    fetchFavorites();
  }, []);

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        No favorite products found.
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Your Favorite Products</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded shadow">
            <img
              src={product.Thumbnail}
              alt={product.ProductName}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{product.ProductName}</h2>
            <p className="text-gray-600 text-sm mt-1">{product.Description}</p>
            <div className="mt-3 font-semibold text-lg text-blue-600">Rs. {product.Price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
