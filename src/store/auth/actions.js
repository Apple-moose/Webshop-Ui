import axios from "axios";
import {
  startLoading,
  stopLoading,
  getToken,
  userLoggedIn,
  getUserId,
  getUserData,
} from "./slice";

// const API_URL = `http://localhost:8000`;
const API_URL = `https://mooses-webshop.onrender.com`;

export function Login(email, password, navigate) {
  return async function thunk(dispatch) {
    try {
      dispatch(startLoading());
      const loginResponse = await axios.post(API_URL + "/auth/login", {
        email: email,
        password: password,
      });
      const token = loginResponse.data.access_token;
      dispatch(getToken(token));

      const userResponse = await axios.get(API_URL + "/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userName = userResponse.data.firstname;
      const userId = userResponse.data.id;
      dispatch(userLoggedIn(userName));
      dispatch(getUserId(userId));
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      dispatch(stopLoading());
    }
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
      dispatch(userLoggedIn(data.data.firstname));
      dispatch(getUserId(data.data.id));
    })
    .catch((err) => console.log("err", err));
};

export const getMyUserData = () => async (dispatch) => {
  const tokenFromStorage = localStorage.getItem("tokenReceived");
  axios
    .get(API_URL + "/auth/me", {
      headers: { Authorization: `Bearer ${tokenFromStorage} ` },
    })
    .then((data) => {
      dispatch(startLoading());
      dispatch(getUserData(data.data));
    })
    .catch((err) => console.log("err", err));
};
