import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function CoverLetter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchCoverLetter();
  }, []);

  const fetchCoverLetter = async () => {
    try {
      const response = await api.post(
        `resumes/${id}/cover-letter/`
      );

      setCoverLetter(
        response.data.cover_letter.cover_letter
      );

    } catch (error) {
      console.error(error);
      toast.error("Failed to generate Cover Letter");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    toast.success("Copied to Clipboard 📋");
  };

  const saveChanges = async () => {

    setSaving(true);

    try {

      await api.put(
        `resumes/${id}/cover-letter/`,
        {
          cover_letter: coverLetter,
        }
      );

      toast.success("Cover Letter Saved 💾");

      setEditing(false);

    } catch (error) {

      console.error(error);

      toast.error("Failed to Save");

    } finally {

      setSaving(false);

    }

  };

  const downloadPDF = async () => {

    setDownloading(true);

    try {

      const response = await api.get(
        `resumes/${id}/cover-letter/download/`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = url;
      link.download = `CoverLetter_${id}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Cover Letter Downloaded 📄");

    } catch (error) {

      console.error(error);

      toast.error("Failed to Download");

    } finally {

      setDownloading(false);

    }

  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">

        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        <h2 className="mt-6 text-3xl font-bold text-blue-600">
          Generating Cover Letter...
        </h2>

        <p className="text-gray-500 mt-3">
          Gemini AI is writing your professional cover letter.
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-2xl p-10">

          <h1 className="text-4xl font-bold text-blue-600">
            📝 AI Cover Letter
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Professionally generated using Gemini AI
          </p>

          <hr className="mb-8" />

          {editing ? (

            <textarea
              value={coverLetter}
              onChange={(e) =>
                setCoverLetter(e.target.value)
              }
              rows={20}
              className="w-full border rounded-xl p-5 text-gray-700 leading-8 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          ) : (

            <div className="bg-gray-50 border rounded-xl p-6 whitespace-pre-wrap leading-8 text-gray-700">
              {coverLetter}
            </div>

          )}

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">

            <button
              onClick={copyToClipboard}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 transition"
            >
              📋 Copy
            </button>

            <button
              onClick={() => setEditing(!editing)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl py-3 transition"
            >
              {editing ? "❌ Cancel" : "✏ Edit"}
            </button>

            <button
              onClick={saveChanges}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl py-3 transition"
            >
              {saving ? "Saving..." : "💾 Save"}
            </button>

            <button
              onClick={downloadPDF}
              disabled={downloading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white rounded-xl py-3 transition"
            >
              {downloading ? "Downloading..." : "📄 PDF"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-700 hover:bg-gray-800 text-white rounded-xl py-3 transition"
            >
              ← Back
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CoverLetter;