import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ProductList from './../product/ProductForm';
import Favorites from './../product/favorites';


export default function Nav() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left: Logo & Links */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-red-500">FoodStore</Link>
            <div className="hidden sm:flex space-x-8 ml-10">
              <Link to="/product" className="text-gray-700 hover:text-red-500 font-medium">Home</Link>
              <Link to="/Product" className="text-gray-700 hover:text-red-500 font-medium">Menu</Link>
              <Link to="/about" className="text-gray-700 hover:text-red-500 font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-red-500 font-medium">Contact</Link>
            </div>
          </div>

          {/* Right: Favorites + Account */}
          <div className="flex items-center space-x-4">

            {/* ✅ View Favorites Button */}
            <Link
              to="/Favorites"
              className="text-gray-700 hover:text-red-500 font-medium"
            >
              ❤️ Favorites
            </Link>

            {/* Account Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-red-500 focus:outline-none">
                <span>Account</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
                <Link to="/Signup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Signup</Link>
                <Link to="/Login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
