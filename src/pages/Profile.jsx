import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  // Get stored data
  const user = JSON.parse(localStorage.getItem("userData"));
  const prediction = JSON.parse(localStorage.getItem("predictionData"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-[#0b0f2f] text-white p-6">
      <div className="max-w-4xl mx-auto bg-[#111636] rounded-2xl shadow-xl p-8">

        {/* Profile Header */}
        <div className="flex items-center gap-6 border-b border-gray-700 pb-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {user?.name || "User"}
            </h2>
            <p className="text-gray-400 text-sm">
              {user?.email || "email@example.com"}
            </p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Personal Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <p><span className="text-gray-400">Name:</span> {user?.name}</p>
            <p><span className="text-gray-400">Email:</span> {user?.email}</p>
          </div>
        </div>
        

        {/* Logout */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
