import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import ResumeCard from "../components/ResumeCard";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get("resumes/");
      setResumes(response.data);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <DashboardHeader />

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-10">

          <StatCard
            icon="📄"
            title="Total Resumes"
            value={resumes.length}
            subtitle="Created"
            color="text-blue-600"
          />

          <StatCard
            icon="🤖"
            title="AI Reviews"
            value={resumes.length}
            subtitle="Available"
            color="text-green-600"
          />

          <StatCard
            icon="📥"
            title="PDF Export"
            value="Ready"
            subtitle="Download Anytime"
            color="text-purple-600"
          />

        </div>

        {/* Quick Actions */}

        <div className="flex flex-wrap gap-4 mb-10">

          <button
            onClick={() => navigate("/create")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition shadow"
          >
            ➕ Create Resume
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition shadow"
          >
            📤 Upload Resume
          </button>

        </div>

        {/* Resume Section */}

        <div className="mb-6">

          <h2 className="text-3xl font-bold text-gray-800">
            My Resumes
          </h2>

          <p className="text-gray-500 mt-1">
            Manage, review, improve and download your AI-powered resumes.
          </p>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="text-center py-20">

            <h2 className="text-2xl font-semibold text-gray-600">
              Loading resumes...
            </h2>

          </div>

        ) : resumes.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-4">
              📄
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Resumes Yet
            </h2>

            <p className="text-gray-500 mt-3 mb-6">
              Create your first AI Resume or upload an existing one.
            </p>

            <button
              onClick={() => navigate("/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Create Resume
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;