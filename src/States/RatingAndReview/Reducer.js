import {
  REVIEW_PRODUCT_FAILURE,
  REVIEW_PRODUCT_REQUEST,
  REVIEW_PRODUCT_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  ratingAndReview: null,
  error: null,
};
export const ratingReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case REVIEW_PRODUCT_SUCCESS:
      return { ...state, loading: false, ratingAndReview: action.payload };
    case REVIEW_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
