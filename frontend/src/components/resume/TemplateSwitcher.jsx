function TemplateSwitcher({ template, setTemplate }) {

  const templates = [
    "Classic",
    "Modern",
    "Minimal",
    "Professional",
  ];

  return (

    <div className="flex flex-wrap gap-3 mb-6">

      {templates.map((item) => (

        <button
          key={item}
          onClick={() => setTemplate(item)}
          className={`px-5 py-2 rounded-full transition font-medium
            ${
              template === item
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          {item}
        </button>

      ))}

    </div>

  );

}

export default TemplateSwitcher;