import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import Navbar from "../components/Navbar";

function UploadResume() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a PDF resume.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("resume_file", file);

    setLoading(true);

    try {
      await api.post("resumes/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Resume Uploaded Successfully 📄");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-blue-600">
            Upload Resume
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Upload your existing resume and let AI review, improve and generate
            an ATS-friendly version.
          </p>

          <form onSubmit={handleUpload} className="space-y-8">

            {/* Resume Title */}

            <div>

              <label className="block text-gray-700 font-semibold mb-2">
                📄 Resume Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Example: Software Engineer Resume"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            {/* File Upload */}

            <div>

              <label className="block text-gray-700 font-semibold mb-2">
                📎 Resume File (PDF)
              </label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border rounded-xl px-4 py-3"
                required
              />

              {file && (
                <p className="text-sm text-green-600 mt-3">
                  ✅ Selected: <strong>{file.name}</strong>
                </p>
              )}

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg"
            >
              {loading ? "📤 Uploading Resume..." : "📤 Upload Resume"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default UploadResume;