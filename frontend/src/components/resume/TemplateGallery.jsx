import TemplateCard from "./TemplateCard";

function TemplateGallery({
  template,
  onSelect,
  resume,
}) {

  const templates = [
    "Classic",
    "Modern",
    "Minimal",
    "Professional",
  ];

  return (

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {templates.map((item) => (

        <TemplateCard
          key={item}
          name={item}
          selected={template === item}
          onClick={() => onSelect(item)}
            resume={resume}
        />

      ))}

    </div>

  );

}

export default TemplateGallery;