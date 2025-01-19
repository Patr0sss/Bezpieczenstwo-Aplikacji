import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersState } from "./usersSlice";

export const getUsers = createAsyncThunk<UsersState>(
  "users/get",
  async (
    _,{ rejectWithValue }
  ) => {
    try {
      const response = await fetch ("http://localhost:3000/users/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "jwt_token": `${localStorage.getItem("token")}`,
        },
        
      });
      if(response.status === 200) {
      const data = await response.json();
      console.log(data);
    return {
        loading: false,
        users: data,
        error: "",
    }
      } else {
        return rejectWithValue("Error while fetching users");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);