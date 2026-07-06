import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await api.post("register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account Created Successfully 🎉");

      navigate("/login");

    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        Object.values(error.response.data).forEach((message) => {
          toast.error(Array.isArray(message) ? message[0] : message);
        });
      } else {
        toast.error("Registration Failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            🚀
          </div>

          <h1 className="text-4xl font-bold text-blue-600">
            AI Resume Builder
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account and start building professional resumes.
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              name="username"
              required
              disabled={loading}
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              disabled={loading}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              disabled={loading}
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              required
              disabled={loading}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            {loading ? "🔄 Creating Account..." : "✨ Create Account"}
          </button>

        </form>

        <div className="text-center mt-8">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            Sign In
          </Link>

        </div>

        <div className="mt-8 border-t pt-5 text-center text-sm text-gray-400">
          Powered by Gemini AI
        </div>

      </div>

    </div>
  );
}

export default Register;