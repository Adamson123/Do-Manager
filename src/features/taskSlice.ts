import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import taskServices from "@/services/taskServices";
import { RawTaskTypes, TaskTypes } from "@/types/taskTypes";
import { RawSubtaskTypes } from "@/types/subtaskTypes";

export interface TaskInitialStateTypes {
  //  loading: boolean;
  [key: string]: boolean | RawTaskTypes[] | string;
  tasks: RawTaskTypes[];
  error: string;
  getMultipleTaskLoading: boolean;
  createTaskLoading: boolean;
  deleteTaskLoading: boolean;
  editTaskLoading: boolean;
}

const initialState: TaskInitialStateTypes = {
  tasks: [],
  error: "",
  getMultipleTaskLoading: false,
  createTaskLoading: false,
  deleteTaskLoading: false,
  editTaskLoading: false,
};

//create a task
export const createTask = createAsyncThunk(
  "task/createTask",
  async (task: TaskTypes) => {
    try {
      const response = await taskServices.createTask(task);
      return response;
    } catch (error) {
      console.error(error);
      //return rejectWithValue(error);
    }
  }
);
//delete a task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: string) => {
    try {
      const response = await taskServices.deleteTask(id);
      return response;
    } catch (error) {
      console.error(error);
      //return rejectWithValue(error);
    }
  }
);
//edit a task
export const editTask = createAsyncThunk(
  "task/editTask",
  async ({ task, id }: { task: TaskTypes; id: string }) => {
    try {
      const response = await taskServices.editTask(task, id);
      return response;
    } catch (error) {
      console.error(error);
      //return rejectWithValue(error);
    }
  }
);
//get multiple tasks
export const getMultipleTasks = createAsyncThunk(
  "task/getMultipleTasks",
  async () => {
    try {
      const response = await taskServices.getMultipleTasks();
      return response;
    } catch (error) {
      console.error(error);
      //return rejectWithValue(error);
    }
  }
);

const rejectionFunc = (
  state: TaskInitialStateTypes,
  action: any,
  loadingField: string
) => {
  state[loadingField] = false;
  state.error = action.error.message || "Unknown error occurred";
};

const fulfilledFunc = (
  state: TaskInitialStateTypes,
  action: any,
  loadingField: string
) => {
  state[loadingField] = false;
  state.tasks = action.payload;
  state.error = "";
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: (builder) => {
    //loading
    builder
      .addCase(createTask.pending, (state) => {
        state.createTaskLoading = true;
      })
      .addCase(deleteTask.pending, (state) => {
        state.deleteTaskLoading = true;
      })
      .addCase(editTask.pending, (state) => {
        state.editTaskLoading = true;
      })
      .addCase(getMultipleTasks.pending, (state) => {
        state.getMultipleTaskLoading = true;
      });
    // tasks update
    builder
      .addCase(
        createTask.fulfilled,
        (state, action: PayloadAction<RawTaskTypes>) => {
          state.createTaskLoading = false;
          state.tasks = [...state.tasks, action.payload];
          state.error = "";
        }
      )
      .addCase(
        deleteTask.fulfilled,
        (state, action: PayloadAction<RawTaskTypes[]>) => {
          fulfilledFunc(state, action, "deleteTaskLoading");
        }
      )
      .addCase(
        editTask.fulfilled,
        (state, action: PayloadAction<RawTaskTypes[]>) => {
          fulfilledFunc(state, action, "editTaskLoading");
        }
      )
      .addCase(
        getMultipleTasks.fulfilled,
        (state, action: PayloadAction<RawTaskTypes[]>) => {
          fulfilledFunc(state, action, "getMultipleTaskLoading");
        }
      );

    //error
    builder
      .addCase(
        createTask.rejected,
        (state, action: ReturnType<typeof createTask.rejected>) => {
          rejectionFunc(state, action, "createTaskLoading");
        }
      )
      .addCase(
        deleteTask.rejected,
        (state, action: ReturnType<typeof deleteTask.rejected>) => {
          rejectionFunc(state, action, "deleteTaskLoading");
        }
      )
      .addCase(
        editTask.rejected,
        (state, action: ReturnType<typeof editTask.rejected>) => {
          rejectionFunc(state, action, "editTaskLoading");
        }
      )
      .addCase(
        getMultipleTasks.rejected,
        (state, action: ReturnType<typeof getMultipleTasks.rejected>) => {
          rejectionFunc(state, action, "getMultipleTaskLoading");
        }
      );
  },
  reducers: {
    deleteTaskSync: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => {
        return task.id !== action.payload;
      });
    },
    editTaskSync: (
      state,
      action: PayloadAction<{ task: TaskTypes; id: string }>
    ) => {
      const { description, priority, title } = action.payload.task;
      state.tasks = state.tasks.map((task) => {
        return task.id === action.payload.id
          ? { ...task, description, priority, title }
          : task;
      });
    },
    updateSubstask: (
      state,
      action: PayloadAction<{ subtasks: RawSubtaskTypes[]; id: string }>
    ) => {
      const subtasks = action.payload.subtasks;
      state.tasks = state.tasks.map((task) => {
        return task.id === action.payload.id ? { ...task, subtasks } : task;
      });
    },
  },
});

export const { deleteTaskSync, editTaskSync, updateSubstask } =
  taskSlice.actions;
export default taskSlice.reducer;
