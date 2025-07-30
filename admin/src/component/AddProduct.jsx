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
    <div className="p-6 flex gap-10 max-w-7xl mx-auto">
      {/* Form section */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md flex-1"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
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

      {/* Side preview panel */}
      <div className="flex-1 border p-4 rounded shadow max-w-md bg-white">
        <h3 className="text-xl font-semibold mb-4">Product Preview</h3>

        {formData.Thumbnail ? (
          <img
            src={formData.Thumbnail}
            alt={formData.ProductName || "Thumbnail"}
            className="w-full h-48 object-cover rounded mb-4"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4 text-gray-500">
            No Image
          </div>
        )}

        <p>
          <strong>Name:</strong> {formData.ProductName || "-"}
        </p>
        <p>
          <strong>Code:</strong> {formData.ProductCode || "-"}
        </p>
        <p>
          <strong>Price:</strong>{" "}
          {formData.Price ? `$${formData.Price}` : "-"}
        </p>
        <p>
          <strong>Stock:</strong> {formData.Stock || "-"}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {formData.Description ? (
            <span className="whitespace-pre-wrap">{formData.Description}</span>
          ) : (
            "-"
          )}
        </p>
      </div>
    </div>
  );
}
