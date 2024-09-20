import axios from "axios";
import { startLoading, categoryFetched } from "./slice";

// const API_URL = `http://localhost:8000`;
const API_URL = `https://webshop-api-sr7l.onrender.com`;

export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await axios.get(`${API_URL}/categories`);
      const categories = response.data;
      dispatch(categoryFetched(categories));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const modifyCategory = (catId, catName) => {
  return async function () {
    const tokenFromStorage = localStorage.getItem("tokenReceived");

    try {
      const response = await axios.post(
        API_URL + `/categories/${catId}`,
        {
          name: catName,
        },
        {
          headers: { Authorization: `Bearer ${tokenFromStorage} ` },
        }
      );
      return response.data;
    } catch (err) {
      console.log("User Login Error", err);
    }
  };
};

export const createCategory = (catName) => {
  return async function () {
    const tokenFromStorage = localStorage.getItem("tokenReceived");

    try {
      const response = await axios.post(
        API_URL + "/categories",
        {
          name: catName,
        },
        {
          headers: { Authorization: `Bearer ${tokenFromStorage} ` },
        }
      );
      return response.data;
    } catch (err) {
      console.log("User Login Error", err);
    }
  };
};
