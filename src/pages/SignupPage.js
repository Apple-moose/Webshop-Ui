import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Signup } from "../store/signup/actions";

export default function SignupPage() {
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [signName, setSignName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNewUser(event) {
    event.preventDefault();
    dispatch(Signup(signEmail, signPassword, signName, navigate));
  }

  return (
    <>
      <div>
        <h1>... or Signup?</h1>
        <form onSubmit={handleNewUser}>
          <p>
            <label>
              Name:{" "}
              <input
                type="name"
                value={signName}
                onChange={(e) => setSignName(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Email:{" "}
              <input
                type="email"
                value={signEmail}
                onChange={(e) => setSignEmail(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              New Password:{" "}
              <input
                type="password"
                value={signPassword}
                onChange={(e) => setSignPassword(e.target.value)}
              />
            </label>
          </p>
          <p>
            <button type="submit">Signup</button>
          </p>
        </form>
      </div>
    </>
  );
}
