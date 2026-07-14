import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import ResumeTemplate from "./resume/ResumeTemplate";
import TemplateSwitcher from "./resume/TemplateSwitcher";

function ResumePreviewModal({
  isOpen,
  onClose,
  resume,
}) {

  const [template, setTemplate] = useState("Classic");

  // Load template whenever a different resume is opened
  useEffect(() => {
    if (resume) {
      setTemplate(resume.template || "Classic");
    }
  }, [resume]);

  const updateTemplate = async (selectedTemplate) => {

    try {

      await api.put(
        `resumes/${resume.id}/template/`,
        {
          template: selectedTemplate,
        }
      );

      setTemplate(selectedTemplate);

      // Keep local object updated
      resume.template = selectedTemplate;

      toast.success(
        `${selectedTemplate} template selected 🎉`
      );

    } catch (error) {

      console.error(error);

      toast.error("Failed to update template.");

    }

  };

  if (!isOpen || !resume) return null;

  return (

    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-5"
      onClick={onClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-100 rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl"
      >

        {/* Header */}

        <div className="sticky top-0 bg-white border-b rounded-t-3xl px-8 py-5 z-10">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-3xl font-bold text-blue-600">
                📄 Resume Preview
              </h1>

              <p className="text-gray-500 mt-1">
                Preview your resume before downloading.
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => window.print()}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition"
              >
                🖨 Print
              </button>

              <button
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
              >
                ✖ Close
              </button>

            </div>

          </div>

          <div className="mt-6">

            <TemplateSwitcher
              template={template}
              onSelect={updateTemplate}
            />

          </div>

        </div>

        {/* Resume */}

        <div className="p-8">

          <ResumeTemplate
            resume={resume}
            template={template}
          />

        </div>

      </div>

    </div>

  );

}

export default ResumePreviewModal;