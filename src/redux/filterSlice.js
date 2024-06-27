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

export const { changeFilterQuery } = filterSlice.actions;
export const selectFilterQuery = (state) => state.filter.query;
export const filterReducer = filterSlice.reducer;
