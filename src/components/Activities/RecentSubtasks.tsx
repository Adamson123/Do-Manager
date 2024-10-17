import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import subtasks from "@/utils/subtasks";

const colors: { [key: string]: string } = {
  completed: "rgb(var(--lowPriority))",
  pending: "rgb(var(--mediumPriority))",
  overdue: "rgb(var(--highPriority))",
};

const RecentSubtasks = () => {
  return (
    <div
      className="bg-secondary w-full h-full flex flex-col
     gap-3 rounded"
    >
      <div
        className="flex justify-between font-bold p-3
       box-border h-[48px]"
      >
        <h3>Recent subtasks</h3>
      </div>
      {/* min-h-[322px]  */}
      <Table className="min-h-[100%-48px] max-h-[100%-48px]">
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
            <TableRow key={subtask.title}>
              <TableCell className="font-bold w-[300px]">
                {subtask.title}
              </TableCell>
              <TableCell>{subtask.createdAt}</TableCell>
              <TableCell>{subtask.priority}</TableCell>
              <TableCell
                style={{
                  color: colors[subtask.status.toLowerCase()],
                }}
                className="text-right"
              >
                {subtask.status}
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
