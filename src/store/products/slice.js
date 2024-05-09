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
      // console.log("products Fetched : ", action);
      state.products = [...state.products, ...action.payload];
      state.loading = false;
    },
    // productSeen: (state, action) => {
    //   const prodId = action.payload;
    //   const addSeen = () =>
    //     state.products.map((idP) => {
    //       if (idP.id === prodId) {
    //         return { ...idP, seen: idP.seen + 1 };
    //       } else {
    //         return idP;
    //       }
    //     });
    //   addSeen();
    //   console.log("new Array:", state.products);
    // },
  },
});

export const { startLoading, productsFetched } = productsSlice.actions;

export default productsSlice.reducer;
