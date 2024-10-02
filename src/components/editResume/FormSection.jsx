import React, { useState } from "react";
import {
  EducationForm,
  ExperienceForm,
  PersonalForm,
  SkillsForm,
  SummaryForm,
} from "../editResume/form/index";
import { Button } from "../ui/button";
import { LayoutGrid, MoveLeftIcon } from "lucide-react";
import { ThemeColor } from "./preview/index";
const FormSection = ({ getResumeInfo }) => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="flex justify-center items-center gap-2"
          size="sm"
        >
          {" "}
          <LayoutGrid />
          <ThemeColor />
        </Button>
        <div className="flex gap-3 items-center">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              className="flex gap-2 justify-center items-center"
              onClick={() => setActiveFormIndex((prevValue) => prevValue - 1)}
            >
              <MoveLeftIcon />
            </Button>
          )}
          {activeFormIndex < 5 && (
            <Button
              size="sm"
              className="flex gap-2 justify-center items-center"
              disabled={!enableNext}
              onClick={() => setActiveFormIndex((prevValue) => prevValue + 1)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
      {activeFormIndex === 1 && <PersonalForm setEnableNext={setEnableNext} />}
      {activeFormIndex === 2 && <SummaryForm setEnableNext={setEnableNext} />}
      {activeFormIndex === 3 && (
        <ExperienceForm
          setEnableNext={setEnableNext}
          getResumeInfo={getResumeInfo}
        />
      )}
      {activeFormIndex === 4 && (
        <EducationForm
          setEnableNext={setEnableNext}
          getResumeInfo={getResumeInfo}
        />
      )}
      {activeFormIndex === 5 && <SkillsForm getResumeInfo={getResumeInfo} />}
    </div>
  );
};

export default FormSection;
