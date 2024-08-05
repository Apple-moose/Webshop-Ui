import React, { useState } from "react";
import "../style/global.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../store/auth/actions";
import SignupPage from "./SignupPage.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(Login(email, password, navigate));
  }

  return (
    <>
      <main>
        <h1>&nbsp;</h1>
        <div class="container">
          <div class="row">
            <div
              class="col-6"
              style={{ textAlign: "left", fontSize: "1.3rem" }}
            >
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                <p>
                  <label>
                    Email:{" "}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </p>
                <p>
                  <label>
                    Password:{" "}
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </p>
                <p>
                  <button type="submit" className="buttonLogin">
                    Login
                  </button>
                </p>
              </form>
            </div>
            <div
              class="col-6"
              style={{ textAlign: "end", fontSize: "1.3rem" }}
            >
              <SignupPage />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
