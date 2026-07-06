import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("token/", {
        username,
        password,
      });

      // Save tokens using AuthContext
      login(response.data.access, response.data.refresh);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid username or password.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          AI Resume Builder
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome Back 👋
        </p>

        <form className="mt-8" onSubmit={handleLogin}>
          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;