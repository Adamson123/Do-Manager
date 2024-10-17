import { Check, Folder, TimerOffIcon } from "lucide-react";

const TasksStatistics = () => {
  return (
    <div className="flex flex-col gap-3 text-background text-[14px]">
      {/* Total Tasks */}
      <div
        className="p-3 bg-primary flex rounded gap-2 
      items-center justify-between"
      >
        {/* total and label */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold">5</span>
          <span>Total Tasks</span>
        </div>
        <div
          className="h-[45px] w-[45px] bg-background rounded-full
         flex items-center justify-center"
        >
          <Folder className="fill-primary stroke-primary" />
        </div>
      </div>
      {/* Subtasks Completed */}
      <div
        className="p-3 bg-primary flex rounded gap-2 
      items-center justify-between"
      >
        {/* total and label */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold">15</span>
          <span>Subtasks Completed</span>
        </div>
        <div
          className="h-[45px] w-[45px] bg-background rounded-full
         flex items-center justify-center"
        >
          <Check strokeWidth={3} className="fill-background stroke-primary" />
        </div>
      </div>
      {/* Overdue Tasks */}
      <div
        className="p-3 bg-primary flex rounded gap-2 
      items-center justify-between"
      >
        {/* total and label */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold">5</span>
          <span>Overdue Tasks</span>
        </div>
        <div
          className="h-[45px] w-[45px] bg-background rounded-full
         flex items-center justify-center"
        >
          <TimerOffIcon className="fill-primary stroke-primary" />
        </div>
      </div>
    </div>
  );
};

export default TasksStatistics;
