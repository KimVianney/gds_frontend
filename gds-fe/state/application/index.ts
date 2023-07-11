import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Popup } from "../../types/PopUp";

export interface ApplicationState {
  readonly popupList: Popup[];
}

const initialState: ApplicationState = {
  popupList: [],
};

const popUpSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    addPopup: (
      state,
      {
        payload: { content, key },
      }: PayloadAction<Omit<Popup, "key" | "show"> & { key?: string }>
    ) => {
      // const isPopupPresent = state.popupList.some(
      //   (popup) => popup.content.summary === content.summary
      // );

      // if (!isPopupPresent) {
      state.popupList.push({
        key: key || nanoid(),
        show: true,
        content,
      });
      // }
    },
    removePopup: (state, { payload: key }: PayloadAction<string>) => {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false;
        }
      });
    },
  },
});

export const { addPopup, removePopup } = popUpSlice.actions;
export default popUpSlice.reducer;
