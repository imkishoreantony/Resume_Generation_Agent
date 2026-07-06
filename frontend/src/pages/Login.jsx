import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("token/", {
        username,
        password,
      });

      login(response.data.access, response.data.refresh);

      toast.success("Welcome back! 🎉");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            🤖
          </div>

          <h1 className="text-4xl font-bold text-blue-600">
            AI Resume Builder
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Sign in to continue.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              required
              disabled={loading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            {loading ? "🔄 Logging in..." : "🚀 Login"}
          </button>

        </form>

        <div className="text-center mt-8">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            Create Account
          </Link>

        </div>

        <div className="mt-8 border-t pt-5 text-center text-sm text-gray-400">
          Powered by Gemini AI
        </div>

      </div>

    </div>
  );
}

export default Login;