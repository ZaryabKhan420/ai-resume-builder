import React, { useContext, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { updateResumeDetail } from "../../../../utils/GlobalApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const PersonalForm = ({ setEnableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loader, setLoader] = useState(false);
  const { resumeId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const data = {
      data: {
        ...formData,
      },
    };
    try {
      const result = await updateResumeDetail(resumeId, data);
      if (result) {
        toast("Personal Data Saved.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setEnableNext(true);
    }
  };

  const handleChange = (e) => {
    setEnableNext(false);
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p className="text-sm">Get Started with the basic Information.</p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 my-8 gap-5">
          <div>
            <label htmlFor="firstName" className="text-sm">
              First Name
            </label>
            <Input
              name="firstName"
              id="firstName"
              className="my-3"
              placeholder="Enter Your First Name"
              required
              onChange={(e) => handleChange(e)}
              defaultValue={resumeInfo?.firstName}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm">
              Last Name
            </label>
            <Input
              name="lastName"
              id="lastName"
              className="my-3"
              placeholder="Enter Your Last Name"
              required
              onChange={(e) => handleChange(e)}
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="jobTitle" className="text-sm">
              Job Title
            </label>
            <Input
              name="jobTitle"
              id="jobTitle"
              className="my-3"
              placeholder="Enter Your Last Name"
              required
              onChange={(e) => handleChange(e)}
              defaultValue={resumeInfo?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <Input
              name="address"
              id="address"
              className="my-3"
              placeholder="Write Your Address"
              required
              onChange={(e) => handleChange(e)}
              defaultValue={resumeInfo?.address}
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm">
              Phone no
            </label>
            <Input
              name="phone"
              id="phone"
              className="my-3"
              placeholder="Enter Your Phone"
              required
              onChange={(e) => handleChange(e)}
              defaultValue={resumeInfo?.phone}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <Input
              name="email"
              id="email"
              className="my-3"
              placeholder="Enter Your Email"
              required
              type="email"
              onChange={(e) => handleChange(e)}
              defaultValue={resumeInfo?.email}
            />
          </div>
        </div>
        <div className=" flex justify-end">
          <Button type="submit">
            {loader ? <Loader2 className="animate-spin" /> : "Save"}{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalForm;
