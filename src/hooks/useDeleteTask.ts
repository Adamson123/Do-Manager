"use client";

import { useCallback, useState } from "react";

const useDeleteTask = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskId, setTaskId] = useState("");

  const triggerDeleteTask = useCallback((taskId: string) => {
    setTaskId(taskId);
    setDeleteDialogOpen(true);
  }, []);

  return {
    deleteDialogOpen,
    setDeleteDialogOpen,
    taskId,
    setTaskId,
    triggerDeleteTask,
  };
};

export default useDeleteTask;
