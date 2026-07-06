import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-5 mb-8 rounded-xl">

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          AI Resume Builder
        </h1>

        <div className="flex gap-6">

          <Link
            to="/dashboard"
            className="hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/upload"
            className="hover:text-blue-600"
          >
            Upload
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-600"
          >
            Profile
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;