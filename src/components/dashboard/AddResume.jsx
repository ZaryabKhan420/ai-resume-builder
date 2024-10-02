import React, { useState } from "react";
import { PlusSquare } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { createNewResume } from "../../../utils/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const onCreate = async () => {
    setLoader(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeName,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    try {
      const result = await createNewResume(data);
      if (result) {
        console.log(result);
        navigate(`/dashboard/resume/${result.data.data.documentId}/edit`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setResumeName("");
      setOpenDialog(false);
    }
  };

  return (
    <div className="h-[250px] border border-dashed border-slate-400 rounded-lg shadow-md flex justify-center items-center">
      <Dialog open={openDialog}>
        <Button
          variant="ghost"
          onClick={() => setOpenDialog(true)}
          className="w-full h-full"
        >
          <PlusSquare />
        </Button>

        <DialogContent>
          <DialogHeader className="flex flex-col justify-start items-start gap-3">
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new Resume.
            </DialogDescription>
            <Input
              placeholder="Ex. Full Stack Engineer"
              onChange={(e) => setResumeName(e.target.value)}
              value={resumeName}
            />
          </DialogHeader>
          <Button variant="ghost" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button disabled={!resumeName} onClick={() => onCreate()}>
            {loader ? <LoaderCircle className="animate-spin" /> : "Create"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
