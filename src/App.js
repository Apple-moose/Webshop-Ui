import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
// import PostPage from "./pages/PostPage";
// import LoginPage from "./pages/LoginPage";
import Toolbar from "./components/Toolbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { bootstrapLogInState } from "./store/auth/actions";
// import { bootstrapNewLogInState } from "./store/signup/actions";
// import UserPostPage from "./pages/UserPostPage";

function App() {
  // const dispatch = useDispatch();

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
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/newPost" element={<UserPostPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
