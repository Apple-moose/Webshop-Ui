import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import UserCartPage from "./pages/UserCartPage";
import Toolbar from "./components/Toolbar";
import BuyPage from "./pages/BuyPage";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/products/actions";
import { bootstrapUser } from "./store/user/slice";

// import { bootstrapLogInState } from "./store/auth/actions";
// import { bootstrapNewLogInState } from "./store/signup/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts);
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(bootstrapLogInState());
  //   dispatch(bootstrapNewLogInState());
  // }, [dispatch]);

  return (
    <div>
      <Toolbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Cart" element={<UserCartPage />} />
        <Route path="/Buy" element={<BuyPage />} />
      </Routes>
    </div>
  );
}

export default App;
