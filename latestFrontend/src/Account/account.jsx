import React from 'react';
import { Link } from 'react-router-dom';

export default function Account() {
  const user = {
    name: "Munna",
    email: "munna@1.com",
    joined: "Jan 2024",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">My Account</h1>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold">
            {user.name.charAt(0)}
          </div>

          <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-400">Joined: {user.joined}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Edit Profile
          </button>

          <Link
            to="/signup"
            className="block text-center w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
            onClick={() => {
              // optional: clear stored token or session
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
