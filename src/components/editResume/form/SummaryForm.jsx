import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { BrainIcon, Loader2 } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { updateResumeDetail } from "../../../../utils/GlobalApi";
import { toast } from "sonner";
import { chatSession } from "../../../../utils/AIModal";

const SummaryForm = ({ setEnableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loader, setLoader] = useState(false);
  const [aiLoader, setAILoader] = useState(false);
  const [summaryData, setSummaryData] = useState("");
  const { resumeId } = useParams();

  const prompt = `Job Title: ${resumeInfo?.jobTitle}. Depends on job title, give me summary for my resume under 4-5 lines. Only give me summary under 50 words. Only give me one summary. No need to discuss Experience. Do not use HTML Format.`;

  useEffect(() => {
    setEnableNext(false);
    resumeInfo && setSummaryData(resumeInfo?.summary);
  }, [resumeInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const data = {
      data: {
        summary: summaryData,
      },
    };
    try {
      const result = await updateResumeDetail(resumeId, data);
      if (result) {
        toast("Summary Data Saved.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setEnableNext(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSummaryData(value);
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const generateSummaryFromAI = async () => {
    setAILoader(true);
    const result = await chatSession.sendMessage(prompt);
    if (result) {
      setSummaryData(result.response.text());
      setResumeInfo({
        ...resumeInfo,
        summary: result.response.text(),
      });
      setAILoader(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p className="text-sm">Add Summary for your Job Title.</p>
        <div className="flex justify-between items-center mt-6 mb-3">
          <span className="text-sm">Add Summary</span>
          <Button
            className="text-primary border border-primary flex justify-center items-center gap-2 "
            size="sm"
            variant="outline"
            onClick={generateSummaryFromAI}
          >
            <BrainIcon className="text-xs" />{" "}
            {aiLoader ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Generate From AI"
            )}
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Write your Summary here."
            className="my-5 min-h-[150px]"
            required
            name="summary"
            value={summaryData}
            defaultValue={resumeInfo?.summary}
            onChange={(e) => handleChange(e)}
          />
          <div className="flex justify-end">
            <Button type="submit">
              {loader ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;
