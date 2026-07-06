import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function UploadResume() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("resume_file", file);

    try {
      await api.post("resumes/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Resume uploaded successfully!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Upload Resume
        </h1>

        <form onSubmit={handleUpload}>

          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Resume Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resume title"
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Resume PDF
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Resume
          </button>

        </form>

      </div>

    </div>
  );
}

export default UploadResume;