import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  AlignLeft,
  Clock,
  MoreHorizontal,
  Edit,
  Trash2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Clock className="h-5 w-5" />
            <span
              className="border border-darkerBg py-1 text-[13px] px-3 
            text-muted-foreground rounded-md"
            >
              February 25th, 2025
            </span>
          </div>

          {/* */}
          <Popover>
            <PopoverTrigger
              onClick={(event) => {
                event.stopPropagation();
              }}
              asChild
            >
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open more options menu</span>
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0 mr-2">
              <div className="flex flex-col text-[12px] tracking-wider">
                <Button
                  variant="ghost"
                  className="flex items-center justify-start h-10 px-2
                   hover:bg-accent hover:text-accent-foreground rounded-none"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </Button>
                <div className="h-[1px] bg-darkerBg" />
                <Button
                  variant="ghost"
                  className="flex items-center justify-start h-10 px-2
                   hover:bg-accent hover:text-accent-foreground rounded-none"
                >
                  <Star className="mr-2 h-5 w-5" />
                  <span>Add to favorites</span>
                </Button>
                <div className="h-[1px] bg-darkerBg" />
                <Button
                  variant="ghost"
                  className="flex items-center justify-start
                   h-10 px-2 hover:bg-accent  
                   text-red-500 hover:text-red-500 rounded-none"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default SubTask;
