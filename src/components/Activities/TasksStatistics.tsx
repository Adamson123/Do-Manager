import { TaskInitialStateTypes } from "@/features/taskSlice";
import { RootState } from "@/store/store";
import { Check, Folder, TimerOffIcon } from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const TasksStatistics = () => {
  const { tasks } = useSelector<RootState, TaskInitialStateTypes>(
    (state) => state.task
  );

  const subtasksStats = useMemo(() => {
    const subtasksCompleted = tasks.flatMap((task) =>
      task.subtasks.filter((subtask) => subtask.completed)
    ).length;

    const overdueSubtasks = tasks.flatMap((task) =>
      task.subtasks.filter((subtask) => {
        const dueDate = new Date(subtask.dueDate);
        const now = new Date();
        if (!subtask.completed && now > dueDate) {
          return subtask;
        }
      })
    ).length;

    return { subtasksCompleted, overdueSubtasks };
  }, [tasks]);

  return (
    <div className="flex flex-col gap-3 text-background text-[14px]">
      {/* Total Tasks */}
      <div
        className="p-3 bg-primary flex rounded gap-2 
      items-center justify-between"
      >
        {/* total and label */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{tasks.length}</span>
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
          <span className="text-2xl font-bold">
            {subtasksStats.subtasksCompleted}
          </span>
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
          <span className="text-2xl font-bold">
            {subtasksStats.overdueSubtasks}
          </span>
          <span>Overdue Subtasks</span>
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
