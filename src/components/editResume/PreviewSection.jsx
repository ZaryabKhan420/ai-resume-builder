import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import {
  PersonalPreview,
  SummaryPreview,
  ExperiencePreview,
  EducationPreview,
  SkillsPreview,
} from "./preview/index";
const PreviewSection = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="h-full shadow-lg p-3 md:p-8 lg:p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      <PersonalPreview resumeInfo={resumeInfo} />

      <SummaryPreview resumeInfo={resumeInfo} />

      <ExperiencePreview resumeInfo={resumeInfo} />

      <EducationPreview resumeInfo={resumeInfo} />

      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
};

export default PreviewSection;
