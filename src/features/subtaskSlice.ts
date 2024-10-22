import subtaskServices from "@/services/subtaskServices";
import { RawSubtaskTypes, SubtaskTypes } from "@/types/subtaskTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateSubstask } from "./taskSlice";

export interface SubtaskInitialStateTypes {
  [key: string]: boolean | RawSubtaskTypes[] | string | Date;
  subtasks: RawSubtaskTypes[];
  error: string;
  createSubtaskLoading: boolean;
  deleteSubtaskLoading: boolean;
  editSubtaskLoading: boolean;
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskPriority: string;
  taskCreatedAt: Date;
}

interface ActiveTask {
  taskId: string;
  taskDescription: string;
  taskPriority: string;
  taskCreatedAt: Date;
  subtasks: RawSubtaskTypes[];
  taskTitle: string;
}

const initialState: SubtaskInitialStateTypes = {
  subtasks: [],
  error: "",
  createSubtaskLoading: false,
  deleteSubtaskLoading: false,
  editSubtaskLoading: false,
  taskId: "",
  taskDescription: "",
  taskPriority: "",
  taskTitle: "",
  taskCreatedAt: new Date(),
};

//create a task
export const createSubtask = createAsyncThunk(
  "task/createSubtask",
  async (subtask: SubtaskTypes, { dispatch }) => {
    try {
      const response = await subtaskServices.createSubtask(subtask);
      console.log(response, "response klop");

      dispatch(updateSubstask({ id: response.taskId, subtasks: response }));
      return response;
    } catch (error) {
      console.error(error);
      //return rejectWithValue(error);
    }
  }
);

const subtaskSlice = createSlice({
  name: "subtask",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createSubtask.pending, (state) => {
        state.createSubtaskLoading = true;
      })
      .addCase(
        createSubtask.fulfilled,
        (state, action: PayloadAction<RawSubtaskTypes>) => {
          state.subtasks = [...state.subtasks, action.payload];
        }
      );
  },
  reducers: {
    activeTask: (state, action: PayloadAction<ActiveTask>) => {
      const {
        subtasks,
        taskId,
        taskTitle,
        taskDescription,
        taskCreatedAt,
        taskPriority,
      } = action.payload;
      state.subtasks = subtasks;
      state.taskId = taskId;
      state.taskTitle = taskTitle;
      state.taskDescription = taskDescription;
      state.taskCreatedAt = taskCreatedAt;
      state.taskPriority = taskPriority;
    },
  },
});

export const { activeTask } = subtaskSlice.actions;
export default subtaskSlice.reducer;
