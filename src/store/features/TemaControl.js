import { createSlice } from "@reduxjs/toolkit";
import { azul } from "../../tema";
export const temaControl = createSlice({
  name: "temaControl",
  initialState: {
    mode: localStorage.getItem("current-mode")
      ? JSON.parse(localStorage.getItem("current-mode"))
      : null,
    tema: localStorage.getItem("current-theme")
      ? JSON.parse(localStorage.getItem("current-theme"))
      : azul,
  },
  reducers: {
    setMode: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.

      state.mode = payload;
    },
    setTema: (state, { payload }) => {
      if (payload) {
        state.tema = payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMode, setTema } = temaControl.actions;

export default temaControl.reducer;
