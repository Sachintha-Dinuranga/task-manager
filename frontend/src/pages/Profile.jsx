import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Profile({ user }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Clear any local storage if you're using it
        localStorage.clear();
        // Navigate to login page
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <button
          onClick={handleBack}
          className="absolute left-4 top-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div className="relative">
          <img
            src={user.photo}
            alt={user.displayName}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
          />
          <div className="absolute bottom-4 right-1/2 transform translate-x-16 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.displayName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
