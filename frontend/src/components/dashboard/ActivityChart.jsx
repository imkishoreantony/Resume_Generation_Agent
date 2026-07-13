import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ActivityChart({ stats }) {

  const data = [
    {
      name: "Reviews",
      value: stats.ai_reviews,
    },
    {
      name: "Generated",
      value: stats.ai_generated,
    },
    {
      name: "Assisted",
      value: stats.ai_assisted,
    },
    {
      name: "Cover",
      value: stats.cover_letters,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        📈 AI Activity
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ActivityChart;