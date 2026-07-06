import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import ResumeCard from "../components/ResumeCard";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";

function Dashboard() {

  const [resumes, setResumes] = useState([]);

  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get("resumes/");
      setResumes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-8">

        <Navbar />

        <DashboardHeader />

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <StatCard
            title="Total Resumes"
            value={resumes.length}
            color="text-blue-600"
          />

          <StatCard
            title="AI Review"
            value="Ready"
            color="text-green-600"
          />

          <StatCard
            title="PDF Download"
            value="Ready"
            color="text-purple-600"
          />

        </div>

        {/* Quick Actions */}

        <div className="flex gap-4 mb-10">

          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            📤 Upload Resume
          </button>

          <button
            onClick={() => navigate("/create")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            ➕ Create Resume
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>

        </div>

        {/* Resume Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;