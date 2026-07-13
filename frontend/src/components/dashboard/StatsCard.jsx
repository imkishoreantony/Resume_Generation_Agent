function StatsCard({ icon, title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className={`text-4xl font-bold mt-2 ${color}`}>
            {value}
          </h2>

        </div>

        <div className="text-5xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatsCard;