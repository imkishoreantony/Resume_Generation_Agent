function TestimonialsSection() {

  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Computer Science Student",
      avatar: "👨‍🎓",
      review:
        "The AI Resume Builder saved me hours of work. The ATS suggestions helped me improve my resume dramatically.",
    },
    {
      name: "Priya Nair",
      role: "Software Engineer",
      avatar: "👩‍💻",
      review:
        "The AI-generated cover letter was surprisingly professional. I received interview calls within a week.",
    },
    {
      name: "Rahul Verma",
      role: "Job Seeker",
      avatar: "🧑‍💼",
      review:
        "Job Match and Resume Review are my favorite features. Everything is fast, simple, and beautifully designed.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="uppercase tracking-widest text-blue-600 font-semibold">
            Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-800">
            What Our Users Say
          </h2>

          <p className="text-gray-500 text-lg mt-5 max-w-3xl mx-auto">
            Students and professionals love how quickly they can build,
            improve, and export professional resumes using AI.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {testimonials.map((user, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8"
            >

              {/* Stars */}

              <div className="text-yellow-400 text-2xl">
                ⭐⭐⭐⭐⭐
              </div>

              {/* Review */}

              <p className="text-gray-600 leading-8 mt-6 italic">
                "{user.review}"
              </p>

              {/* User */}

              <div className="flex items-center gap-4 mt-8">

                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                  {user.avatar}
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    {user.name}
                  </h3>

                  <p className="text-gray-500">
                    {user.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TestimonialsSection;