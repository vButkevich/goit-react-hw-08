import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "https://connections-api.goit.global";
axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const setHeaderAuth = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearHeaderAuth = () => {
  delete axios.defaults.headers.common["Authorization"];
  // 1. axios.defaults.headers.common.Authorization = "";
  // 2. axios.defaults.headers.common['Authorization'] = '';
  // 3. delete axios.defaults.headers.common["Authorization"];
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", credentials);
      setHeaderAuth(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);
      setHeaderAuth(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearHeaderAuth();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// obsolete:[see refreshUser]
export const refreshCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    setHeaderAuth(persistedToken);

    try {
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      setHeaderAuth(auth.token);
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      clearHeaderAuth();
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.token) {
        return false;
      }
    },
  }
);
