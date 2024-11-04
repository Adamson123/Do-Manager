import { ActionType } from "@/components/Home/Tasks/CreateTask";
import { useState } from "react";

const useCreateTask = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [action, setAction] = useState<ActionType>({
    exec: "create",
    task: { title: "", description: "", priority: "HIGH" },
    id: "",
  });

  // To trigger task creation
  const triggerCreateTask = () => {
    setAction({
      exec: "create",
      task: { title: "", description: "", priority: "HIGH" },
      id: "",
    });
    setCreateDialogOpen(true);
  };

  return {
    createDialogOpen,
    setCreateDialogOpen,
    action,
    setAction,
    triggerCreateTask,
  };
};

export default useCreateTask;
