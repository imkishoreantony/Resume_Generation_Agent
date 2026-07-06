import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function AssistResume() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await api.post(`resumes/${id}/assist/`);
      setResume(response.data.improved_resume);
    } catch (error) {
      console.error(error);
      alert("Failed to load AI Assistant.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        🤖 AI is improving your resume...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          AI Resume Assistant
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Professional Summary
          </h2>

          <p className="text-gray-700">
            {resume.professional_summary}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Technical Skills
          </h2>

          <div className="flex flex-wrap gap-2">

            {resume.technical_skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}

          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Professional Experience
          </h2>

          {resume.professional_experience.map((job, index) => (

            <div key={index} className="mb-6">

              <h3 className="text-xl font-bold">
                {job.title}
              </h3>

              <p className="text-gray-600">
                {job.company}
              </p>

              <p className="text-sm text-gray-500">
                {job.dates}
              </p>

              <ul className="list-disc ml-6 mt-3">

                {job.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}

              </ul>

            </div>

          ))}

        </section>

      </div>

    </div>
  );
}

export default AssistResume;