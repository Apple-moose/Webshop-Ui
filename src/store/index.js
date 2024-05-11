import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/slice";
import productFullReducer from "./productFullPage/slice";
import userReducer from "./user/slice";
import bankReducer from "./bank/slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    fullProduct: productFullReducer,
    user: userReducer,
    bank: bankReducer
  },
});

export default store;
