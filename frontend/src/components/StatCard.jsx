function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-gray-500">
        {title}
      </h2>

      <h1 className="text-4xl font-bold mt-3 text-blue-600">
        {value}
      </h1>

    </div>
  );
}

export default StatCard;