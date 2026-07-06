import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function GenerateResume() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateResume();
  }, []);

  const generateResume = async () => {
    try {
      const response = await api.post(`resumes/${id}/generate/`);

      setResume(response.data.generated_resume);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Generating Resume...
        </h1>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl text-red-600">
          Failed to generate resume.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-10">

        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          AI Generated Resume
        </h1>

        {/* Professional Summary */}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">
            Professional Summary
          </h2>

          <p>{resume.professional_summary}</p>
        </section>

        {/* Technical Skills */}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">
            Technical Skills
          </h2>

          <ul className="list-disc ml-6">
            {resume.technical_skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        {/* Professional Experience */}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">
            Professional Experience
          </h2>

          {resume.professional_experience?.map((job, index) => (
            <div key={index} className="mb-6">

              <h3 className="text-xl font-semibold">
                {job.title}
              </h3>

              <p className="text-gray-600">
                {job.company} | {job.dates}
              </p>

              <ul className="list-disc ml-6 mt-2">
                {job.description?.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

            </div>
          ))}
        </section>

        {/* Education */}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">
            Education
          </h2>

          <p className="font-semibold">
            {resume.education?.degree}
          </p>

          <p>
            {resume.education?.institution}
          </p>
        </section>

        {/* Achievements */}

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Achievements
          </h2>

          <ul className="list-disc ml-6">
            {resume.achievements?.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </section>

      </div>

    </div>
  );
}

export default GenerateResume;