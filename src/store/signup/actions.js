import axios from "axios";
import {
  startLoading,
  stopLoading,
  getToken,
  getUserId,
  userLoggedIn,
} from "./slice";

// const API_URL = `http://localhost:8000`;
const API_URL = `https://mooses-webshop.onrender.com`;

export function Signup(
  signFirstName,
  signLastName,
  signEmail,
  signPassword,
  imageUrl,
  navigate
) {
  return async function thunk(dispatch) {
    try {
      dispatch(startLoading());
      await axios.post(API_URL + "/auth/signup", {
        firstname: signFirstName,
        lastname: signLastName,
        email: signEmail,
        password: signPassword,
        imageUrl: imageUrl,
      });

      const signupResponse = await axios.post(API_URL + "/auth/login", {
        email: signEmail,
        password: signPassword,
      });
      const token = signupResponse.data.access_token;
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
