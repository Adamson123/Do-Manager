import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import TaskCard from "../Home/Tasks/TaskCard";
import CreateTask, { ActionType } from "../Home/Tasks/CreateTask";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { TaskInitialStateTypes } from "@/features/taskSlice";
import ConfirmDelete from "../Home/Tasks/ComfirmDelete";
import useDeleteTask from "@/hooks/useDeleteTask";
import useCreateTask from "@/hooks/useCreateTask";

const LatestTasks = () => {
  const {
    action,
    createDialogOpen,
    setAction,
    setCreateDialogOpen,
    triggerCreateTask,
  } = useCreateTask();
  const { deleteDialogOpen, setDeleteDialogOpen, taskId, triggerDeleteTask } =
    useDeleteTask();
  const { tasks } = useSelector<RootState, TaskInitialStateTypes>(
    (state) => state.task
  );

  const tasksSortedByDate = tasks?.length
    ? [...tasks]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 5)
    : [];

  // To trigger task editing
  const triggerEditTask = (action: ActionType) => {
    setAction(action);
    setCreateDialogOpen(true);
  };

  return (
    <div
      className="bg-secondary p-3 rounded flex flex-col
     gap-4 max-h-[370px] h-[370px]"
    >
      {/* HEAD */}
      <div className="flex justify-between font-bold">
        <h3>Latest tasks</h3>
        <Button onClick={triggerCreateTask}>
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
        {tasksSortedByDate.map((task, index) => {
          return (
            <TaskCard
              key={index}
              task={task}
              triggerEditTask={triggerEditTask}
              triggerDeleteTask={triggerDeleteTask}
            />
          );
        })}
      </div>
      <div className="fixed">
        <CreateTask
          setDialogOpen={setCreateDialogOpen}
          dialogOpen={createDialogOpen}
          action={action}
        />
        <ConfirmDelete
          dialogOpen={deleteDialogOpen}
          setDialogOpen={setDeleteDialogOpen}
          taskId={taskId}
        />
      </div>
    </div>
  );
};

export default LatestTasks;
