import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import { BrainIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateResumeDetail } from "../../../../utils/GlobalApi";
import { useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "../../../../utils/AIModal";

const formField = {
  title: "",
  companyName: "",
  startDate: "",
  endDate: "",
  city: "",
  state: "",
  workSummary: "",
};

const ExperienceForm = ({ setEnableNext, getResumeInfo }) => {
  const [experienceList, setExperienceList] = useState([formField]);
  const [loader, setLoader] = useState(false);
  const [aiLoader, setAILoader] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const data = {
        data: {
          experience: experienceList,
        },
      };
      const result = await updateResumeDetail(resumeId, data);
      if (result) {
        toast("Experience Data Saved");
        setEnableNext(true); // Enable next step
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    setExperienceList((prevList) =>
      prevList.map((item, index) =>
        index === idx ? { ...item, [name]: value } : item
      )
    );
  };

  const AddField = () => {
    setExperienceList((prevValue) => [...prevValue, { ...formField }]);
  };

  const removeField = () => {
    if (experienceList.length > 1) {
      setExperienceList((prevValue) => prevValue.slice(0, -1));
    } else {
      toast("You must have at least one experience field.");
    }
  };

  const generateSummaryFromAI = async (idx) => {
    setAILoader(true);
    const jobTitle = experienceList[idx]?.title;
    if (!jobTitle) {
      toast("Enter Job Title First");
    } else {
      const prompt = `Job Title: ${jobTitle}. Provide a 4-5 line resume summary (max 50 words) for this job title.`;
      const result = await chatSession.sendMessage(prompt);
      if (result) {
        const summary = await result.response.text();
        setExperienceList((prevList) =>
          prevList.map((item, index) =>
            index === idx ? { ...item, workSummary: summary } : item
          )
        );
      }
    }
    setAILoader(false);
  };

  useEffect(() => {
    setEnableNext(false); // Initially disable next
    getResumeInfo(resumeId); // Fetch resume info
  }, []);

  useEffect(() => {
    // Sync experienceList with resumeInfo
    setResumeInfo((prevInfo) => ({ ...prevInfo, experience: experienceList }));
  }, [experienceList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p className="text-sm">Add your previous Job Experience.</p>
        <form onSubmit={handleSubmit}>
          <div>
            {experienceList.map((experience, idx) => (
              <div key={idx} className="my-8 border border-b-slate-400">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="title" className="text-sm">
                      Position Title
                    </label>
                    <Input
                      required
                      name="title"
                      id="title"
                      className="my-3"
                      placeholder="Enter Your Position Title"
                      value={experience.title}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </div>

                  <div>
                    <label htmlFor="companyName" className="text-sm">
                      Company Name
                    </label>
                    <Input
                      required
                      name="companyName"
                      id="companyName"
                      className="my-3"
                      placeholder="Enter Your Previous Company Name"
                      value={experience.companyName}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </div>

                  <div>
                    <label htmlFor="startDate" className="text-sm">
                      Start Date
                    </label>
                    <Input
                      required
                      name="startDate"
                      id="startDate"
                      className="my-3"
                      type="date"
                      value={experience.startDate}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </div>

                  <div>
                    <label htmlFor="endDate" className="text-sm">
                      End Date
                    </label>
                    <Input
                      required
                      name="endDate"
                      id="endDate"
                      className="my-3"
                      type="date"
                      value={experience.endDate}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="text-sm">
                      City
                    </label>
                    <Input
                      required
                      name="city"
                      id="city"
                      className="my-3"
                      placeholder="Enter Your City"
                      value={experience.city}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="text-sm">
                      State
                    </label>
                    <Input
                      required
                      name="state"
                      id="state"
                      className="my-3"
                      placeholder="Enter Your State"
                      value={experience.state}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </div>

                  <div className="col-span-2">
                    <div className="flex justify-between items-center w-full">
                      <label htmlFor="workSummary" className="text-sm">
                        Work Summary
                      </label>
                      <Button
                        type="button"
                        className="text-primary border border-primary flex justify-center items-center gap-2 "
                        size="sm"
                        variant="outline"
                        onClick={() => generateSummaryFromAI(idx)}
                      >
                        <BrainIcon className="text-xs" />{" "}
                        {aiLoader ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Generate From AI"
                        )}
                      </Button>
                    </div>

                    <Textarea
                      required
                      name="workSummary"
                      id="workSummary"
                      className="my-3 text-sm min-h-[150px]"
                      value={experience.workSummary}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="text-primary"
                onClick={AddField}
              >
                + Add More Experience
              </Button>
              <Button
                type="button"
                onClick={removeField}
                variant="outline"
                className="text-primary"
              >
                - Remove
              </Button>
            </div>
            <Button type="submit">
              {loader ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
