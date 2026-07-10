function TechStackSection() {
  const technologies = [
    {
      icon: "⚛️",
      name: "React 19",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: "🐍",
      name: "Python",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      icon: "🎯",
      name: "Django REST",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: "🤖",
      name: "Gemini AI",
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: "🎨",
      name: "Tailwind CSS",
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      icon: "🔐",
      name: "JWT",
      color: "bg-red-100 text-red-700",
    },
    {
      icon: "🗄️",
      name: "SQLite",
      color: "bg-gray-100 text-gray-700",
    },
    {
      icon: "📡",
      name: "REST APIs",
      color: "bg-indigo-100 text-indigo-700",
    },
  ];

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Built With
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-800">
            Modern Technologies
          </h2>

          <p className="text-gray-500 text-lg mt-5 max-w-3xl mx-auto">
            AI Resume Builder is powered by modern technologies to deliver
            speed, security, scalability, and an exceptional user experience.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">

          {technologies.map((tech, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center border border-gray-100"
            >

              <div className="text-5xl">
                {tech.icon}
              </div>

              <div
                className={`inline-block mt-6 px-4 py-2 rounded-full text-sm font-semibold ${tech.color}`}
              >
                {tech.name}
              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TechStackSection;