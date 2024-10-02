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
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

const EducationForm = ({ setEnableNext, getResumeInfo }) => {
  const [educationList, setEducationList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [aiLoader, setAILoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const { resumeId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const data = {
        data: {
          education: educationList,
        },
      };
      const result = await updateResumeDetail(resumeId, data);
      if (result) {
        toast("Education Data Saved");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setEnableNext(true);
    }
  };

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    setEducationList((prevList) =>
      prevList.map((item, index) =>
        index === idx ? { ...item, [name]: value } : item
      )
    );
  };

  const AddField = () => {
    setEducationList((prevList) => [...prevList, formField]);
  };

  const removeField = () => {
    if (educationList.length > 1) {
      setEducationList((prevList) => prevList.slice(0, -1));
    } else {
      toast("You must have at least one education entry.");
    }
  };

  const generateSummaryFromAI = async (idx) => {
    setAILoader(true);

    const { universityName, degree, major } = educationList[idx];
    if (!universityName || !degree || !major) {
      toast("Please fill in the university, degree, and major first.");
    } else {
      const prompt = `University Name: ${universityName}, Degree: ${degree}, Major: ${major}. Provide a 4-5 line resume summary under 50 words based on this information.`;
      const result = await chatSession.sendMessage(prompt);
      if (result) {
        const summary = await result.response.text();
        setEducationList((prevList) =>
          prevList.map((item, index) =>
            index === idx ? { ...item, description: summary } : item
          )
        );
      }
    }
    setAILoader(false);
  };

  useEffect(() => {
    setEnableNext(false); // Disable "Next" button initially
    getResumeInfo(resumeId); // Fetch existing resume info
  }, []);

  useEffect(() => {
    // Sync the updated education list with the global resume info context
    setResumeInfo((prevInfo) => ({ ...prevInfo, education: educationList }));
  }, [educationList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p className="text-sm">Add your Educational Record.</p>
        <form onSubmit={handleSubmit}>
          <div>
            {educationList.map((education, idx) => (
              <div key={idx} className="my-8 border border-b-slate-400">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label htmlFor="universityName" className="text-sm">
                      University Name
                    </label>
                    <Input
                      required
                      name="universityName"
                      id="universityName"
                      className="my-3"
                      placeholder="Enter Your University Name"
                      value={education.universityName}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </div>

                  <div>
                    <label htmlFor="degree" className="text-sm">
                      Degree
                    </label>
                    <Input
                      required
                      name="degree"
                      id="degree"
                      className="my-3"
                      placeholder="Enter Your Degree"
                      value={education.degree}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </div>

                  <div>
                    <label htmlFor="major" className="text-sm">
                      Major
                    </label>
                    <Input
                      required
                      name="major"
                      id="major"
                      className="my-3"
                      placeholder="Enter Your Major Subject"
                      value={education.major}
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
                      value={education.startDate}
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
                      value={education.endDate}
                      onChange={(e) => handleChange(e, idx)}
                    />
                  </div>

                  <div className="col-span-2">
                    <div className="flex justify-between items-center w-full">
                      <label htmlFor="description" className="text-sm">
                        Description
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
                      name="description"
                      id="description"
                      className="my-3 text-sm min-h-[150px]"
                      placeholder="Enter a brief description"
                      value={education.description}
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
                + Add More Education
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

export default EducationForm;
