import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await api.post("register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration Successful!");

      navigate("/login");

    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        Object.values(error.response.data).forEach((message) => {
          toast.error(Array.isArray(message) ? message[0] : message);
        });
      } else {
        toast.error("Registration failed.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          AI Resume Builder
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Create Your Account
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;