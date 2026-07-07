function ProfileHeader({ profile }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

      {/* Avatar */}

      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg">

        {profile.username.charAt(0).toUpperCase()}

      </div>

      {/* Name */}

      <h1 className="text-4xl font-bold mt-6 text-gray-800">
        {profile.username}
      </h1>

      {/* Email */}

      <p className="text-gray-500 mt-2">
        {profile.email}
      </p>

      {/* Join Date */}

      <p className="text-sm text-gray-400 mt-2">
        Member since {profile.date_joined}
      </p>

      {/* Level Badge */}

      <div className="mt-6 inline-block bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold">
        🏆 {profile.level}
      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="font-medium">
            AI Journey
          </span>

          <span>
            {profile.progress}%
          </span>

        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full">

          <div
            className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700"
            style={{
              width: `${profile.progress}%`
            }}
          />

        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;