import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useNavigate, useParams } from "react-router-dom";
import { updateResumeDetail } from "../../../../utils/GlobalApi";
import { toast } from "sonner";

const skillField = {
  name: "",
  rating: 0,
};

const SkillsForm = ({ getResumeInfo }) => {
  const [skillsList, setSkillsList] = useState([skillField]);
  const [loader, setLoader] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const AddField = () => {
    setSkillsList((prevValue) => {
      const newArr = [...prevValue, { ...skillField }];
      return newArr;
    });
  };

  const removeField = () => {
    setSkillsList((prevValue) => {
      const newArr = prevValue.slice(0, -1);
      return newArr;
    });
  };

  const handleChange = (name, value, idx) => {
    const newEntries = skillsList.slice();
    newEntries[idx][name] = value;
    setSkillsList(newEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const data = {
        data: {
          skills: skillsList,
        },
      };
      const result = await updateResumeDetail(resumeId, data);
      if (result) {
        toast("Skills Data Saved");
        toast("Resume Build Successfully");
        navigate(`/my-resume/${resumeId}/view`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getResumeInfo(resumeId);
  }, [resumeId]);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList, setResumeInfo]);

  return (
    <form
      className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10"
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold text-lg">Skills</h2>
      <p className="text-sm">Add Skills that you know. </p>
      <div>
        {skillsList &&
          skillsList.map((skill, idx) => (
            <div key={idx} className="my-8 grid grid-cols-2 items-center gap-5">
              <div>
                <label htmlFor="name">Skill</label>
                <Input
                  required
                  id="name"
                  name="name"
                  placeholder="Enter Skills Name"
                  className="my-2"
                  value={skill?.name}
                  onChange={(e) =>
                    handleChange(e.target.name, e.target.value, idx)
                  }
                />
              </div>

              <div className="justify-self-end">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={skill?.rating}
                  onChange={(value) => handleChange("rating", value, idx)}
                  isRequired
                />
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={AddField}
            type="button"
          >
            + Add More Experience
          </Button>
          <Button
            type="button"
            onClick={removeField}
            variant="outline"
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button type="submit">
          {loader ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default SkillsForm;
