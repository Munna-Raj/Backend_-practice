import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import "./App.css";

import AdminNav from "./component/AdminNav.jsx";
import ProductTable from "./component/ProductTable.jsx";
import Users from "./component/Users.jsx";
import AddProduct from "./component/AddProduct.jsx";
import AdminLogin from "./component/AdminLogin.jsx";
import AdminOrders from "./component/AdminOrders.jsx";

// Layout component that conditionally shows AdminNav
function Layout({ children }) {
  const location = useLocation();

  // Define routes where the sidebar should be hidden
  const hideSidebarRoutes = ["/"]; // Login page

  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!shouldHideSidebar && <AdminNav />}
      <div className="flex-1">{children}</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/users" element={<Users />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/orders" element={<AdminOrders />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
