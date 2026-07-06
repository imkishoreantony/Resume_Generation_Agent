import { useNavigate } from "react-router-dom";
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

    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("Failed to download PDF.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">

      <h2 className="text-2xl font-bold text-blue-600">
        {resume.title}
      </h2>

      <p className="text-gray-600 mt-3">
        {resume.summary}
      </p>

      <div className="mt-5">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {resume.template}
        </span>
      </div>

      <div className="flex gap-3 mt-6">

        {/* Review Button */}
        <button
          onClick={() => navigate(`/review/${resume.id}`)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Review
        </button>

        {/* Generate Button */}
        <button
          onClick={() => navigate(`/generate/${resume.id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Generate
        </button>

        {/* PDF Download Button */}
        <button
          onClick={downloadPDF}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          PDF
        </button>

      </div>

    </div>
  );
}

export default ResumeCard;