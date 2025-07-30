// AdminNav.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  UtensilsCrossed,
  Package,
  Users,
  BarChart3,
} from "lucide-react";

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    { name: "Dashboard", href: "dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Orders", href: "orders", icon: <UtensilsCrossed className="w-5 h-5" /> },
    { name: "Products", href: "products", icon: <Package className="w-5 h-5" /> },
    { name: "Users", href: "users", icon: <Users className="w-5 h-5" /> },
    { name: "AddProduct", href: "AddProduct", icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div
      className={`bg-green-700 text-white h-screen fixed top-0 left-0 p-4 transition-all duration-300 z-50 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        {isOpen && <span className="text-xl font-bold">FoodSystem</span>}
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-600"
          >
            {link.icon}
            {isOpen && <span className="font-medium">{link.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
