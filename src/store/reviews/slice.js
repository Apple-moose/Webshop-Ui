import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  reviews: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.reviews = [];
      state.loading = true;
    },
    reviewsFetched: (state, action) => {
      state.reviews = [...state.reviews, ...action.payload];
      state.loading = false;
    },
  },
});

export const { startLoading, reviewsFetched } = reviewsSlice.actions;

export default reviewsSlice.reducer;
