import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.categories = [];
    },
    categoryFetched: (state, action) => {
      state.categories = [...state.categories, ...action.payload];
      state.loading = false;
    },
  },
});

export const { startLoading, categoryFetched } = categorySlice.actions;

export default categorySlice.reducer;
