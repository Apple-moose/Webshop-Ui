import axios from "axios";
import { startLoading, reviewsFetched } from "./slice";

const API_URL = `http://localhost:8000`;

export const fetchReviewsByProdId = (prodId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(`${API_URL}/reviews/productId:${prodId}`);
    const reviews = response.data;
    dispatch(reviewsFetched(reviews));
  } catch (e) {
    console.log(e.message);
  }
};
