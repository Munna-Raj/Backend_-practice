import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      // If no auth info, redirect to signup page
      navigate("/signup");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      // If stored user data is corrupted, clear storage and redirect
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
    // Loading state while user info is fetched
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );
  }

  const initial = user.username ? user.username.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">My Account</h1>

        <div className="flex flex-col items-center space-y-3">
          <div
            aria-label={`Profile initial ${initial}`}
            className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-700 select-none"
          >
            {initial}
          </div>

          <h2 className="text-xl font-semibold">{user.username || "Unknown User"}</h2>
          <p className="text-sm text-gray-500">Role: {user.role || "N/A"}</p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            type="button"
            disabled
            className="w-full py-2 bg-blue-300 text-white rounded-xl cursor-not-allowed"
            aria-disabled="true"
            title="Edit profile feature coming soon"
          >
            Edit Profile
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
