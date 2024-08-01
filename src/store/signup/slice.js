
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  me: null,
  accessToken: null,
  loading: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    getToken: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload;
    },
    userLoggedIn: (state, action) => {
      state.loading = false;
      state.me = action.payload;
    },
    newUserLogOut: (state) => {
      localStorage.removeItem("tokenReceived");
      state.me = null;
      state.accessToken = null;
    },
  },
});

export const { startLoading, getToken, userLoggedIn, newUserLogOut } =
  signupSlice.actions;

export default signupSlice.reducer;
