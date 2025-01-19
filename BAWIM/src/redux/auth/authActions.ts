import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "./authSlice";

export const userLogin = createAsyncThunk<AuthState, { username: string; password: string }>(
  "auth/login",
  async (
    { username, password },{ rejectWithValue }
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

      sessionStorage.setItem("token", data.jwtToken);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("userId", data.user_id);
      const id = parseInt(data.user_id);
      return {
        loading: false,
        userInfo: { username : data.username, id  },
        isLoggedIn: true,
        error: "",
      };
      } else {
        return rejectWithValue("Invalid credentials");
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
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("userId");
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
