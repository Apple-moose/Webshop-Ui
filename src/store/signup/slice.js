import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  me: null,
  userId: null,
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
    stopLoading: (state) => {
      state.loading = false;
    },
    getToken: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload;
      localStorage.setItem("tokenReceived", state.accessToken);
    },
    userLoggedIn: (state, action) => {
      state.loading = false;
      state.me = action.payload;
    },
    getUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", state.userId);
    },
    newUserLogOut: (state) => {
      localStorage.removeItem("tokenReceived");
      state.me = null;
      state.accessToken = null;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  getToken,
  getUserId,
  userLoggedIn,
  newUserLogOut,
} = signupSlice.actions;

export default signupSlice.reducer;
