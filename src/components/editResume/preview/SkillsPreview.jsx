import React from "react";

const SkillsPreview = ({ resumeInfo }) => {
  return (
    <div className="my-5">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        {" "}
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      <div className="grid grid-cols-2 gap-5 my-4">
        {resumeInfo?.skills?.map((item, idx) => {
          return (
            <div key={idx} className="flex justify-between items-center gap-5">
              <h2 className="text-xs font-medium">{item.name}</h2>
              <div className="h-[8px] w-[120px] bg-gray-400">
                <div
                  className="progress-bar"
                  style={{
                    height: "8px",
                    width: item.rating * 20 + "%",
                    backgroundColor: resumeInfo?.themeColor,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsPreview;
