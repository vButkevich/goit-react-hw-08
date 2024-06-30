import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

// auth: {
//   user: {
//     name: null,
//     email: null,
//   },
//   token: null,
// },

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      // registration ---------------------------------
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      // login ---------------------------------
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      // logout ---------------------------------
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
      })
      // refreshUser ---------------------------------
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.token = null;
        state.isRefreshing = false;
      });
    // refreshUser ---------------------------------
  },
});

//export default authSlice.reducer;
export const authReducer = authSlice.reducer;
