import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import Navbar from "../components/Navbar";

function CreateResume() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("resumes/", formData);

      toast.success("Resume Created Successfully ✨");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Create Resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-6">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-blue-600">
            Create Resume
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Fill in your details to build an AI-powered professional resume.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Personal Information */}

            <div>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                👤 Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="title"
                  placeholder="Resume Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />

                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />

              </div>

            </div>

            {/* Professional Summary */}

            <div>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📝 Professional Summary
              </h2>

              <textarea
                name="summary"
                rows={5}
                placeholder="Write a short professional summary..."
                value={formData.summary}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            {/* Skills */}

            <div>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                💻 Skills
              </h2>

              <textarea
                name="skills"
                rows={4}
                placeholder="Example: Python, React, Django, MySQL..."
                value={formData.skills}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            {/* Education */}

            <div>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🎓 Education
              </h2>

              <textarea
                name="education"
                rows={4}
                placeholder="Enter your education details..."
                value={formData.education}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            {/* Experience */}

            <div>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                💼 Experience
              </h2>

              <textarea
                name="experience"
                rows={5}
                placeholder="Describe your work experience..."
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg"
            >
              {loading ? "Saving Resume..." : "💾 Save Resume"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateResume;