import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/slice";
import productFullReducer from "./productFullPage/slice";
import userReducer from "./user/slice";
import bankReducer from "./bank/slice";
import authReducer from "./auth/slice";
import signupReducer from "./signup/slice";
import reviewsReducer from "./reviews/slice";
import categoryReducer from "./category/slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    fullProduct: productFullReducer,
    category: categoryReducer,
    user: userReducer,
    bank: bankReducer,
    auth: authReducer,
    signup: signupReducer,
    reviews: reviewsReducer,
  },
});

export default store;
