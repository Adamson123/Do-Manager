import { RawUserTypes, SubtaskCompletionHistoryTypes } from "@/types/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialUserInfoState: RawUserTypes = {
  createdAt: "",
  email: "",
  id: "",
  image: "",
  name: "",
  updatedAt: "",
  password: "",
  hasPassword: false,
  subtaskCompletionHistory: [],
  dailyAiQuota: {
    id: "",
    day: "",
    remainingChance: 0,
    userId: "",
  },
};

const initialState = {
  userInfo: initialUserInfoState,
  getUserLoading: true,
  editUserLoading: false,
  deleteUserLoading: false,
  error: "",
};

export type UserInitialState = typeof initialState;

const userSlice = createSlice({
  name: "user",
  initialState,
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

        const alreadyExist = subtaskCompletionHistory.find(
          (subtaskHistory) =>
            subtaskHistory.id === subtaskCompletionHistoryUpdate.id ||
            subtaskHistory.day === subtaskCompletionHistoryUpdate.day
        );

        if (!alreadyExist) {
          subtaskCompletionHistory = [
            ...subtaskCompletionHistory,
            subtaskCompletionHistoryUpdate,
          ];
        } else {
          subtaskCompletionHistory = subtaskCompletionHistory.map(
            (subtaskHistory) =>
              subtaskHistory.id === subtaskCompletionHistoryUpdate.id ||
              subtaskHistory.day === subtaskCompletionHistoryUpdate.day
                ? subtaskCompletionHistoryUpdate
                : subtaskHistory
          );
        }

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

export const { updateUser, updateGetUserLoading } = userSlice.actions;
export default userSlice.reducer;
