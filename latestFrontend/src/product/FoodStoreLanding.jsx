import React from "react";
import { useNavigate } from "react-router-dom";

export default function FoodStoreLanding() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center max-w-md">
        <h1 className="text-white text-5xl font-extrabold mb-4">Food Store</h1>
        <p className="text-yellow-300 text-xl mb-8">
          Taste the freshness. Feel the joy.
        </p>
        <button
          onClick={() => navigate("/product")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded shadow-lg transition duration-300"
        >
          Explore
        </button>
      </div>
    </div>
  );
}
