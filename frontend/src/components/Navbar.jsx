import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-600"
        >
          🤖 AI Resume Builder
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/dashboard"
            className="hover:text-blue-600 font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/create"
            className="hover:text-blue-600 font-medium"
          >
            Create
          </Link>

          <Link
            to="/upload"
            className="hover:text-blue-600 font-medium"
          >
            Upload
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-600 font-medium"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;