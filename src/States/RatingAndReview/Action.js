import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ratingsApi, reviewApi } from "../../configuration/ApiConfig";
import {
  REVIEW_PRODUCT_FAILURE,
  REVIEW_PRODUCT_REQUEST,
  REVIEW_PRODUCT_SUCCESS,
} from "./ActionType";

export const rateAndReviewProduct = (reviewRequest) => async (dispatch) => {
  dispatch({ type: REVIEW_PRODUCT_REQUEST });
  try {
    const ratingRes = await ratingsApi.post(
      "/api/ratings/create",
      reviewRequest.rating
    );
    const reviewRes = await reviewApi.post(
      "/api/reviews/create",
      reviewRequest.review
    );
    if (ratingRes.data && reviewRes.data) {
      const ratingAndReview = [];
      ratingAndReview.push(ratingRes.data);
      ratingAndReview.push(reviewRes.data);
      Swal.fire(
        "Product Review Succesful",
        "Review and Ratings added to product",
        "success"
      );
    }

    dispatch({ type: REVIEW_PRODUCT_SUCCESS, payload: ratingAndReview });
  } catch (error) {
    Swal.fire(
      "Product Review Failed",
      error.response.data || error.message,
      "error"
    );
    dispatch({
      type: REVIEW_PRODUCT_FAILURE,
      payload: error.response.data || error.message,
    });
  }
};
