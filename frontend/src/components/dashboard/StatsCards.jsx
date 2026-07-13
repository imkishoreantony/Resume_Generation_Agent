import StatsCard from "./StatsCard";

function StatsCards({ stats }) {

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

      <StatsCard
        icon="📄"
        title="Total Resumes"
        value={stats.total_resumes}
        color="text-blue-600"
      />

      <StatsCard
        icon="🤖"
        title="AI Reviews"
        value={stats.ai_reviews}
        color="text-green-600"
      />

      <StatsCard
        icon="✨"
        title="AI Generated"
        value={stats.ai_generated}
        color="text-purple-600"
      />

      <StatsCard
        icon="🧠"
        title="AI Assisted"
        value={stats.ai_assisted}
        color="text-orange-600"
      />

      <StatsCard
        icon="💼"
        title="Cover Letters"
        value={stats.cover_letters}
        color="text-pink-600"
      />

    </div>

  );

}

export default StatsCards;