function LatestResumes({ resumes = [] }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        📄 Latest Resumes
      </h2>

      {resumes.length === 0 ? (

        <p className="text-gray-500">
          No resumes available.
        </p>

      ) : (

        <div className="space-y-4">

          {resumes.map((resume) => (

            <div
              key={resume.id}
              className="border rounded-xl p-4 hover:bg-gray-50 transition"
            >

              <h3 className="font-bold text-lg">
                {resume.title}
              </h3>

              <p className="text-gray-500">
                🎨 {resume.template}
              </p>

              <p className="text-gray-400 text-sm mt-1">
                📅 {resume.created_at}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default LatestResumes;