import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ResumeCard from "../components/ResumeCard";

function Dashboard() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get("resumes/");
      setResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar />

      <div className="p-10">

        {/* Welcome Section */}
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome Back 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Manage all your resumes with AI.
        </p>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <StatCard
            title="Total Resumes"
            value={resumes.length}
          />

          <StatCard
            title="AI Reviews"
            value="0"
          />

          <StatCard
            title="Generated PDFs"
            value="0"
          />

        </div>

        {/* Resume Section */}
        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6">
            My Resumes
          </h2>

          {resumes.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <p className="text-gray-500">
                No resumes found.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

    </div>
  );
}

export default Dashboard;