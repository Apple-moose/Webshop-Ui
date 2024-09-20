import axios from "axios";
import { startLoading, productFullFetched } from "./slice";

// const API_URL = `http://localhost:8000`;
const API_URL = `https://webshop-api-sr7l.onrender.com`;


export const fetchFullProduct = (id) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await axios.get(`${API_URL}/products/${id}`);
      const fullProduct = response.data;
    //   console.log(response.data[0]);
      dispatch(productFullFetched(fullProduct));
    } catch (e) {
      console.log(e.message);
    }
  };
