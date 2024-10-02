import React, { useEffect, useState } from "react";
import { Header, Footer, PreviewSection } from "../components/index";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { getResumeById } from "../../utils/GlobalApi";
import { RWebShare } from "react-web-share";
const ViewResumePage = () => {
  const [resumeInfo, setResumeInfo] = useState({});
  const { resumeId } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await getResumeById(resumeId);
      if (result) {
        console.log(result);
        setResumeInfo(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="container">
        <div className="no-print">
          <Header />
        </div>
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <div className="no-print">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI generated Resume is ready.{" "}
            </h2>
            <p className="text-center text-gray-400">
              Now you are ready to download and share with unique Resume Url
              with friends and family.
            </p>
            <div className="flex justify-between items-center my-10">
              <Button onClick={handleDownload}>Download</Button>
              <RWebShare
                data={{
                  text: "Hello Everyone, this is my Resume.",
                  url: `${
                    import.meta.env.VITE_BASE_URL
                  }/my-resume/${resumeId}/view`,
                  title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} Resume`,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button>Share</Button>
              </RWebShare>
            </div>
          </div>
          <div className="print-area">{resumeInfo && <PreviewSection />}</div>
        </div>
        <div className="no-print">
          <Footer />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResumePage;
