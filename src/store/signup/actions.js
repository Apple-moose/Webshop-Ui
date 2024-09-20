import axios from "axios";
import { startLoading, getToken, userLoggedIn } from "./slice";

// const API_URL = `http://localhost:8000`;
const API_URL = `https://webshop-api-sr7l.onrender.com`;

export function Signup(
  signFirstName,
  signLastName,
  signEmail,
  signPassword,
  imageUrl,
  navigate
) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading());
    await axios
      .post(API_URL + "/auth/signup", {
        firstname: signFirstName,
        lastname: signLastName,
        email: signEmail,
        password: signPassword,
        imageUrl: imageUrl,
      })
      .catch((err) => console.log("New User Login Error", err));

    await axios
      .post(API_URL + "/auth/login", {
        email: signEmail,
        password: signPassword,
      })
      .then((data) => {
        const token = data.data.access_token;
        // console.log("data.data is: ", data.data);
        // console.log("token from login?:", data.data.access_token);
        dispatch(getToken(token));
        // dispatch(newUserLogOut());
      })
      .catch((err) => console.log("Login Error", err));

    const tokenReceived = getState().signup.accessToken;
    localStorage.setItem("tokenReceived", tokenReceived);
    // console.log("from auth actions:", tokenReceived);
    axios
      .get(API_URL + "/auth/me", {
        headers: { Authorization: `Bearer ${tokenReceived} ` },
      })
      .then((data) => {
        const userName = data.data.firstname;
        dispatch(startLoading());
        dispatch(userLoggedIn(userName));
        // console.log("localstorage:",localStorage)
        navigate("/");
      })
      .catch((err) => console.log("err", err));
  };
}

// export const bootstrapNewLogInState = () => async (dispatch) => {
//   const tokenFromStorage = localStorage.getItem("tokenReceived");

//   if (!tokenFromStorage) return;

//   await axios
//     .get(API_URL + "/auth/me", {
//       headers: { Authorization: `Bearer ${tokenFromStorage} ` },
//     })
//     .then((data) => {
//       const userName = data.data.firstname;
//       dispatch(userLoggedIn(userName));
//     })
//     .catch((err) => console.log("err", err));
// };
