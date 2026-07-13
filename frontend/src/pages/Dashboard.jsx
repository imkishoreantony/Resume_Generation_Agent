import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentActivity from "../components/dashboard/RecentActivity";
import api from "../services/api";
import { getDashboard } from "../services/dashboardService";
import ActivityChart from "../components/dashboard/ActivityChart";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ResumeCard from "../components/ResumeCard";
import LatestResumes from "../components/dashboard/LatestResumes";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsCards from "../components/dashboard/StatsCards";

function Dashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const [dashboardData, resumeResponse] = await Promise.all([
        getDashboard(),
        api.get("resumes/")
      ]);

      setDashboard(dashboardData);
      setResumes(resumeResponse.data);

    } catch (error) {

      console.error("Dashboard Error:", error);

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = (id) => {

    setResumes((prev) =>
      prev.filter((resume) => resume.id !== id)
    );

    if (dashboard) {

      setDashboard((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          total_resumes: prev.stats.total_resumes - 1,
        },
      }));

    }

  };

  if (loading) {
    return <LoadingSpinner text="Loading Dashboard..." />;
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {dashboard && (
          <WelcomeBanner
            username={dashboard.username}
          />
        )}

       {dashboard && (
  <>
    <StatsCards
      stats={dashboard.stats}
    />

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">

      <div className="xl:col-span-2">
        <ActivityChart
          stats={dashboard.stats}
        />
      </div>

      <div>
        <RecentActivity
          activities={dashboard.recent_activity}
        />
      </div>

    </div>

    <div className="mt-8">
      <LatestResumes
        resumes={dashboard.latest_resumes}
      />
    </div>
  </>
)}

        {/* Quick Actions */}

        <div className="bg-white rounded-2xl shadow-lg p-6 my-8">

          <h2 className="text-2xl font-bold mb-5">
            ⚡ Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4"></div>

          <button
            onClick={() => navigate("/create")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow transition"
          >
            ➕ Create Resume
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition"
          >
            📤 Upload Resume
          </button>

        </div>

        {/* Resume Section */}

        <div className="mb-6">

          <h2 className="text-3xl font-bold text-gray-800">
            My Resumes
          </h2>

          <p className="text-gray-500 mt-2">
            Manage, review, improve and download your AI-powered resumes.
          </p>

        </div>

        {resumes.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-14 text-center">

            <div className="text-7xl mb-6">
              📄
            </div>

            <h2 className="text-3xl font-bold">
              No Resumes Yet
            </h2>

            <p className="text-gray-500 mt-4 mb-8">
              Create your first resume or upload an existing one.
            </p>

            <button
              onClick={() => navigate("/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
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
                onDelete={handleDelete}
              />

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Dashboard;