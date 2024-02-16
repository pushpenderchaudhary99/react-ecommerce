import axios from "axios";
import {
  API_BASE_URL_AUTH,
  API_BASE_URL_USERS,
} from "../../configuration/ApiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("jwt");

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSucess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispach) => {
  dispach(registerRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL_AUTH}/auth/signup`,
      userData
    );
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      //alert
      Swal.fire({
        title: "Success!",
        text: "User succesfully registered!",
        icon: "success",
      });
    }
    console.log("user : ", user);
    dispach(registerSucess(user.jwt));
  } catch (error) {
    dispach(registerFailure(error.message));
    Swal.fire({
      title: "Signup Failed",
      text: error.response?.data?.error || error.message,
      icon: "error",
      zIndex: 99999999,
    });
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSucess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispach) => {
  dispach(loginRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL_AUTH}/auth/signin`,
      userData
    );
    const user = response.data;
    if (user.jwt) {
      dispach(loginSucess(user.jwt));
      localStorage.setItem("jwt", user.jwt);
      window.location.href = "/";
    }
  } catch (error) {
    dispach(loginFailure(error.message));
    Swal.fire({
      title: "Login Failed",
      text: error.response.data.error || error.message,
      icon: "error",
      zIndex: 99999999,
    });
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSucess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (token) => {
  return async (dispatch) => {
    console.log("in get user dispatch ");
    dispatch(getUserRequest());
    try {
      const response = await axios.get(
        `${API_BASE_URL_USERS}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = response.data;
      dispatch(getUserSucess(user));
      console.log("req User ", user);
    } catch (error) {
      const errorMessage = error.message;
      dispatch(getUserFailure(errorMessage));
      Swal.fire({
        title: "Failed to load user",
        text: error.response?.data?.error || error.message,
        icon: "error",
        zIndex: 99999999,
      });
    }
  };
};
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
};
