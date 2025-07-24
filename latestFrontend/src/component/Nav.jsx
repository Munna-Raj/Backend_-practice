import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
          <div className="flex items-center space-x-4 relative">

            {/* Favorites Link */}
            <Link
              to="/Favorites"
              className="text-gray-700 hover:text-red-500 font-medium"
            >
              ❤️ Favorites
            </Link>

            {/* Account Dropdown Toggle */}
            <button
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-red-500 font-medium focus:outline-none"
            >
              Account ▼
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-10 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <Link
                  to="/Signup"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Signup
                </Link>
                <Link
                  to="/Login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
