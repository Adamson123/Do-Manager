import { Checkbox } from "@/components/ui/checkbox";
import { AlignLeft, Clock } from "lucide-react";

const SubTask = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* Checkbox and Task */}
      <div className="flex gap-2 items-center">
        {/* Checkbox  */}
        <Checkbox />
        {/* Task */}
        <p className="text-[15px]">My SubTask</p>
      </div>
      {/* Description and Date */}
      <div
        className="pl-2 border-l border-darkerBg translate-x-3 
      flex flex-col gap-2"
      >
        {/* Description */}
        <div className="flex gap-2">
          <AlignLeft className="min-h-5 min-w-5" />
          <span className="text-[12px] text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe est
            sapiente eaque debitis! Consectetur, labore perspiciatis.
          </span>
        </div>
        {/* Date */}
        <div className="flex gap-2 items-center">
          <Clock className="h-5 w-5" />
          <span
            className="border border-darkerBg py-1 text-[13px] px-3 
            text-muted-foreground rounded-md"
          >
            February 25th, 2025
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubTask;
