import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}

          <div>

            <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-5 py-2 rounded-full">
              🚀 Powered by Gemini AI
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mt-8">

              Build Your

              <span className="text-blue-600">
                {" "}Dream Resume
              </span>

              <br />

              With Artificial Intelligence

            </h1>

            <p className="text-gray-600 text-lg md:text-xl mt-8 leading-9">

              Create ATS-friendly resumes, generate professional
              cover letters, review resumes using AI,
              match jobs instantly, and download
              beautiful PDF resumes — all in one platform.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-blue-500/40"
              >
                🚀 Get Started
              </Link>

              <Link
                to="/login"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 px-8 py-4 rounded-xl"
              >
                🔐 Login
              </Link>

            </div>

            <div className="flex flex-wrap gap-8 mt-12 text-gray-700">

              <div className="flex items-center gap-2">
                ✅ ATS Friendly
              </div>

              <div className="flex items-center gap-2">
                🤖 AI Powered
              </div>

              <div className="flex items-center gap-2">
                📄 PDF Export
              </div>

            </div>

          </div>

          {/* Right Content */}

          <div className="relative flex justify-center">

            <img
              src="/hero.png"
              alt="AI Resume Builder"
              className="floating w-full max-w-3xl rounded-3xl shadow-2xl"
            />

            {/* Floating Cards */}

            <div className="absolute top-6 left-0 bg-white rounded-2xl shadow-xl px-5 py-3 hidden lg:block">
              🤖 AI Powered
            </div>

            <div className="absolute top-24 right-0 bg-white rounded-2xl shadow-xl px-5 py-3 hidden lg:block">
              ⭐ ATS 95%
            </div>

            <div className="absolute bottom-24 left-0 bg-white rounded-2xl shadow-xl px-5 py-3 hidden lg:block">
              📄 PDF Ready
            </div>

            <div className="absolute bottom-8 right-0 bg-white rounded-2xl shadow-xl px-5 py-3 hidden lg:block">
              🎯 Job Match
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;