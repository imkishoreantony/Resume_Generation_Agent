function StatsSection() {
  const stats = [
    {
      number: "8+",
      title: "AI Features",
      description: "Resume Review, Cover Letter, Job Match & more",
      color: "text-blue-600",
    },
    {
      number: "100%",
      title: "ATS Friendly",
      description: "Professional resume templates",
      color: "text-green-600",
    },
    {
      number: "PDF",
      title: "Instant Export",
      description: "Download resumes anytime",
      color: "text-purple-600",
    },
    {
      number: "24/7",
      title: "AI Assistant",
      description: "Powered by Google Gemini AI",
      color: "text-orange-600",
    },
  ];

  return (
    <section
      id="stats"
      className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center text-white">

          <span className="uppercase tracking-widest font-semibold">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Smart Resume Building Made Easy
          </h2>

          <p className="mt-5 text-lg text-blue-100 max-w-3xl mx-auto">
            Our platform combines Artificial Intelligence with modern resume
            building tools to help students and professionals create
            outstanding resumes in minutes.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {stats.map((stat, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 text-center shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >

              <h3 className={`text-5xl font-extrabold ${stat.color}`}>
                {stat.number}
              </h3>

              <h4 className="text-2xl font-bold text-gray-800 mt-5">
                {stat.title}
              </h4>

              <p className="text-gray-500 mt-4">
                {stat.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default StatsSection;