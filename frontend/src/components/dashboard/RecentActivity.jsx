function RecentActivity({ activities }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        🕒 Recent Activity
      </h2>

      {
        activities.length === 0 ? (

          <p className="text-gray-500">
            No recent activity.
          </p>

        ) : (

          <div className="space-y-5">

            {activities.map((activity, index) => (

              <div
                key={index}
                className="flex items-start gap-4 border-b pb-4 last:border-none"
              >

                <div className="text-2xl">
                  🟢
                </div>

                <div>

                  <h3 className="font-semibold">
                    {activity.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {activity.created_at}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )
      }

    </div>

  );

}

export default RecentActivity;