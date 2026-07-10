import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <span className="inline-block bg-white/20 text-white px-5 py-2 rounded-full font-semibold">
          🚀 Start Your Career Journey Today
        </span>

        <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-8 leading-tight">

          Build Your Professional Resume

          <br />

          With the Power of AI

        </h2>

        <p className="text-blue-100 text-lg md:text-xl mt-8 leading-9 max-w-3xl mx-auto">

          Join students, fresh graduates, and professionals who use
          AI Resume Builder to create ATS-friendly resumes,
          generate cover letters, review resumes with AI,
          and land better job opportunities.

        </p>

        {/* Buttons */}

        <div className="flex flex-wrap justify-center gap-6 mt-12">

          <Link
            to="/register"
            className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-xl hover:scale-105 hover:bg-gray-100 transition-all duration-300"
          >
            🚀 Get Started Free
          </Link>

          <Link
            to="/login"
            className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 hover:scale-105 transition-all duration-300"
          >
            🔐 Login
          </Link>

        </div>

        {/* Bottom Features */}

        <div className="flex flex-wrap justify-center gap-8 mt-12 text-white">

          <div className="flex items-center gap-2">
            ✅ Free Registration
          </div>

          <div className="flex items-center gap-2">
            🤖 AI Powered
          </div>

          <div className="flex items-center gap-2">
            📄 PDF Export
          </div>

          <div className="flex items-center gap-2">
            🔒 Secure Platform
          </div>

        </div>

      </div>

    </section>
  );
}

export default CTASection;