function TemplateSwitcher({
  template,
  onSelect,
}) {

  const templates = [
    "Classic",
    "Modern",
    "Minimal",
    "Professional",
  ];

  return (

    <div className="flex flex-wrap gap-3">

      {templates.map((item) => (

        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`px-5 py-2 rounded-full transition
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