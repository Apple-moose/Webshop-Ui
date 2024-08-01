import axios from "axios";
import { startLoading, getToken, userLoggedIn } from "./slice";

const API_URL = `http://localhost:8000`;

export function Login(email, password, navigate) {
  return async function thunk(dispatch, getState) {
    //best idea woukd be (correct syntax await fault)
    /* <script src="https://gist.github.com/wearethefoos/9623c25126cab91fe51f6bbda874a16a.js"></script> */

    //SEE BELLOW OR PROMISES.JS!!

    dispatch(startLoading());
    await axios
      .post(API_URL + "/auth/login", {
        email: email,
        password: password,
      })
      .then((data) => {
        const token = data.data.access_token;
        dispatch(getToken(token));
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
        const userName = data.data.firstname;
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
      const userName = data.data.firstname;
      dispatch(userLoggedIn(userName));
    })
    .catch((err) => console.log("err", err));
};

// function login() {
//   axios
//     .post(API_URL + "/auth/login", {
//       email: email,
//       password: password,
//     })
//     .then((data) => {
//       const token = data.data.token;
//       console.log("token from login?:", data.data.token);
//       // store the token we just received
//       dispatch(storeToken(token)); // store the token in the store
//       // localStorage.setItem("tokenReceived", token); // this should happen in the slice
//       return token;
//     })
//     .then((token) => {
//       // here, token is what we returned from the previous then block
//       // we can use it here to get the user information
//       return axios.get(API_URL + "/auth/me", {
//         headers: { Authorization: `Bearer ${token} ` },
//       });
//     })
//     .then((data) => {
//       const userName = data.data.firstName;
//       dispatch(userLoggedIn(userName));
//       //???for some reason call useNavigate on the loginPage???
//       navigate("/");
//     })
//     .catch((err) => {
//       console.log("Login Error", err);
//       dispatch(loginError(err)); // tell the store that there was an error
//       // also make sure to remove the token from the store
//     })
//     .finally(() => {
//       // this should always run, regardless of the outcome
//       stopLoading();
//     });
// }
