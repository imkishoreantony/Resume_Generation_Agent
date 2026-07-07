import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function JobMatch() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const analyzeResume = async () => {

        if (!jobDescription.trim()) {

            toast.error("Please paste a Job Description.");

            return;

        }

        setLoading(true);

        try {

            const response = await api.post(

                `resumes/${id}/job-match/`,

                {
                    job_description: jobDescription
                }

            );

            setResult(response.data);

            toast.success("Analysis Complete 🎉");

        }

        catch (error) {

            console.error(error);

            toast.error("Analysis Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10">

                <h1 className="text-4xl font-bold text-blue-600">

                    🎯 AI Job Match

                </h1>

                <p className="text-gray-500 mt-2 mb-8">

                    Compare your Resume with any Job Description

                </p>

                <textarea

                    rows={10}

                    value={jobDescription}

                    onChange={(e)=>setJobDescription(e.target.value)}

                    placeholder="Paste the Job Description here..."

                    className="w-full border rounded-xl p-5 focus:ring-2 focus:ring-blue-500"

                />

                <button

                    onClick={analyzeResume}

                    disabled={loading}

                    className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-3 rounded-xl"

                >

                    {

                        loading

                        ?

                        "Analyzing..."

                        :

                        "Analyze Resume"

                    }

                </button>

                {

                    result &&

                    <>

                        <hr className="my-10"/>

                        <h2 className="text-3xl font-bold text-center">

                            Overall Match

                        </h2>

                        <div className="mt-6">

                            <div className="w-full bg-gray-200 rounded-full h-8">

                                <div

                                    className="bg-green-600 h-8 rounded-full text-white text-center"

                                    style={{

                                        width:`${result.match_score}%`

                                    }}

                                >

                                    {result.match_score}%

                                </div>

                            </div>

                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mt-10">

                            <div>

                                <h3 className="text-2xl font-bold text-green-600 mb-4">

                                    ✅ Strengths

                                </h3>

                                {

                                    result.strengths.map(

                                        (item,index)=>

                                        <div

                                            key={index}

                                            className="bg-green-100 rounded-lg p-3 mb-2"

                                        >

                                            {item}

                                        </div>

                                    )

                                }

                            </div>

                            <div>

                                <h3 className="text-2xl font-bold text-red-600 mb-4">

                                    ❌ Missing Skills

                                </h3>

                                {

                                    result.missing_skills.map(

                                        (item,index)=>

                                        <div

                                            key={index}

                                            className="bg-red-100 rounded-lg p-3 mb-2"

                                        >

                                            {item}

                                        </div>

                                    )

                                }

                            </div>

                            <div>

                                <h3 className="text-2xl font-bold text-blue-600 mb-4">

                                    💡 Suggestions

                                </h3>

                                {

                                    result.suggestions.map(

                                        (item,index)=>

                                        <div

                                            key={index}

                                            className="bg-blue-100 rounded-lg p-3 mb-2"

                                        >

                                            {item}

                                        </div>

                                    )

                                }

                            </div>

                        </div>

                        <button

                            onClick={()=>navigate(-1)}

                            className="mt-10 bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-xl"

                        >

                            ← Back

                        </button>

                    </>

                }

            </div>

        </div>

    );

}

export default JobMatch;