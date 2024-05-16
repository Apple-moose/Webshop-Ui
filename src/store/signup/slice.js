
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
      console.log("userLoggedIn slice payload:", action.payload)
    },
    newUserLogOut: (state) => {
      localStorage.removeItem("tokenNew");
      state.me = null;
      state.accessToken = null;
    //   console.log(localStorage);
    },
  },
});

export const { startLoading, getToken, userLoggedIn, newUserLogOut } =
  signupSlice.actions;

export default signupSlice.reducer;
