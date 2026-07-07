import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function ResumeCard({ resume }) {
  const navigate = useNavigate();

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

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("PDF Downloaded Successfully 📄");

    } catch (error) {
      console.error(error);
      toast.error("Failed to download PDF");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6">

      {/* Resume Title */}
      <h2 className="text-2xl font-bold text-blue-600 mb-2">
        {resume.title}
      </h2>

      {/* Summary */}
      <p className="text-gray-600 leading-relaxed min-h-[60px]">
        {resume.summary || "No summary available."}
      </p>

      {/* Template */}
      <div className="mt-5">
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
          🏷 {resume.template}
        </span>
      </div>

      <hr className="my-6" />

      <h3 className="text-gray-700 font-semibold mb-4">
        AI Tools
      </h3>

      <div className="grid grid-cols-2 gap-3">

        <button
          onClick={() => navigate(`/review/${resume.id}`)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 transition"
        >
          👁 Review
        </button>

        <button
          onClick={() => navigate(`/generate/${resume.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition"
        >
          ✨ Generate
        </button>

        <button
          onClick={() => navigate(`/assist/${resume.id}`)}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 transition"
        >
          🤖 AI Assist
        </button>

        <button
          onClick={() => navigate(`/cover-letter/${resume.id}`)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 transition"
        >
          📝 Cover Letter
        </button>

        <button
          onClick={() => navigate(`/job-match/${resume.id}`)}
          className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl py-3 transition"
        >
          🎯 Job Match
        </button>

        <button
          onClick={downloadPDF}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 transition"
        >
          📄 Resume PDF
        </button>

      </div>

    </div>
  );
}

export default ResumeCard;