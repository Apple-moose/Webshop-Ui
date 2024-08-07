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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/products/actions";
import { bootstrapLogInState } from "./store/auth/actions";
// import { bootstrapUser } from "./store/user/slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts);
    dispatch(bootstrapLogInState());
  }, [dispatch]);

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
