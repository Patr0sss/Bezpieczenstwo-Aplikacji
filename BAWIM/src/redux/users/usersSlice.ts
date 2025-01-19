import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { friendType } from "../../types";
import { getUsers } from "./usersActions";


export interface UsersState {
    loading: boolean;
    users: friendType[];
    error: string | null;
  }
  
  const initialState: UsersState = {
    loading: false,
    users: [],
    error: null,
  };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.users = [];
        state.error = null;
        })
        .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<UsersState>) => {
            state.loading = false;
            state.users = action.payload.users;
            state.error = null;
        }
        )
        .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Wprowadzono Błędne Dane";
        });
    },
});

export default usersSlice.reducer;
    