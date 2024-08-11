import "../style/global.scss";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
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
        <div class="container" className="mt-5 ms-5 me-4">
          <div class="row">
            <div
              class="col-6"
              style={{ textAlign: "left", fontSize: "1.8rem" }}
            >
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                <p>
                  <label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email:{" "}
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
                  <Button
                    type="submit"
                    variant="warning"
                    className="fs-4 fw-bold fst-italic"
                  >
                    Send Login data
                  </Button>
                </p>
              </form>
            </div>
            <div class="col-6" style={{ textAlign: "end", fontSize: "1.8rem" }}>
              <SignupPage />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
