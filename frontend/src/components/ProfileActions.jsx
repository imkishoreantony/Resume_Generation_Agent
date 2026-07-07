import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProfileActions() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <div className="grid md:grid-cols-4 gap-4 mt-8">

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-3 transition"
      >
        ✏ Edit Profile
      </button>

      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl py-3 transition"
      >
        🔒 Change Password
      </button>

      <button
        className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl py-3 transition"
      >
        ⚙ Settings
      </button>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white rounded-2xl py-3 transition"
      >
        🚪 Logout
      </button>

    </div>

  );

}

export default ProfileActions;