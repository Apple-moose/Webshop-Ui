import axios from "axios";
import { startLoading, getToken, userLoggedIn } from "./slice";
import { userLogOut } from "../auth/slice";

const API_URL = `http://localhost:4000`;

export function Signup(signEmail, signPassword, signName, navigate) {
  return function thunk(dispatch, getState) {
    dispatch(startLoading());
    axios
      .post(API_URL + "/auth/signup", {
        email: signEmail,
        password: signPassword,
        firstName: signName,
      })
      .then((data) => {
        const token = data.data.token;
        console.log("token received:", token);
        dispatch(getToken(token));
        dispatch(userLogOut());
      })
      .catch((err) => console.log("New User Login Error", err));

    const tokenReceived = getState().signup.accessToken;
    localStorage.setItem("tokenNew", tokenReceived);
    console.log("tokenNew is: ", localStorage.tokenNew);

    axios
      .get(API_URL + "/auth/me", {
        headers: { Authorization: `Bearer ${tokenReceived} ` },
      })
      .then((data) => {
        const userName = data.data.firstName;
        console.log(userName);
        dispatch(startLoading());
        dispatch(userLoggedIn(userName));
        navigate("/");
      })
      .catch((err) => console.log("err", err));
  };
}

export const bootstrapNewLogInState = () => async (dispatch) => {
  const tokenFromStorage = localStorage.getItem("tokenNew");

  if (!tokenFromStorage) return;

  axios
    .get("https://coders-network-api.onrender.com/me", {
      headers: { Authorization: `Bearer ${tokenFromStorage} ` },
    })
    .then((data) => {
      const userName = data.data.firstName;
      dispatch(userLoggedIn(userName));
    })
    .catch((err) => console.log("err", err));
};
