import subtaskServices from "@/services/subtaskServices";
import {
  EditableSubtaskFieldTypes,
  RawSubtaskTypes,
  SubtaskTypes,
} from "@/types/subtaskTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSubstask, removeSubtask, updateSubstask } from "./taskSlice";
import { toast } from "@/components/ui/hooks/use-toast";

export interface SubtaskInitialStateTypes {
  //[key: string]: boolean | RawSubtaskTypes[] | string | Date;
  subtasks: RawSubtaskTypes[];
  error: string;
  createSubtaskLoading: boolean;
  deleteSubtaskLoading: boolean;
  editSubtaskLoading: boolean;
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskPriority: string;
  taskCreatedAt: Date | string;
}

// interface ActiveTask {
//   taskId: string;
//   taskDescription: string;
//   taskPriority: string;
//   taskCreatedAt: Date;
//   subtasks: RawSubtaskTypes[];
//   taskTitle: string;
// }

type ActiveTask = Omit<
  SubtaskInitialStateTypes,
  | "error"
  | "createSubtaskLoading"
  | "deleteSubtaskLoading"
  | "editSubtaskLoading"
>;

const date = new Date();

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
  taskCreatedAt: date.toDateString(),
};

//create a subtask
export const createSubtask = createAsyncThunk(
  "subtask/createSubtask",
  async (subtask: SubtaskTypes, { dispatch, rejectWithValue }) => {
    try {
      const response = await subtaskServices.createSubtask(subtask);
      dispatch(addSubstask({ id: response.taskId, subtask: response }));
      toast({
        title: "Subtask Created",
        description: "Operation completed successfully",
      });
      return response;
    } catch (err) {
      const error = err as any;
      toast({
        title: error.errMsg,
        description: "Operation completed with an error",
        variant: "destructive",
      });
      return rejectWithValue(error.errMsg);
    }
  }
);

//edit a subtask
export const editSubtask = createAsyncThunk(
  "subtask/editSubtask",
  async (
    {
      subtask,
      id,
    }: {
      subtask: EditableSubtaskFieldTypes;
      id: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await subtaskServices.editSubtask(subtask, id);
      dispatch(updateSubstask({ taskId: response.taskId, subtask: response }));
      //we don't want to display toast when task is updated
      if (!subtask.hideToast)
        toast({
          title: "Subtask Updated",
          description: "Operation completed successfully",
        });
      return response;
    } catch (err) {
      const error = err as any;
      toast({
        title: error.errMsg,
        description: "Operation completed with an error",
        variant: "destructive",
      });

      return rejectWithValue(error.errMsg);
    }
  }
);

//delete a subtask
export const deleteSubtask = createAsyncThunk(
  "task/deleteSubtask",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await subtaskServices.deleteSubtask(id);
      dispatch(removeSubtask(response));
      return response;
    } catch (err) {
      const error = err as any;
      toast({
        title: error.errMsg,
        description: "Operation completed with an error",
        variant: "destructive",
      });
      return rejectWithValue(error.errMsg);
    }
  }
);

const subtaskSlice = createSlice({
  name: "subtask",
  initialState,
  extraReducers: (builder) => {
    //loading
    builder
      //loading for create subtask
      .addCase(createSubtask.pending, (state) => {
        state.createSubtaskLoading = true;
      })
      //loading for edit subtask
      .addCase(editSubtask.pending, (state) => {
        state.editSubtaskLoading = true;
      })
      //loading for delete subtask
      .addCase(deleteSubtask.pending, (state) => {
        state.deleteSubtaskLoading = true;
      });

    //fulfilled
    builder
      //fulfilled for create subtask
      .addCase(createSubtask.fulfilled, (state) => {
        state.createSubtaskLoading = false;
      })
      //fulfilled for edit subtask
      .addCase(editSubtask.fulfilled, (state) => {
        state.editSubtaskLoading = false;
      }) //fulfilled for delete subtask
      .addCase(deleteSubtask.fulfilled, (state) => {
        state.deleteSubtaskLoading = false;
      });
    //error
    builder
      //error for create subtask
      .addCase(
        createSubtask.rejected,
        (state, action: ReturnType<typeof createSubtask.rejected>) => {
          state.createSubtaskLoading = false;
          state.error = action.error.message || "Unknown error occurred";
        }
      )
      //error for edit subtask
      .addCase(
        editSubtask.rejected,
        (state, action: ReturnType<typeof editSubtask.rejected>) => {
          state.editSubtaskLoading = false;
          state.error = action.error.message || "Unknown error occurred";
        }
      ) //error for delete subtask
      .addCase(
        deleteSubtask.rejected,
        (state, action: ReturnType<typeof deleteSubtask.rejected>) => {
          state.deleteSubtaskLoading = false;
          state.error = action.error.message || "Unknown error occurred";
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
