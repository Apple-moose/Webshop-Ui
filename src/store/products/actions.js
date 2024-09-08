import axios from "axios";
import { startLoading, productsFetched } from "./slice";
import { bootstrapUser } from "../user/slice";
import { bootstrapBank } from "../bank/slice";

const API_URL = `http://localhost:8000`;

export const fetchProducts = async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${API_URL}/products`);
    const products = response.data;
    dispatch(productsFetched(products));
    //localStorage functions___________________________
    dispatch(bootstrapUser());
    dispatch(bootstrapBank());
  } catch (e) {
    console.log(e.message);
  }
};

//

export const createProduct = (
  prodName,
  prodPrice,
  prodDesc,
  prodImgUrl,
  prodCategory
) => {
  return async function thunk() {
    const tokenFromStorage = localStorage.getItem("tokenReceived");

    try {
      const response = await axios.post(
        API_URL + "/product",
        {
          name: prodName,
          price: prodPrice,
          description: prodDesc,
          imageUrl: prodImgUrl,
          categoryId: prodCategory,
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

export const modifyProduct = (
  prodId,
  prodName,
  prodPrice,
  prodDesc,
  prodImgUrl,
  prodCategory
) => {
  return async function thunk() {
    const tokenFromStorage = localStorage.getItem("tokenReceived");

    try {
      const response = await axios.post(
        API_URL + `/product/${prodId}`,
        {
          name: prodName,
          price: prodPrice,
          description: prodDesc,
          imageUrl: prodImgUrl,
          categoryId: prodCategory,
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

export const deleteProduct = (prodId) => {
  return async function thunk() {
    const tokenFromStorage = localStorage.getItem("tokenReceived");
    axios
      .delete(API_URL + `/product/${prodId}`, {
        headers: { Authorization: `Bearer ${tokenFromStorage} ` },
      })
      .catch((err) => console.log("error sending delete request", err));
  };
};
