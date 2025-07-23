import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import SelectPaymentType from './../pages/Payment';
import SelectPaymentType from './../pages/SelectPaymentType';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Add to favorites handler
const handleAddToFavorites = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const userId = decoded.id; // or decoded._id depending on how you set JWT

    const response = await axios.post(
      'http://localhost:5000/api/favorites/add',
      { productId, userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert(response.data.message || 'Added to favorites');
  } catch (err) {
    console.error('Failed to add favorite:', err);
    alert(err?.response?.data?.message || 'Something went wrong');
  }
};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-gray-500 sm:mt-4">
            High quality products for your needs
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.Thumbnail}
                    alt={product.ProductName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                      {product.ProductCode}
                    </span>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-gray-900 line-clamp-1">
                    {product.ProductName}
                  </h2>
                  <p className="mt-2 text-gray-500 text-sm line-clamp-2">
                    {product.Description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Rs. {product.Price.toLocaleString()}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        product.Stock > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.Stock > 0 ? `${product.Stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

               
                  <button
                    onClick={() => {
                      if (product.Stock > 0) {
                        window.location.href = '/Payment';
                      }
                    }}
                    className={`block text-center w-full mt-4 py-2 rounded ${
                      product.Stock > 0
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition`}
                    disabled={product.Stock === 0}
                  >
                    {product.Stock > 0 ? 'Buy Now' : 'Out of Stock'}
                  </button>

                  
                  <button
                    onClick={() => handleAddToFavorites(product._id)}
                    className="block text-center w-full mt-2 py-2 rounded bg-pink-500 text-white hover:bg-pink-600 transition"
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
