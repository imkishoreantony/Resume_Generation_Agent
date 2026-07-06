import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

function ReviewResume() {

  const { id } = useParams();

  const [review, setReview] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchReview();

  }, []);

  const fetchReview = async () => {

    try {

      const response = await api.post(
        `resumes/${id}/improve/`
      );

      setReview(response.data.ai_suggestions);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <h1 className="text-center mt-20 text-2xl">
        Reviewing Resume...
      </h1>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-blue-600">

        AI Resume Review

      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

        <h2 className="text-2xl font-bold">

          ATS Score

        </h2>

        <p className="text-5xl text-green-600 mt-3">

          {review.ats_score}/100

        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">

            Strengths

          </h2>

          <ul>

            {review.strengths.map((item, index) => (

              <li key={index} className="mb-2">

                ✅ {item}

              </li>

            ))}

          </ul>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">

            Missing Skills

          </h2>

          <ul>

            {review.missing_skills.map((item, index) => (

              <li key={index} className="mb-2">

                ❌ {item}

              </li>

            ))}

          </ul>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">

        <h2 className="text-xl font-bold mb-4">

          Professional Summary

        </h2>

        <p>

          {review.professional_summary}

        </p>

      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">

        <h2 className="text-xl font-bold mb-4">

          Suggestions

        </h2>

        <ul>

          {review.suggestions.map((item, index) => (

            <li key={index} className="mb-2">

              💡 {item}

            </li>

          ))}

        </ul>

      </div>

    </div>

  );

}

export default ReviewResume;