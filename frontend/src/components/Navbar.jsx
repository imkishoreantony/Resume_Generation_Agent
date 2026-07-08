import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("profile/");
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-600"
        >
          🤖 AI Resume Builder
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-6">

          <Link
            to="/dashboard"
            className="hover:text-blue-600 font-medium transition"
          >
            Dashboard
          </Link>

          <Link
            to="/create"
            className="hover:text-blue-600 font-medium transition"
          >
            Create
          </Link>

          <Link
            to="/upload"
            className="hover:text-blue-600 font-medium transition"
          >
            Upload
          </Link>

          {/* Profile */}

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl transition"
          >

            {profile?.profile_picture ? (

              <img
                src={profile.profile_picture}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />

            ) : (

              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">

                {profile?.username
                  ? profile.username.charAt(0).toUpperCase()
                  : "U"}

              </div>

            )}

            <div className="hidden md:block text-left">

              <p className="font-semibold text-gray-800">
                {profile?.username}
              </p>

              <p className="text-xs text-gray-500">
                View Profile
              </p>

            </div>

          </button>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;