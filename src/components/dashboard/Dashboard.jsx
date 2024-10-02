import React, { useEffect, useState, useContext } from "react";
import AddResume from "./AddResume";
import { getUserResumes } from "../../../utils/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import cvImage from "/cv.png";
import { Loader2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteResumeById } from "../../../utils/GlobalApi";
import { toast } from "sonner";

const Dashboard = () => {
  const [userResumesList, setUserResumesList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    user && getUserResumesFromDB(user?.primaryEmailAddress.emailAddress);
  }, [user]);

  const getUserResumesFromDB = async (userEmail) => {
    const result = await getUserResumes(userEmail);
    setUserResumesList(result.data.data);
    setLoader(false);
  };

  const handleNavigation = (url) => {
    navigate(url);
  };

  const handleDelete = async (docId) => {
    try {
      setDeleteLoader(true);
      const result = await deleteResumeById(docId);
      if (result) {
        toast("Resume Deleted");
        getUserResumesFromDB();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoader(false);
      setOpenAlert(false);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start gap-3">
      <h2 className="text-3xl font-bold">My Resume</h2>
      <p>Start Creating AI Resume For Your Next Job Role.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-5 my-8">
        <AddResume />
        {loader
          ? [1, 2, 3].map((value) => {
              return (
                <div
                  key={value}
                  className="w-full h-[250px] rounded-lg animate-pulse bg-slate-300"
                ></div>
              );
            })
          : userResumesList.length > 0 &&
            userResumesList.map((resume) => {
              return (
                <Link
                  key={resume.resumeId}
                  // to={`/dashboard/resume/${resume.documentId}/edit`}
                >
                  <div className="w-full h-[250px] border-4 border-t-primary rounded-lg flex justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 relative">
                    <img
                      src={cvImage}
                      alt="Previous Resumes"
                      loading="lazy"
                      className="h-[150px]"
                    />
                    <div className="absolute bottom-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleNavigation(
                                `/dashboard/resume/${resume.documentId}/edit`
                              )
                            }
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleNavigation(
                                `/my-resume/${resume.documentId}/view`
                              )
                            }
                          >
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleNavigation(
                                `/my-resume/${resume.documentId}/view`
                              )
                            }
                          >
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setOpenAlert(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <div>
                        <AlertDialog open={openAlert}>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your resume and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => setOpenAlert(false)}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  handleDelete(resume.documentId);
                                }}
                              >
                                {deleteLoader ? (
                                  <Loader2 className="animate-spin" />
                                ) : (
                                  "Delete"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-md font-bold mt-1 text-center">
                    {resume.title}
                  </h2>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default Dashboard;
