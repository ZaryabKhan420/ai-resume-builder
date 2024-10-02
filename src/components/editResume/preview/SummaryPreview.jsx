import React from "react";

const SummaryPreview = ({ resumeInfo }) => {
  return <p className="text-xs text-left font-medium">{resumeInfo?.summary}</p>;
};

export default SummaryPreview;
