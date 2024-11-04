import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";
import { deleteTask, TaskInitialStateTypes } from "@/features/taskSlice";
import { AppDispatch, RootState } from "@/store/store";

interface ConfirmDeleteProps {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
  taskId: string;
}

const ConfirmDelete = ({
  setDialogOpen,
  dialogOpen,
  taskId,
}: ConfirmDeleteProps) => {
  const { deleteTaskLoading } = useSelector<RootState, TaskInitialStateTypes>(
    (state) => state.task
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteTask = async () => {
    if (deleteTaskLoading) return;
    // dispatch(deleteTaskSync(task.id));
    dispatch(deleteTask(taskId)).finally(() => {
      setDialogOpen(false);
    });
  };

  const getRightLabel = () => {
    if (deleteTaskLoading) {
      return "Deleting...";
    } else {
      return "Delete task";
    }
  };
  const label = getRightLabel();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="w-0 h-0 p-0 opacity-0 pointer-events-none" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this task</DialogTitle>
          <DialogDescription>
            This will delete this task including the subtasks permanently.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-5 justify-center items-center">
          <Button
            onClick={() => setDialogOpen(false)}
            className="bg-transparent px-0 border-b-2 text-primary
           rounded-none border-b-primary hover:bg-transparent
            outline-none h-8"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="h-8"
            onClick={handleDeleteTask}
          >
            {label}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
