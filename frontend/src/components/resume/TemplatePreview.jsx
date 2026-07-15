import ResumeTemplate from "./ResumeTemplate";

function TemplatePreview({
  resume,
  template,
}) {

  return (

    <div
      className="overflow-hidden rounded-lg border bg-white"
      style={{
        height: "180px",
      }}
    >

      <div
        style={{
          transform: "scale(0.22)",
          transformOrigin: "top left",
          width: "455%",
        }}
      >

        <ResumeTemplate
          resume={resume}
          template={template}
        />

      </div>

    </div>

  );

}

export default TemplatePreview;