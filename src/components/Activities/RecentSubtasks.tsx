"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskInitialStateTypes } from "@/features/taskSlice";
import { RootState } from "@/store/store";
import { RawSubtaskTypes } from "@/types/subtaskTypes";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const RecentSubtasks = () => {
  const { tasks } = useSelector<RootState, TaskInitialStateTypes>(
    (state) => state.task
  );

  const subtasks = tasks
    .flatMap((task) =>
      task.subtasks.map((subtask) => ({ ...subtask, priority: task.priority }))
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  const getSubtaskState = (subtask: RawSubtaskTypes) => {
    const today = new Date();
    const dueDate = new Date(subtask.dueDate);
    //const hoursLeft = dueDate.getTime() - today.getTime();
    //const dueDateState = Math.round(hoursLeft / (1000 * 3600));
    const now = new Date();

    if (dueDate >= now && !subtask.completed) {
      return { state: "Pending", color: "rgb(var(--mediumPriority))" };
    } else if (dueDate <= now && !subtask.completed) {
      return { state: "Overdue", color: "rgb(var(--highPriority))" };
    } else if (subtask.completed) {
      return { state: "Completed", color: "rgb(var(--lowPriority))" };
    }
  };

  const capitalizeFirstLetter = (priority: string) => {
    return priority[0] + priority.substring(1, priority.length).toLowerCase();
  };
  return (
    <div
      className="bg-secondary w-full flex flex-col
     gap-3 rounded h-full"
    >
      <div
        className="font-bold p-3
       box-border h-[48px]"
      >
        <h3>Recent subtasks</h3>
      </div>
      {/* min-h-[322px] min-h-[100%-48px] max-h-[100%-48px] */}
      <Table className="max-h-[100%-48px]">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subtasks.map((subtask) => (
            <TableRow className="border-b border-b-darkerBg" key={subtask.id}>
              <TableCell className="font-bold w-[300px]">
                {subtask.title}
              </TableCell>
              <TableCell>{format(subtask.createdAt, "EEE, MMM d")}</TableCell>
              <TableCell>{capitalizeFirstLetter(subtask.priority)}</TableCell>
              <TableCell
                style={{
                  color: getSubtaskState(subtask)?.color,
                }}
                className="text-right"
              >
                {getSubtaskState(subtask)?.state}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
};
export default RecentSubtasks;
