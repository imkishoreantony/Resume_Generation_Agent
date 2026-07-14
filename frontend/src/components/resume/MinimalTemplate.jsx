function MinimalTemplate({ resume }) {

  const skills = resume.skills
    ? resume.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean)
    : [];

  return (

    <div className="bg-white max-w-4xl mx-auto p-12 shadow-lg">

      {/* Header */}

      <div className="text-center">

        <h1 className="text-5xl font-light tracking-wide">

          {resume.full_name || "Your Name"}

        </h1>

        <div className="mt-3 text-gray-600">

          {resume.email}

          {" • "}

          {resume.phone}

        </div>

      </div>

      {/* Summary */}

      <section className="mt-10">

        <h2 className="uppercase font-bold tracking-widest border-b pb-2">

          Summary

        </h2>

        <p className="mt-4 whitespace-pre-line leading-8">

          {resume.summary || "No summary provided."}

        </p>

      </section>

      {/* Skills */}

      <section className="mt-10">

        <h2 className="uppercase font-bold tracking-widest border-b pb-2">

          Skills

        </h2>

        <div className="mt-4 flex flex-wrap gap-2">

          {
            skills.length === 0

            ?

            <span>No skills added.</span>

            :

            skills.map((skill,index)=>(

              <span
                key={index}
                className="border border-gray-400 px-3 py-1 rounded"
              >
                {skill}
              </span>

            ))
          }

        </div>

      </section>

      {/* Education */}

      <section className="mt-10">

        <h2 className="uppercase font-bold tracking-widest border-b pb-2">

          Education

        </h2>

        <p className="mt-4 whitespace-pre-line">

          {resume.education || "No education provided."}

        </p>

      </section>

      {/* Experience */}

      <section className="mt-10">

        <h2 className="uppercase font-bold tracking-widest border-b pb-2">

          Experience

        </h2>

        <p className="mt-4 whitespace-pre-line">

          {resume.experience || "No experience provided."}

        </p>

      </section>

    </div>

  );

}

export default MinimalTemplate;