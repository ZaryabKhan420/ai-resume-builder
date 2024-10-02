import React from "react";

const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-5">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        {" "}
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience?.map((item, idx) => {
        return (
          <div key={idx} className="my-3">
            <h2
              className="text-sm font-bold"
              style={{ color: resumeInfo?.themeColor }}
            >
              {item.title}
            </h2>
            <h2 className="text-xs font-medium flex items-center justify-between">
              {item.companyName}, {item.city}, {item.state}{" "}
              <span>
                {item?.startDate} TO{" "}
                {item.currentlyWorking ? "Present" : item.endDate}
              </span>
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: item?.workSummary }}
              className="my-1 text-xs"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ExperiencePreview;
