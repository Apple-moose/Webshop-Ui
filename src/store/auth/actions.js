import axios from "axios";
import { startLoading, getToken, userLoggedIn } from "./slice";
import { newUserLogOut } from "../signup/slice";

const API_URL = `http://localhost:4000`;

export function Login(email, password, navigate) {
  return async function thunk(dispatch, getState) {
    //default is tessa@techmongers.nl password:123
    dispatch(startLoading());
    await axios
      .post(API_URL + "/auth/login", {
        email: email,
        password: password,
      })
      .then((data) => {
        const token = data.data.token;
        console.log("token from login?:", data.data.token);
        dispatch(getToken(token));
        dispatch(newUserLogOut());
      })
      .catch((err) => console.log("Login Error", err));

    const tokenReceived = getState().auth.accessToken;
    localStorage.setItem("tokenReceived", tokenReceived);
    console.log("from auth actions:", tokenReceived);
    axios
      .get(API_URL + "/auth/me", {
        headers: { Authorization: `Bearer ${tokenReceived} ` },
      })
      .then((data) => {
        const userName = data.data.firstName;
        dispatch(startLoading());
        dispatch(userLoggedIn(userName));
        //???for some reason call useNavigate on the loginPage???
        navigate("/");
      })
      .catch((err) => console.log("err", err));
  };
}

export const bootstrapLogInState = () => async (dispatch) => {
  const tokenFromStorage = localStorage.getItem("tokenReceived");

  if (!tokenFromStorage) return;

  await axios
    .get(API_URL + "/auth/me", {
      headers: { Authorization: `Bearer ${tokenFromStorage} ` },
    })
    .then((data) => {
      const userName = data.data.firstName;
      dispatch(userLoggedIn(userName));
    })
    .catch((err) => console.log("err", err));
};
