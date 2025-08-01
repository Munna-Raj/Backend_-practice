import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Menu,
  X,
  LayoutDashboard,
  UtensilsCrossed,
  Package,
  Users,
  BarChart3,
} from "lucide-react";

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ProductName: "",
    ProductCode: "",
    Price: "",
    Stock: "",
    Thumbnail: "",
  });

  // Sidebar links
  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Orders", href: "/admin/orders", icon: <UtensilsCrossed className="w-5 h-5" /> },
    { name: "Products", href: "/admin/products", icon: <Package className="w-5 h-5" /> },
    { name: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
    { name: "Reports", href: "/admin/reports", icon: <BarChart3 className="w-5 h-5" /> },
  ];

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/product/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      ProductName: product.ProductName || "",
      ProductCode: product.ProductCode || "",
      Price: product.Price || "",
      Stock: product.Stock || "",
      Thumbnail: product.Thumbnail || "",
    });
  };

  // Handle update
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/product/${id}`, formData);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-green-700 text-white h-screen fixed top-0 left-0 p-4 transition-all duration-300 z-50 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          {isOpen && <span className="text-xl font-bold">FoodSystem</span>}
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle sidebar">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <nav className="space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-600"
            >
              {link.icon}
              {isOpen && <span className="font-medium">{link.name}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-gray-100 min-h-screen transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        {/* Product Table */}
        <table className="w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Product Code</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Stock</th>
              <th className="border p-2 text-left">Thumbnail</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                {/* Product Name */}
                <td className="border p-2" style={{ color: "black" }}>
                  {editingId === product._id ? (
                    <input
                      type="text"
                      value={formData.ProductName}
                      style={{ color: "black" }}
                      onChange={(e) =>
                        setFormData({ ...formData, ProductName: e.target.value })
                      }
                    />
                  ) : (
                    product.ProductName
                  )}
                </td>

                {/* Product Code */}
                <td className="border p-2" style={{ color: "black" }}>
                  {editingId === product._id ? (
                    <input
                      type="text"
                      value={formData.ProductCode}
                      style={{ color: "black" }}
                      onChange={(e) =>
                        setFormData({ ...formData, ProductCode: e.target.value })
                      }
                    />
                  ) : (
                    product.ProductCode
                  )}
                </td>

                {/* Price */}
                <td className="border p-2" style={{ color: "black" }}>
                  {editingId === product._id ? (
                    <input
                      type="number"
                      value={formData.Price}
                      style={{ color: "black" }}
                      onChange={(e) =>
                        setFormData({ ...formData, Price: e.target.value })
                      }
                    />
                  ) : (
                    product.Price
                  )}
                </td>

                {/* Stock */}
                <td className="border p-2" style={{ color: "black" }}>
                  {editingId === product._id ? (
                    <input
                      type="number"
                      value={formData.Stock}
                      style={{ color: "black" }}
                      onChange={(e) =>
                        setFormData({ ...formData, Stock: e.target.value })
                      }
                    />
                  ) : (
                    product.Stock
                  )}
                </td>

                {/* Thumbnail */}
                <td className="border p-2" style={{ color: "black" }}>
                  {editingId === product._id ? (
                    <input
                      type="text"
                      value={formData.Thumbnail}
                      style={{ color: "black" }}
                      onChange={(e) =>
                        setFormData({ ...formData, Thumbnail: e.target.value })
                      }
                    />
                  ) : product.Thumbnail ? (
                    <img
                      src={product.Thumbnail}
                      alt={product.ProductName}
                      className="w-12 h-12 object-cover mx-auto rounded"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>

                {/* Actions */}
                <td className="border p-2 text-center">
                  {editingId === product._id ? (
                    <button
                      onClick={() => handleUpdate(product._id)}
                      className="bg-green-500 text-black px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-black px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-black px-3 py-1 ml-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
