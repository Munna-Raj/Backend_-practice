// src/product/Favorites.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const userId = '68747010de86c89aea15c0f6'; // Replace with real user ID when auth is added

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/favorites/${userId}`);
        setFavorites(response.data); // Assuming backend sends list of full product objects
      } catch (err) {
        console.error('Fetch favorites error:', err);
        setError('Failed to fetch favorites');
      }
    };

    fetchFavorites();
  }, []);

  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">My Favorites</h2>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorites yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow p-4">
                <img
                  src={product.Thumbnail}
                  alt={product.ProductName}
                  className="w-full h-48 object-cover rounded mb-4"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=No+Image')}
                />
                <h3 className="text-lg font-bold">{product.ProductName}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.Description}</p>
                <p className="text-gray-900 font-semibold mt-2">Rs. {product.Price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
