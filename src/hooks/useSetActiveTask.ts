import { activeTask } from "@/features/subtaskSlice";
import { AppDispatch } from "@/store/store";
import { RawTaskTypes } from "@/types/taskTypes";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const useSetActiveTask = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    (task: RawTaskTypes) => {
      const { subtasks, createdAt, description, id, priority, title } = task;
      dispatch(
        activeTask({
          subtasks,
          taskCreatedAt: createdAt,
          taskDescription: description,
          taskId: id,
          taskPriority: priority,
          taskTitle: title,
        })
      );
    },
    [dispatch]
  );
};

export default useSetActiveTask;
