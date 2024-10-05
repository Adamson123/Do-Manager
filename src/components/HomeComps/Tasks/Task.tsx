import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { CalendarDaysIcon, FlameIcon, MoreHorizontalIcon } from "lucide-react";

const Task = () => {
  const randomColor = () => {
    const colors = ["#ef4444", "#22c55e", "#eab308"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const color = randomColor();
  return (
    <div
      className="bg-secondary border border-darkerBg
      text-muted-foreground h-48 rounded-2xl box-border
      p-2 pb-[10px] flex flex-col"
    >
      {/* Priority */}
      <div className="text-right">
        <span
          style={{
            color,
            borderColor: color,
          }}
          className="text-[10px] py-[7px]
          px-[6px] rounded-3xl tracking-wider"
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
            value={80}
            className="rounded h-[5px] bg-darkerBg
             border-none"
            indicatorColor={color}
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

        {/* More options */}
        <div>
          <MoreHorizontalIcon className="cursor-pointer w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Task;
