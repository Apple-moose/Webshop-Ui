import axios from "axios";
import { startLoading, productsFetched } from "./slice";

const API_URL = `http://localhost:4000`;

export const fetchProducts = async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${API_URL}/products`);
    const products = response.data;
    console.log(response.data[0]);
    dispatch(productsFetched(products));
  } catch (e) {
    console.log(e.message);
  }
};
