import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <span className="text-4xl">🤖</span>

          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              AI Resume Builder
            </h1>

            <p className="text-xs text-gray-500">
              Powered by Gemini AI
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">

          <a
            href="#features"
            className="hover:text-blue-600 transition font-medium"
          >
            Features
          </a>

          <a
            href="#stats"
            className="hover:text-blue-600 transition font-medium"
          >
            Why Us
          </a>

          <a
            href="#how-it-works"
            className="hover:text-blue-600 transition font-medium"
          >
            How It Works
          </a>

          <a
            href="#contact"
            className="hover:text-blue-600 transition font-medium"
          >
            Contact
          </a>

          <Link
            to="/login"
            className="font-semibold hover:text-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-blue-600"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">

          <div className="flex flex-col p-6 space-y-5">

            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#stats"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Why Us
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              How It Works
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Contact
            </a>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-blue-600 font-semibold"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-600 text-white rounded-xl py-3 text-center hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
}

export default HomeNavbar;