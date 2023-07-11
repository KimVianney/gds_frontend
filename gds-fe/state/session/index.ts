import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ISession from "../../types/ISession";

const initialState: ISession = { status: "loading" };

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<ISession>) => {
      state.data = action.payload.data;
      state.status = action.payload.status;
    },
    removeSession: (state) => {
      state.data = undefined;
      state.status = "unauthenticated";
    },
    updateSession: (state, action: PayloadAction<Partial<ISession>>) => {
      state.data = { ...state.data, ...action.payload.data };
      state.status = action.payload.status || state.status;
    },
  },
});

export const { setSession, removeSession, updateSession } =
  sessionSlice.actions;
export default sessionSlice.reducer;
