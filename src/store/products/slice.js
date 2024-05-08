import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    productsFetched: (state, action) => {
      console.log("products Fetched : ", action);
      state.products = [...state.products, ...action.payload];
      state.loading = false;
    },
  },
});

export const { startLoading, productsFetched } = productsSlice.actions;

export default productsSlice.reducer;
