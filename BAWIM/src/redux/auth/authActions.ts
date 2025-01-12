import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.log(password);
      localStorage.setItem("token", "token");
      return {
        loading: false,
        userInfo: { username },
        isLoggedIn: true,
        error: "",
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      return {
        loading: false,
        userInfo: { username: "" },
        error: "",
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
);
