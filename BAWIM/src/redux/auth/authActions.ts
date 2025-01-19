import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch ("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if(response.status === 200) {
      const data = await response.json();

      localStorage.setItem("token", data.jwtToken);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data.user_id);

      return {
        loading: false,
        userInfo: { username : data.username, id: data.user_id },
        isLoggedIn: true,
        error: "",
      };
    } 
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
