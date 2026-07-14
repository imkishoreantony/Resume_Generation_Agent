import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";

function ResumeTemplate({ resume, template }) {

  switch (template) {

    case "Modern":
      return <ModernTemplate resume={resume} />;

    case "Minimal":
      return <MinimalTemplate resume={resume} />;

    case "Professional":
      return <ProfessionalTemplate resume={resume} />;

    default:
      return <ClassicTemplate resume={resume} />;

  }

}

export default ResumeTemplate;