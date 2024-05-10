import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/slice";
import productFullReducer from "./productFullPage/slice";
import userReducer from "./user/slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    fullProduct: productFullReducer,
    user: userReducer,
  },
});

export default store;
