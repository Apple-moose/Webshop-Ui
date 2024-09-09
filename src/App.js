import React from "react";
// import "./App.css";
import "./style/global.scss";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import UserCartPage from "./pages/UserCartPage";
import Toolbar from "./components/Toolbar";
import BuyPage from "./pages/BuyPage";
import LoginPage from "./pages/LoginPage";
import UserAccountPage from "./pages/UserAccountPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategory } from "./store/category/actions";
import { fetchProducts } from "./store/products/actions";
import { bootstrapLogInState } from "./store/auth/actions";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchProducts());
    dispatch(bootstrapLogInState());
  }, [dispatch]);

  return (
    <>
      <Toolbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Cart" element={<UserCartPage />} />
        <Route path="/Buy" element={<BuyPage />} />
        <Route path="/User/:id" element={<UserAccountPage />} />
      </Routes>
    </>
  );
}

export default App;
