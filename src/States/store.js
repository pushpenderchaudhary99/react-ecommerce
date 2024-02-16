import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducers } from "./Auth/Reducers";
import { customerProductReducer } from "./Products/Reducers";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Orders/Reducer";
import { paymentReducer } from "./Payment/Reducer";
import adminOrderReducer from "./Admin/Orders/Reducer";
import { ratingReviewReducer } from "./RatingAndReview/Reducer";

const rootReducers = combineReducers({
  auth: authReducers,
  product: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  payment: paymentReducer,
  adminOrder: adminOrderReducer,
  ratingAndReview: ratingReviewReducer,
});
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
