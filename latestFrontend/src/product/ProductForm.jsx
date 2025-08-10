import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingFavorites, setAddingFavorites] = useState({});

  // Replace with logged-in user ID
  const userId = 'YOUR_USER_ID_HERE';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/favorites/${userId}`);
        setFavorites(res.data.favorites.map(fav => fav._id || fav));
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };

    fetchProducts();
    fetchFavorites();
  }, [userId]);

  const handleAddToFavorites = async (productId) => {
    if (!userId) {
      toast.warn('User ID not set. Please login.');
      return;
    }

    if (favorites.includes(productId)) {
      toast.info('Already in favorites.');
      return;
    }

    setAddingFavorites((prev) => ({ ...prev, [productId]: true }));

    try {
      const response = await axios.post(
        'http://localhost:5000/api/favorites/add',
        { userId, productId }
      );

      toast.success(response.data.message || 'Added to favorites');
      setFavorites((prev) => [...prev, productId]);
    } catch (err) {
      console.error('Failed to add favorite:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to add favorite.');
    } finally {
      setAddingFavorites((prev) => ({ ...prev, [productId]: false }));
    }
  };

  if (loading) {
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
      <ToastContainer />
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
                  <div className="mt-4">
                    <span className="text-lg font-bold text-gray-900">
                      Rs. {product.Price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => window.location.href = '/payment'}
                    className="block text-center w-full mt-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => handleAddToFavorites(product._id)}
                    disabled={addingFavorites[product._id]}
                    className={`block text-center w-full mt-2 py-2 rounded transition ${
                      favorites.includes(product._id)
                        ? 'bg-pink-600 text-white'
                        : 'bg-pink-500 text-white hover:bg-pink-600'
                    }`}
                  >
                    {favorites.includes(product._id) ? '❤️ Favorited' : '❤️ Add to Favorites'}
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
