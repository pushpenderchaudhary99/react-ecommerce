import { cartApi } from "../../configuration/ApiConfig";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const getCart = () => async (dispatch) => {
  console.log("getting cart", localStorage.getItem("jwt"));
  // Initiate request
  dispatch({ type: GET_CART_REQUEST });
  // Attempt backend request and update states

  try {
    //fetching cart by passing JWT token in Autherization
    const { data } = await cartApi.get(`/api/cart/`);
    console.log("Cart :", data);
    // Successful API request, update state with received data
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    // Handle API request failure, update error status
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
  }
};

export const addItemToCart = (requestData) => async (dispatch) => {
  // Initiate request
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  // Attempt backend request and update states
  try {
    const { data } = await cartApi.put("/api/cart/add", requestData);
    // Successful API request, update state with received data
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    // Handle API request failure, update error status
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

export const removeCartItem = (requestData) => async (dispatch) => {
  console.log("removing cart item req", requestData);
  // Initiate request
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  // Attempt backend request and update states
  try {
    const { data } = await cartApi.delete(`/api/cart_items/${requestData.id}`);
    // Successful API request, update state with received data
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    // Handle API request failure, update error status
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const updateCartItem = (requestData) => async (dispatch) => {
  // Initiate request
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  // Attempt backend request and update states
  console.log("in cart item update Dispatch:");
  try {
    const { data } = await cartApi.put(
      `/api/cart_items/${requestData.cartItemId}`,
      requestData.data
    );
    // Successful API request, update state with received data
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    // Handle API request failure, update error status
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};
