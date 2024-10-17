import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import tasks from "@/utils/tasks";
import TaskCard from "../HomeComps/Tasks/TaskCard";
import CreateTask from "../HomeComps/Tasks/CreateTask";
import { useRef } from "react";

const LatestTasks = () => {
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="bg-secondary p-3 rounded flex flex-col
     gap-4 max-h-[370px] h-[370px]"
    >
      {/* HEAD */}
      <div className="flex justify-between font-bold">
        <h3>Latest tasks</h3>
        <Button onClick={() => dialogTriggerRef.current?.click()}>
          Add New&nbsp;
          <Plus strokeWidth={3} className="w-[18px] h-[18px]" />
        </Button>
      </div>
      <div
        // max-h-[326px]
        className="grid gap-3
          min-w-full px-3 pb-3  flex-grow
          overflow-y-auto overflow-x-hidden smd:grid-cols-2 
          md:grid-cols-1"
      >
        {tasks.map((task, index) => {
          return <TaskCard key={index} task={task} />;
        })}
      </div>
      <CreateTask dialogTriggerRef={dialogTriggerRef} />
    </div>
  );
};

export default LatestTasks;
