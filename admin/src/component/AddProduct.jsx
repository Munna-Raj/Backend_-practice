import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ProductName: "",
    ProductCode: "",
    Price: "",
    Stock: "",
    Thumbnail: "",
    Description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/product", formData);
      alert("Product added successfully!");
      navigate("/products"); // navigate back to product table
    } catch (err) {
      console.error("Error adding product", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="ProductName"
          placeholder="Product Name"
          value={formData.ProductName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="ProductCode"
          placeholder="Product Code"
          value={formData.ProductCode}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="Price"
          placeholder="Price"
          value={formData.Price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="Stock"
          placeholder="Stock"
          value={formData.Stock}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="Thumbnail"
          placeholder="Thumbnail URL"
          value={formData.Thumbnail}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
