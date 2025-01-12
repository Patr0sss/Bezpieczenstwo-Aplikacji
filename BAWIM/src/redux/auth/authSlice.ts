import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userLogin, userLogout } from "./authActions";

const isLoggedIn = localStorage.getItem("token") ? true : false;

export interface AuthState {
  loading: boolean;
  userInfo: {
    username: string;
  };
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  userInfo: { username: "" },
  isLoggedIn,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          state.loading = false;
          state.userInfo = action.payload.userInfo;
          state.isLoggedIn = true;
          state.error = "";
        }
      )
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.error = "Wprowadzono Błędne Dane";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = action.payload.loading;
        state.userInfo = action.payload.userInfo;
        state.isLoggedIn = false;
        state.error = action.payload.error;
      });
  },
});

export default authSlice.reducer;
