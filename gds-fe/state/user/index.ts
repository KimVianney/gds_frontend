import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../types/User";

interface UserState {
  profile?: User;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    removeProfile: (state) => {
      state.profile = undefined;
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const { setProfile, removeProfile, updateProfile } = userSlice.actions;
export default userSlice.reducer;
