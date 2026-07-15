import TemplatePreview from "./TemplatePreview";
function TemplateCard({
  name,
  selected,
  onClick,
  resume,
}) {

  return (

    <div
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-2xl
        border-2
        transition
        overflow-hidden
        hover:shadow-xl
        ${
          selected
            ? "border-blue-600"
            : "border-gray-200"
        }
      `}
    >

      {/* Thumbnail */}

      <div className="bg-gray-100 h-40 flex items-center justify-center">

        <TemplatePreview
  resume={resume}
  template={name}
/>

      </div>

      {/* Footer */}

      <div className="p-4 text-center">

        <h3 className="font-bold text-lg">

          {name}

        </h3>

      </div>

    </div>

  );

}

export default TemplateCard;