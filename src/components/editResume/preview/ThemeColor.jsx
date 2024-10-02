import React, { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { updateResumeDetail } from "../../../../utils/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ThemeColor = () => {
  const [selectedColor, setSelectedColor] = useState("#FF5733");
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  useEffect(() => {
    setResumeInfo((prevValue) => {
      return {
        ...prevValue,
        themeColor: selectedColor,
      };
    });
    updateTheme();
  }, [selectedColor]);

  const updateTheme = async () => {
    const data = {
      data: {
        themeColor: selectedColor,
      },
    };
    try {
      const result = await updateResumeDetail(resumeId, data);
      if (result) {
        toast("Theme Color Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FFC300",
    "#DAF7A6",
    "#FF33D4",
    "#33FFD4",
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#581845",
    "#FFC0CB",
    "#A52A2A",
    "#F0E68C",
    "#FF4500",
    "#8A2BE2",
    "#48D1CC",
    "#20B2AA",
    "#9370DB",
    "#FFD700",
  ];
  return (
    <div>
      <Popover asChild>
        <PopoverTrigger>Theme</PopoverTrigger>
        <PopoverContent>
          <h2 className="text-sm font-bold text-black my-3">
            Select Theme Color
          </h2>
          <div className="grid grid-cols-5 gap-3 p-3 rounded-lg">
            {colors.map((color) => {
              return (
                <span
                  key={color}
                  className={` ${
                    selectedColor === color ? "border-2 border-black" : ""
                  } rounded-full h-5 w-5 cursor-pointer`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></span>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemeColor;
