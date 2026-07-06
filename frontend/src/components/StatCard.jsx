function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">

      <h2 className={`text-4xl font-bold ${color}`}>
        {value}
      </h2>

      <p className="text-gray-600 mt-2">
        {title}
      </p>

    </div>
  );
}

export default StatCard;