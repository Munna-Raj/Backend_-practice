import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";

import AdminNav from "./component/AdminNav.jsx";
import ProductTable from "./component/ProductTable.jsx";

import Users from "./component/Users.jsx";
import AddProduct from "./component/AddProduct.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div>
       
        <AdminNav />

        <Routes>
          <Route path="/products" element={<ProductTable />} />
          <Route path="/users" element={<Users/>} />
          <Route path="/AddProduct" element={<AddProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
