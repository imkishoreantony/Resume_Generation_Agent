function WelcomeBanner({ username }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white mb-8">

      <h2 className="text-lg opacity-90">
        {greeting},
      </h2>

      <h1 className="text-4xl font-bold mt-2">
        {username} 👋
      </h1>

      <p className="mt-4 text-blue-100 text-lg">
        Welcome back to your AI Resume Builder.
      </p>

      <p className="text-blue-200 mt-2">
        Build ATS-friendly resumes, generate cover letters, and improve your career with AI.
      </p>

    </div>
  );
}

export default WelcomeBanner;