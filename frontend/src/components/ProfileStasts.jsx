function ProfileStats({ profile }) {

  const stats = [
    {
      icon: "📄",
      title: "Resumes",
      value: profile.total_resumes,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: "🤖",
      title: "AI Reviews",
      value: profile.ai_reviews,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: "✨",
      title: "AI Generated",
      value: profile.ai_generated,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: "📝",
      title: "Cover Letters",
      value: profile.cover_letters,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

      {stats.map((stat, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 text-center"
        >

          <div
            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${stat.color}`}
          >
            {stat.icon}
          </div>

          <h2 className="text-4xl font-bold mt-5">
            {stat.value}
          </h2>

          <p className="text-gray-500 mt-2">
            {stat.title}
          </p>

        </div>

      ))}

    </div>
  );
}

export default ProfileStats;