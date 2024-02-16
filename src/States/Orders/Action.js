import { ordersApi } from "../../configuration/ApiConfig";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  console.log("reqData in create order :", reqData);
  //Initializing Request
  dispatch({ type: CREATE_ORDER_REQUEST });
  // Attempt backend request and update states
  try {
    const { data } = await ordersApi.post(`/api/orders/`, reqData.address);
    // Successful API request, navigate to order details
    if (data.id) {
      reqData.navigate({ search: `step=3&order_id=${data.id}` });
    }
    //Update state with received data
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    // Handle API request failure, update error status
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};

export const getOrderById = (reqData) => async (dispatch) => {
  //Initializing Request
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  // Attempt backend request and update states
  try {
    const { data } = await ordersApi.get(`/api/orders/${reqData.orderId}`);
    //Successful API request, update state with received data
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    // Handle API request failure, update error status
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};

export const getOrderHistory = () => async (dispatch) => {
  console.log("user order history  ACTIONNNN");
  //Initializing Request
  dispatch({ type: GET_ORDER_HISTORY_REQUEST });
  // Attempt backend request and update states
  try {
    const { data } = await ordersApi.get(`/api/orders/user`);
    console.log("user order history ", data);
    //Successful API request, update state with received data
    dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    // Handle API request failure, update error status
    dispatch({ type: GET_ORDER_HISTORY_FAILURE, payload: error.message });
  }
};
