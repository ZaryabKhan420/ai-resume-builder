import React from "react";

const EducationPreview = ({ resumeInfo }) => {
  return (
    <div className="my-5">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        {" "}
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.education?.map((item, idx) => {
        return (
          <div key={idx} className="my-3">
            <h2
              className="text-sm font-bold"
              style={{ color: resumeInfo?.themeColor }}
            >
              {item.universityName}
            </h2>
            <h2 className="text-xs font-medium flex items-center justify-between">
              {item.degree}, {item.major},{" "}
              <span>
                {item?.startDate} TO{" "}
                {item.currentlyWorking ? "Present" : item.endDate}
              </span>
            </h2>
            <p className="text-xs my-1">{item?.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default EducationPreview;
