import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateResume() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    full_name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
    template: "Classic",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("resumes/", formData);

      alert("Resume Created Successfully!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Failed to create resume.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl">

        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          Create Resume
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
    type="text"
    name="title"
    placeholder="Resume Title"
    value={formData.title}
    onChange={handleChange}
    className="w-full border rounded-lg px-4 py-3"
    required
  />
  <input
    type="text"
    name="full_name"
    placeholder="Full Name"
    value={formData.full_name}
    onChange={handleChange}
    className="w-full border rounded-lg px-4 py-3"
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    className="w-full border rounded-lg px-4 py-3"
  />
  <input
    type="text"
    name="phone"
    placeholder="Phone"
    value={formData.phone}
    onChange={handleChange}
    className="w-full border rounded-lg px-4 py-3"
  />
  <textarea
    name="summary"
    placeholder="Professional Summary"
    value={formData.summary}
    onChange={handleChange}
    rows={4}
    className="w-full border rounded-lg px-4 py-3"
  />
  <textarea
    name="skills"
    placeholder="Skills"
    value={formData.skills}
    onChange={handleChange}
    rows={4}
    className="w-full border rounded-lg px-4 py-3"
  />
  <textarea
    name="education"
    placeholder="Education"
    value={formData.education}
    onChange={handleChange}
    rows={4}
    className="w-full border rounded-lg px-4 py-3"
  />
  <textarea
    name="experience"
    placeholder="Experience"
    value={formData.experience}
    onChange={handleChange}
    rows={5}
    className="w-full border rounded-lg px-4 py-3"
  />
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
  >
    Save Resume
  </button>
          </form>

        </div>

      </div>
    );
  }

  export default CreateResume;