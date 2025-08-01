import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from './../product/ProductForm';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold mb-4">FoodStore</h3>
          <p className="text-gray-400">Delicious food delivered fast and fresh.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/Product" className="hover:text-red-400">Home</Link></li>
            <li><Link to="/Product" className="hover:text-red-400">Menu</Link></li>
            <li><Link to="/About" className="hover:text-red-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-red-400">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">Kathmandu, Nepal</p>
          <p className="text-gray-400">Email: Munnarajyadav@gmail.com</p>
          <p className="text-gray-400">Phone: +977-9829395174</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; 2025 FoodStore. All rights reserved.
      </div>
    </footer>
  );
}
