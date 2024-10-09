"use client";

import { Progress } from "@/components/ui/progress";
import { CalendarDaysIcon, FlameIcon, Trash2 } from "lucide-react";
import { RefObject } from "react";
import { MoreHorizontal, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TaskCardProp {
  drawerTriggerRef: RefObject<HTMLButtonElement>;
}

const TaskCard = ({ drawerTriggerRef }: TaskCardProp) => {
  const randomColor = () => {
    const colors = ["#ef4444", "#22c55e", "#eab308"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const tkColor = randomColor();
  return (
    <div
      onClick={() => drawerTriggerRef.current?.click()}
      className="bg-secondary border border-darkerBg
      text-muted-foreground h-48 rounded-2xl box-border
      p-2 pb-[9px] flex flex-col cursor-pointer"
    >
      {/* Priority :px-[6px] */}
      <div className="text-right">
        <span
          suppressHydrationWarning
          style={{
            color: tkColor,
            borderColor: tkColor,
          }}
          className="text-[10px] py-[7px]
          rounded-3xl tracking-wider"
        >
          High{" "}
          <FlameIcon
            className="inline h-[14px] w-[14px] fill-current 
            -translate-y-[1px]"
          />
        </span>
      </div>

      {/* Title and progress */}
      <div className="flex flex-col gap-2 mt-4">
        {/* Title */}
        <div
          className="text-foreground 
           text-[15px] tracking-wide font-bold"
        >
          Task title
        </div>
        {/* Progress */}
        <div className="">
          <Progress
            suppressHydrationWarning
            value={80}
            className="rounded h-[5px] bg-darkerBg
             border-none"
            indicatorColor={tkColor}
          />
          <div className="flex justify-between text-[9px] translate-y-[2px]">
            <span>Completed</span>
            <span>80%</span>
          </div>
        </div>
      </div>

      {/* Date and more options  flex-col gap-1 items-start*/}

      <div className="mt-auto flex justify-between items-end">
        {/* Date */}
        <span
          className="bg-darkerBg
        text-black dark:text-muted-foreground 
          text-[13px] p-[6px] rounded-lg"
        >
          <CalendarDaysIcon
            className="inline h-[14px] w-[14px]
           -translate-y-[2px]"
          />{" "}
          13 June
        </span>

        {/* More options : */}
        <div>
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
            <PopoverContent
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="w-[90px] p-0 mr-2"
            >
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

export default TaskCard;
