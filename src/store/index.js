import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/slice";
import productFullReducer from "./productFullPage/slice";
import seenReducer from "./seen/slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    fullProduct: productFullReducer,
    seen: seenReducer,
  },
});

export default store;
