import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import DeleteResumeModal from "./DeleteResumeModal";

function ResumeCard({ resume, onDelete }) {

  const navigate = useNavigate();

  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const downloadPDF = async () => {
    try {
      const response = await api.get(
        `resumes/${resume.id}/download/`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = `AI_Resume_${resume.id}.pdf`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Resume PDF Downloaded 📄");

    } catch (error) {
      console.error(error);
      toast.error("Failed to download PDF");
    }
  };

  const deleteResume = async () => {
    try {

      setDeleting(true);

      await api.delete(`resumes/${resume.id}/`);

      toast.success("Resume deleted successfully! 🗑");

      if (onDelete) {
        onDelete(resume.id);
      }

      setShowDeleteModal(false);

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete resume.");

    } finally {

      setDeleting(false);

    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-7">

        {/* Header */}

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold text-blue-600">
              {resume.title}
            </h2>

            <p className="text-gray-600 mt-2 leading-relaxed">
              {resume.summary || "No summary available."}
            </p>

          </div>

        </div>

        {/* Resume Info */}

        <div className="flex flex-wrap gap-3 mt-6">

          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
            🏷 {resume.template}
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
            ✅ Ready
          </span>

        </div>

        <hr className="my-6" />

        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          AI Tools
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={() => navigate(`/review/${resume.id}`)}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-medium transition"
          >
            👁 Review
          </button>

          <button
            onClick={() => navigate(`/generate/${resume.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-medium transition"
          >
            ✨ Generate
          </button>

          <button
            onClick={() => navigate(`/assist/${resume.id}`)}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-medium transition"
          >
            🤖 AI Assist
          </button>

          <button
            onClick={() => navigate(`/cover-letter/${resume.id}`)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-medium transition"
          >
            📝 Cover Letter
          </button>

          <button
            onClick={() => navigate(`/job-match/${resume.id}`)}
            className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl py-3 font-medium transition"
          >
            🎯 Job Match
          </button>

          <button
            onClick={downloadPDF}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 font-medium transition"
          >
            📄 Resume PDF
          </button>

        </div>

        {/* Delete Button */}

        <button
          onClick={() => setShowDeleteModal(true)}
          disabled={deleting}
          className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 transition disabled:opacity-50"
        >
          🗑 Delete Resume
        </button>

        {/* Footer */}

        <div className="mt-6 pt-4 border-t flex justify-between items-center">

          <span className="text-sm text-gray-500">
            Resume ID: #{resume.id}
          </span>

          <span className="text-sm text-green-600 font-semibold">
            AI Enabled
          </span>

        </div>

      </div>

      <DeleteResumeModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteResume}
        loading={deleting}
      />
    </>
  );
}

export default ResumeCard;