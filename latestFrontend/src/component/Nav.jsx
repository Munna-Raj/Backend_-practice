import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-red-500">FoodStore</Link>
            <div className="hidden sm:flex space-x-8 ml-10">
              <Link to="/product" className="text-gray-700 hover:text-red-500 font-medium">Home</Link>
              <Link to="/Product" className="text-gray-700 hover:text-red-500 font-medium">Menu</Link>
              <Link to="/about" className="text-gray-700 hover:text-red-500 font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-red-500 font-medium">Contact</Link>
            </div>
          </div>

      
          <div className="flex items-center space-x-4 relative">

         
            <Link
              to="/Favorites"
              className="text-gray-700 hover:text-red-500 font-medium"
            >
              ❤️ Favorites
            </Link>

           
            <Link
              to="/account"
              className="text-gray-700 hover:text-red-500 font-medium"
            >
              Account
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}
