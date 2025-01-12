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
      localStorage.setItem("username", username);
      localStorage.setItem("userId", JSON.stringify(202));
      return {
        loading: false,
        userInfo: { username, id: 202 },
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
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
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
