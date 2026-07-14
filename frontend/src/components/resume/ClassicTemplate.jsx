function ClassicTemplate({ resume }) {

  const skills = resume.skills
    ? resume.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  return (

    <div className="bg-white max-w-4xl mx-auto shadow-xl p-12">

      {/* Header */}

      <div className="text-center border-b-2 border-gray-300 pb-6">

        <h1 className="text-5xl font-bold text-gray-900">
          {resume.full_name || "Your Name"}
        </h1>

        <div className="mt-3 text-gray-600">

          <p>{resume.email}</p>

          <p>{resume.phone}</p>

        </div>

      </div>

      {/* Summary */}

      <section className="mt-8">

        <h2 className="text-2xl font-bold border-b pb-2">
          Professional Summary
        </h2>

        <p className="mt-4 leading-8 whitespace-pre-line">
          {resume.summary || "No summary provided."}
        </p>

      </section>

      {/* Skills */}

      <section className="mt-8">

        <h2 className="text-2xl font-bold border-b pb-2">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3 mt-4">

          {skills.map((skill, index) => (

            <span
              key={index}
              className="border px-4 py-2 rounded"
            >
              {skill}
            </span>

          ))}

        </div>

      </section>

      {/* Education */}

      <section className="mt-8">

        <h2 className="text-2xl font-bold border-b pb-2">
          Education
        </h2>

        <p className="mt-4 whitespace-pre-line">
          {resume.education}
        </p>

      </section>

      {/* Experience */}

      <section className="mt-8">

        <h2 className="text-2xl font-bold border-b pb-2">
          Experience
        </h2>

        <p className="mt-4 whitespace-pre-line">
          {resume.experience}
        </p>

      </section>

    </div>

  );

}

export default ClassicTemplate;