import { toast } from "@/components/ui/hooks/use-toast";
import userServices from "@/services/userServices";
import { RawUserTypes, SubtaskCompletionHistoryTypes } from "@/types/userTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialUserInfoState: RawUserTypes = {
  createdAt: "",
  email: "",
  id: "",
  image: "",
  name: "",
  updatedAt: "",
  password: "",
  subtaskCompletionHistory: [],
};

const initialState = {
  userInfo: initialUserInfoState,
  getUserLoading: false,
  editUserLoading: false,
  deleteUserLoading: false,
  error: "",
};

export type UserInitialState = typeof initialState;

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userServices.getUser(id);
      return response;
    } catch (err) {
      const error = err as any;
      toast({
        title: error.errMsg || "Something went wrong",
        variant: "destructive",
      });
      return rejectWithValue(error.errMsg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    //loading
    builder.addCase(getUser.pending, (state) => {
      state.getUserLoading = true;
    }),
      //fulfilled
      builder.addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<RawUserTypes>) => {
          if (action.payload) state.userInfo = action.payload;
          state.getUserLoading = false;
        }
      ),
      //rejected
      builder.addCase(
        getUser.rejected,
        (state, action: ReturnType<typeof getUser.rejected>) => {
          state.error = (action.payload as string) || "Unknown error occurred";
          state.getUserLoading = false;
        }
      );
  },
  reducers: {
    updateUser: (
      state,
      action: PayloadAction<
        | Partial<RawUserTypes>
        | { subtaskCompletionHistory: SubtaskCompletionHistoryTypes }
      >
    ) => {
      const fieldsKey = Object.keys(action.payload);
      let subtaskCompletionHistory = state.userInfo.subtaskCompletionHistory;

      if (
        fieldsKey.length === 1 &&
        fieldsKey[0] === "subtaskCompletionHistory"
      ) {
        //target last obj type
        const subtaskCompletionHistoryUpdate: SubtaskCompletionHistoryTypes =
          action.payload
            .subtaskCompletionHistory as SubtaskCompletionHistoryTypes;

        subtaskCompletionHistory = subtaskCompletionHistory.map(
          (subtaskHistory) =>
            subtaskHistory.id === subtaskCompletionHistoryUpdate.id ||
            subtaskHistory.day === subtaskCompletionHistoryUpdate.day
              ? subtaskCompletionHistoryUpdate
              : subtaskHistory
        );
        state.userInfo = { ...state.userInfo, subtaskCompletionHistory };
      } else {
        state.userInfo = {
          ...state.userInfo,
          ...(action.payload as Partial<RawUserTypes>),
        };
      }
    },
    updateGetUserLoading: (state, action: PayloadAction<boolean>) => {
      state.getUserLoading = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
