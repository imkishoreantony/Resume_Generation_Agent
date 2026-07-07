function ProfileActivity({ profile }) {

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">

        ⚡ Recent Activity

      </h2>

      <div className="space-y-4">

        {profile.recent_activity.map((activity, index) => (

          <div
            key={index}
            className="flex items-center justify-between border rounded-2xl p-5 hover:bg-gray-50 transition"
          >

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">

                ✔

              </div>

              <div>

                <h3 className="font-semibold">

                  {activity}

                </h3>

                <p className="text-gray-500 text-sm">

                  AI completed successfully

                </p>

              </div>

            </div>

            <span className="text-sm text-gray-400">

              Just now

            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default ProfileActivity;