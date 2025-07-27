import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/signup");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.clear();
      navigate("/signup");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signup");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">My Account</h1>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold">
            {user.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>

          <h2 className="mt-4 text-xl font-semibold">{user.username || "Unknown User"}</h2>

          <p className="text-sm text-gray-400">Role: {user.role || "N/A"}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
