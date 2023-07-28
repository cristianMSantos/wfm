import api from "../../../axios";
import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchTableDatas = createAsyncThunk(
  "relatorios/fetchTableDatas",
  async (payload) => {
    const options = {
      url: `relatoriosDap/getRelatoriosDap`,
      method: "POST",
      data: payload[0],
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: payload[1].token ? `Bearer ${payload[1].token}` : "",
      },
    };

    const response = await api(options);
    return response.data;
  }
);

export const relatorios = createSlice({
  name: "relatorios",
  initialState: {
    dataReport: []
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableDatas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTableDatas.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.dataReport = payload;
      })
      .addCase(fetchTableDatas.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export default relatorios.reducer;
