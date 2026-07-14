function ProfessionalTemplate({ resume }) {

  const skills = resume.skills
    ? resume.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean)
    : [];

  return (

    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">

      <div className="grid grid-cols-3">

        {/* Sidebar */}

        <div className="bg-gray-800 text-white p-8">

          <h2 className="text-2xl font-bold mb-8">
            CONTACT
          </h2>

          <div className="space-y-4">

            <p>
              📧<br />
              {resume.email || "Email"}
            </p>

            <p>
              📞<br />
              {resume.phone || "Phone"}
            </p>

          </div>

          <hr className="my-8 border-gray-600" />

          <h2 className="text-2xl font-bold mb-5">
            SKILLS
          </h2>

          <div className="space-y-3">

            {
              skills.length === 0

              ?

              <p>No Skills</p>

              :

              skills.map((skill,index)=>(

                <div
                  key={index}
                  className="bg-gray-700 rounded-lg px-3 py-2"
                >
                  {skill}
                </div>

              ))
            }

          </div>

          <hr className="my-8 border-gray-600" />

          <h2 className="text-2xl font-bold mb-4">
            EDUCATION
          </h2>

          <p className="whitespace-pre-line leading-7">

            {resume.education || "No education"}

          </p>

        </div>

        {/* Main Content */}

        <div className="col-span-2 p-10">

          <h1 className="text-5xl font-bold text-gray-900">

            {resume.full_name || "Your Name"}

          </h1>

          <div className="mt-10">

            <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2">

              Professional Summary

            </h2>

            <p className="mt-5 leading-8 whitespace-pre-line text-gray-700">

              {resume.summary || "No summary"}

            </p>

          </div>

          <div className="mt-10">

            <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2">

              Experience

            </h2>

            <p className="mt-5 leading-8 whitespace-pre-line text-gray-700">

              {resume.experience || "No experience"}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProfessionalTemplate;