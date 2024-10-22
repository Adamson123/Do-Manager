import { activeTask } from "@/features/subtaskSlice";
import { AppDispatch, RootState } from "@/store/store";
import { RawTaskTypes } from "@/types/taskTypes";
import { ThunkDispatch } from "@reduxjs/toolkit";

const setActiveTask = (task: RawTaskTypes, dispatch: any) => {
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
};

export default setActiveTask;
