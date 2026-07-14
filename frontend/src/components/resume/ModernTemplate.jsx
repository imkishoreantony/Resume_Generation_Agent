function ModernTemplate({ resume }) {

  const skills = resume.skills
    ? resume.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean)
    : [];

  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-12">

        <h1 className="text-5xl font-bold">

          {resume.full_name || "Your Name"}

        </h1>

        <p className="mt-4 text-lg opacity-90">

          {resume.email}

        </p>

        <p className="opacity-90">

          {resume.phone}

        </p>

      </div>

      <div className="p-10">

        {/* Summary */}

        <section>

          <h2 className="text-2xl font-bold text-blue-700 mb-4">

            Professional Summary

          </h2>

          <p className="leading-8 text-gray-700 whitespace-pre-line">

            {resume.summary || "No summary provided."}

          </p>

        </section>

        {/* Skills */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold text-blue-700 mb-5">

            Technical Skills

          </h2>

          <div className="flex flex-wrap gap-3">

            {
              skills.length === 0

              ?

              <span className="text-gray-500">

                No skills added.

              </span>

              :

              skills.map((skill,index)=>(

                <span

                  key={index}

                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold"

                >

                  {skill}

                </span>

              ))
            }

          </div>

        </section>

        {/* Experience */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold text-blue-700 mb-4">

            Experience

          </h2>

          <div className="border-l-4 border-blue-600 pl-5">

            <p className="leading-8 whitespace-pre-line">

              {resume.experience || "No experience provided."}

            </p>

          </div>

        </section>

        {/* Education */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold text-blue-700 mb-4">

            Education

          </h2>

          <div className="border-l-4 border-indigo-600 pl-5">

            <p className="leading-8 whitespace-pre-line">

              {resume.education || "No education provided."}

            </p>

          </div>

        </section>

      </div>

    </div>

  );

}

export default ModernTemplate;