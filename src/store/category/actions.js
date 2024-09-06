import axios from "axios";
import { startLoading, categoryFetched } from "./slice";

const API_URL = `http://localhost:8000`;

export const fetchCategory = async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${API_URL}/categories`);
    const categories = response.data;
    dispatch(categoryFetched(categories));
  } catch (e) {
    console.log(e.message);
  }
};

// export const fetchMyCategory = () => async (dispatch) => {
//   const tokenFromStorage = localStorage.getItem("tokenReceived");
//   axios
//     .get(API_URL + "/reviews/me", {
//       headers: { Authorization: `Bearer ${tokenFromStorage} ` },
//     })
//     .then((data) => {
//       dispatch(startLoading());
//       dispatch(reviewsFetched(data.data));
//     })
//     .catch((err) => console.log("err", err));
// };

// export const modifyReview = (reviewId, stars, content) => {
//   return async function thunk() {
//     const tokenFromStorage = localStorage.getItem("tokenReceived");

//     try {
//       const response = await axios.post(
//         API_URL + `/review/update:${reviewId}`,
//         {
//           content: content,
//           stars: stars,
//         },
//         {
//           headers: { Authorization: `Bearer ${tokenFromStorage} ` },
//         }
//       );
//       return response.data; // Assuming you want to use the response data
//     } catch (err) {
//       console.log("User Login Error", err);
//     }
//   };
// };

// export const writeReview = (prodId, author, stars, content) => {
//   return async function thunk() {
//     const tokenFromStorage = localStorage.getItem("tokenReceived");

//     try {
//       const response = await axios.post(
//         API_URL + `/review/${prodId}`,
//         {
//           author: author,
//           content: content,
//           stars: stars,
//         },
//         {
//           headers: { Authorization: `Bearer ${tokenFromStorage} ` },
//         }
//       );
//       console.log(response.data);
//       return response.data;
//     } catch (err) {
//       console.log("User Login Error", err);
//     }
//   };
// };

// export const deleteReview = (id) => {
//   return async function thunk() {
//     const tokenFromStorage = localStorage.getItem("tokenReceived");
//     axios
//       .delete(API_URL + `/review/${id}`, {
//         headers: { Authorization: `Bearer ${tokenFromStorage} ` },
//       })
//       .catch((err) => console.log("error sending delete request", err));
//   };
// };
