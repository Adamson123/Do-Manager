import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import taskServices from "@/services/taskServices";
import { RawTaskTypes, TaskTypes } from "@/types/taskTypes";
import { RawSubtaskTypes } from "@/types/subtaskTypes";
import { toast } from "@/components/ui/hooks/use-toast";
//import delayTest from "@/utils/delayTest";

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
  async (task: TaskTypes, { rejectWithValue }) => {
    try {
      const response = await taskServices.createTask(task);
      toast({
        title: "Task create successfully",
        description: "Operation completed sucessfully",
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
//delete a task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await taskServices.deleteTask(id);
      toast({
        title: "Task deleted",
        description: "Operation completed sucessfully",
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
//edit a task
export const editTask = createAsyncThunk(
  "task/editTask",
  async (
    {
      task,
      id,
    }: {
      task: TaskTypes;
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await taskServices.editTask(task, id);
      toast({
        title: "Task updated",
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
//get multiple tasks
export const getMultipleTasks = createAsyncThunk(
  "task/getMultipleTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskServices.getMultipleTasks();
      //toast: ({}) => void
      return response;
    } catch (err) {
      const error = err as any;
      toast({
        title: error.errMsg,
        variant: "destructive",
      });
      return rejectWithValue(error.errMsg);
    }
  }
);

const rejectionFunc = (
  state: TaskInitialStateTypes,
  action: any,
  loadingField: string
) => {
  state[loadingField] = false;
  state.error = action.payload || "Unknown error occurred";
};

// const fulfilledFunc = (
//   state: TaskInitialStateTypes,
//   action: any,
//   loadingField: string
// ) => {
//   state[loadingField] = false;
//   state.tasks = action.payload;
//   state.error = "";
// };

const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: (builder) => {
    //loading
    builder
      //loading for create Task
      .addCase(createTask.pending, (state) => {
        state.createTaskLoading = true;
      })
      //loading for delete Task
      .addCase(deleteTask.pending, (state) => {
        state.deleteTaskLoading = true;
      })
      //loading for edit Task
      .addCase(editTask.pending, (state) => {
        state.editTaskLoading = true;
      })
      //loading for getting multiple Tasks
      .addCase(getMultipleTasks.pending, (state) => {
        state.getMultipleTaskLoading = true;
      });
    //fulfilled
    builder
      //fulfilled for create Task
      .addCase(
        createTask.fulfilled,
        (state, action: PayloadAction<RawTaskTypes>) => {
          state.createTaskLoading = false;
          //state.tasks = [...state.tasks, action.payload];
          state.tasks.push({ ...action.payload, subtasks: [] });
          state.error = "";
        }
      )
      //fulfilled for delete Task
      .addCase(
        deleteTask.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.deleteTaskLoading = false;
          state.tasks = state.tasks.filter(
            (task) => task.id !== action.payload.id
          );
          state.error = "";
        }
      )
      //fulfilled for edit Task
      .addCase(
        editTask.fulfilled,
        (state, action: PayloadAction<RawTaskTypes>) => {
          // fulfilledFunc(state, action, "editTaskLoading");
          state.editTaskLoading = false;
          state.tasks = state.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
          );
          state.error = "";
        }
      )
      //fulfilled for gettting multiple Tasks
      .addCase(
        getMultipleTasks.fulfilled,
        (state, action: PayloadAction<RawTaskTypes[]>) => {
          //fulfilledFunc(state, action, "getMultipleTaskLoading");
          state.getMultipleTaskLoading = false;
          state.tasks = action.payload;
          state.error = "";
        }
      );

    //error
    builder
      //error for create task
      .addCase(
        createTask.rejected,
        (state, action: ReturnType<typeof createTask.rejected>) => {
          rejectionFunc(state, action, "createTaskLoading");
        }
      )
      //error for delete task
      .addCase(
        deleteTask.rejected,
        (state, action: ReturnType<typeof deleteTask.rejected>) => {
          rejectionFunc(state, action, "deleteTaskLoading");
        }
      )
      //error for edit task
      .addCase(
        editTask.rejected,
        (state, action: ReturnType<typeof editTask.rejected>) => {
          rejectionFunc(state, action, "editTaskLoading");
        }
      )
      //error for getting multiple tasks
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
    // editTaskSync: (
    //   state,
    //   action: PayloadAction<{ task: TaskTypes; id: string }>
    // ) => {
    //   const { description, priority, title } = action.payload.task;
    //   state.tasks = state.tasks.map((task) => {
    //     return task.id === action.payload.id
    //       ? { ...task, description, priority, title }
    //       : task;
    //   });
    // },
    //called to update subtask state in a particular task
    addSubstask: (
      state,
      action: PayloadAction<{ subtask: RawSubtaskTypes; id: string }>
    ) => {
      state.tasks = state.tasks.map((task) => {
        const subtasks = task.subtasks?.length
          ? [...task.subtasks, action.payload.subtask]
          : [action.payload.subtask];
        //
        return task.id === action.payload.id ? { ...task, subtasks } : task;
      });
    },
    updateSubstask: (
      state,
      action: PayloadAction<{ subtask: RawSubtaskTypes; taskId: string }>
    ) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.taskId) {
          const { subtask: updatedSubtask } = action.payload;
          //mapping updatedSubtask to subtask with the matching id
          const updatedTask = task.subtasks.map((subtask) =>
            subtask.id === updatedSubtask.id ? updatedSubtask : subtask
          );
          return { ...task, subtasks: updatedTask };
        } else {
          return task;
        }
      });
    },
    removeSubtask: (
      state,
      action: PayloadAction<{ id: string; taskId: string }>
    ) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.taskId) {
          const { id } = action.payload;
          //removing the deleted subtask with the matching id from task
          const updatedTask = task.subtasks.filter(
            (subtask) => subtask.id !== id
          );
          return { ...task, subtasks: updatedTask };
        } else {
          return task;
        }
      });
    },
  },
});

export const { deleteTaskSync, addSubstask, updateSubstask, removeSubtask } =
  taskSlice.actions;
export default taskSlice.reducer;
