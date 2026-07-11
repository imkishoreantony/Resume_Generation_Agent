function FeaturesSection() {
  const features = [
    {
      icon: "📄",
      title: "Resume Builder",
      description:
        "Create beautiful and ATS-friendly resumes with an intuitive editor.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🤖",
      title: "AI Resume Review",
      description:
        "Receive detailed AI-powered suggestions to improve your resume.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "✨",
      title: "AI Resume Generator",
      description:
        "Generate professional resume content instantly using Gemini AI.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "📝",
      title: "Cover Letter",
      description:
        "Generate personalized cover letters tailored to your resume.",
      color: "from-indigo-500 to-violet-500",
    },
    {
      icon: "🎯",
      title: "Job Match",
      description:
        "Compare your resume against job descriptions and improve your chances.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: "📥",
      title: "PDF Export",
      description:
        "Download polished, professional resumes in PDF format anytime.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: "👤",
      title: "Profile Management",
      description:
        "Manage your account, profile picture, password, and personal details.",
      color: "from-sky-500 to-blue-600",
    },
    {
      icon: "🔒",
      title: "Secure Authentication",
      description:
        "JWT authentication keeps your account and resume data protected.",
      color: "from-gray-700 to-gray-900",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Features
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
            Everything You Need
          </h2>

          <p className="text-gray-500 text-lg mt-5 max-w-3xl mx-auto">
            Build, improve and optimize your resume using powerful AI tools
            designed to help you land your dream job faster.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-8 border border-gray-100"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl text-white shadow-lg`}
              >
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-500 mt-4 leading-7">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;