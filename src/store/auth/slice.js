import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  me: null,
  userId: null,
  userData: [],
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
      // console.log(state.me);
    },
    getUserId: (state, action) => {
      state.userId = action.payload;
      // console.log(state.userId);
    },
    getUserData: (state, action) => {
      state.userData = action.payload;
      // console.log(state.userData);
    },
    userLogOut: (state) => {
      localStorage.removeItem("tokenReceived");
      state.me = null;
      state.userId = null;
      state.userData = [];
      state.accessToken = null;
    },
  },
});

export const { startLoading, getToken, getUserId, getUserData, userLoggedIn, userLogOut } =
  authSlice.actions;

export default authSlice.reducer;
