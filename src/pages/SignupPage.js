import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Signup } from "../store/signup/actions";

export default function SignupPage() {
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [signFirstName, setSignFirstName] = useState("");
  const [signLastName, setSignLastName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNewUser(event) {
    event.preventDefault();
    dispatch(Signup(signFirstName, signLastName, signEmail, 
    signPassword, imageUrl, navigate));
  }

  return (
    <>
      <div className="loginTxt">
        <h1>... or Signup?</h1>
        <form onSubmit={handleNewUser}>
          <p>
            <label>
              First Name:{" "}
              <input
                type="first name"
                value={signFirstName}
                onChange={(e) => setSignFirstName(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Last Name:{" "}
              <input
                type="last name"
                value={signLastName}
                onChange={(e) => setSignLastName(e.target.value)}
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
            <label>
              Image Url:{" "}
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
          </p>
          <p>
            <button type="submit" className="buttonLogin">
              Signup
            </button>
          </p>
        </form>
      </div>
    </>
  );
}
