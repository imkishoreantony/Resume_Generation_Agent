function TemplateThumbnail({ type }) {

  return (

    <div className="bg-white w-full h-full p-3">

      {/* Header */}

      <div
        className={
          type === "Modern"
            ? "bg-blue-600 h-10 rounded"
            : type === "Professional"
            ? "bg-gray-800 h-10 rounded"
            : "border-b h-10"
        }
      />

      {/* Name */}

      <div className="mt-3">

        <div className="h-2 bg-gray-700 rounded w-2/3" />

        <div className="h-2 bg-gray-300 rounded w-1/2 mt-2" />

      </div>

      {/* Sections */}

      <div className="space-y-2 mt-5">

        <div className="h-2 bg-gray-300 rounded" />

        <div className="h-2 bg-gray-200 rounded w-5/6" />

        <div className="h-2 bg-gray-300 rounded w-4/6" />

        <div className="h-2 bg-gray-200 rounded" />

      </div>

    </div>

  );

}

export default TemplateThumbnail;