import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "@/features/taskSlice";
import subtaskReducer from "@/features/subtaskSlice";
import userSlice from "@/features/userSlice";

const store = configureStore({
    reducer: {
        task: taskReducer,
        subtask: subtaskReducer,
        user: userSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
