import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PreviewSection, FormSection } from "../components/index";
import dummyData from "../assets/dummyData";
import { ResumeInfoContext } from "../context/ResumeInfoContext";
import { getResumeById } from "../../utils/GlobalApi";
const EditResumePage = () => {
  const [resumeInfo, setResumeInfo] = useState(null);
  const params = useParams();
  useEffect(() => {
    setResumeInfo(dummyData);
    getResumeInfo(params.resumeId);
  }, []);

  const getResumeInfo = async (id) => {
    try {
      const result = await getResumeById(id);
      if (result) {
        if (result.data.data.jobTitle != null) {
          setResumeInfo(result.data.data);
        } else {
          setResumeInfo(dummyData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div
        className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-10
      "
      >
        <div>
          <FormSection getResumeInfo={getResumeInfo} />
        </div>

        <div>
          <PreviewSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResumePage;
