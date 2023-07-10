import { createSlice } from "@reduxjs/toolkit";

export const relatorios = createSlice({
  name: "relatorios",
  initialState: {
    dataReport: []
  },
  reducers: {
    setRelatorios: (state, { payload }) => {
        console.log('payl: ' + payload)
      if (payload) {
        state.dataReport = payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRelatorios } = relatorios.actions;

export default relatorios.reducer;
