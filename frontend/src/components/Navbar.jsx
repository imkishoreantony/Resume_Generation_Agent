import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (

        <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow">

            <h1 className="text-2xl font-bold">
                AI Resume Builder
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>

        </nav>

    );

}

export default Navbar;