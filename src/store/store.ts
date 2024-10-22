import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "@/features/taskSlice";
import subtaskReducer from "@/features/subtaskSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    subtask: subtaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
