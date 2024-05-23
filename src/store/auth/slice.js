import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  me: null,
  accessToken: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
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
      console.log("userLoggedIn payload:", action.payload);
    },
    userLogOut: (state) => {
      localStorage.removeItem("tokenReceived");
      state.me = null;
      state.accessToken = null;
      console.log(localStorage);
    },
  },
});

export const { startLoading, getToken, userLoggedIn, userLogOut } =
  authSlice.actions;

export default authSlice.reducer;
