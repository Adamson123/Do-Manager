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
import useSetActiveTask from "@/hooks/useSetActiveTask";

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
  const deleteTaskLoading = useSelector<RootState, boolean>(
    (state) => state.task.deleteTaskLoading
  );
  const activeTaskId = useSelector<RootState, string>(
    (state) => state.subtask.taskId
  );

  const dispatch = useDispatch<AppDispatch>();
  const setActiveTask = useSetActiveTask();
  const handleDeleteTask = async () => {
    if (deleteTaskLoading) return;
    // dispatch(deleteTaskSync(task.id));
    dispatch(deleteTask(taskId)).then(() => {
      if (taskId === activeTaskId)
        setActiveTask({
          subtasks: [],
          createdAt: new Date(),
          description: "",
          id: "",
          priority: "",
          title: "",
          updatedAt: new Date(),
          userId: "",
        });
      setDialogOpen(false);
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="w-0 h-0 p-0 opacity-0 pointer-events-none" />
      <DialogContent
        className="sm:max-w-[425px] text-center z-[100]"
        overlayZindex="z-[100]"
      >
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
            {deleteTaskLoading ? "Deleting..." : "Delete task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
