import { createSlice } from "@reduxjs/toolkit";

export const sidebarControl = createSlice({
  name: "sidebarControl",
  initialState: {
    orientation: "vertical",
    appBar: "fixed",
  },
  reducers: {
    setOrientation: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      if (payload) {
        state.orientation = payload;
      }
    },
    setAppbar: (state, { payload }) => {
      if (payload) {
        state.appBar = payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrientation, setAppbar } = sidebarControl.actions;

export default sidebarControl.reducer;
