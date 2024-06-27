import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { query: "" },
  reducers: {
    changeFilterQuery: (state, { payload }) => {
      state.query = payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { changeFilterQuery } = filterSlice.actions;
