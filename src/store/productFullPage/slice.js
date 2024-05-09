import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  product: [],
};

const productFullSlice = createSlice({
  name: "fullProduct",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    productFullFetched: (state, action) => {
      // console.log("product Fully Fetched : ", action.payload);
      state.product = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, productFullFetched } = productFullSlice.actions;

export default productFullSlice.reducer;
