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
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition"
          >
            ➕ Create Resume
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
          >
            📤 Upload Resume
          </button>

        </div>

        {/* Resume Header */}

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

          <div className="flex flex-col items-center justify-center py-24">

            <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

            <p className="mt-6 text-xl text-gray-600 font-medium">
              Loading your resumes...
            </p>

          </div>

        ) : resumes.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-14 text-center">

            <div className="text-7xl mb-6">
              📄
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Resumes Yet
            </h2>

            <p className="text-gray-500 mt-4 mb-8">
              Create your first AI Resume or upload an existing resume.
            </p>

            <button
              onClick={() => navigate("/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
            >
              Create Resume
            </button>

          </div>

        ) : (

          <div
            className={
              resumes.length === 1
                ? "flex justify-center"
                : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            }
          >

            {resumes.map((resume) => (

              <div
                key={resume.id}
                className={
                  resumes.length === 1
                    ? "w-full max-w-2xl"
                    : ""
                }
              >

                <ResumeCard resume={resume} />

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;