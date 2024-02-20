import axios from "axios";
export const SINGLE_BASE_URL = "https://flycart.up.railway.app/";

export const API_BASE_URL_AUTH = SINGLE_BASE_URL;
export const API_BASE_URL_USERS = SINGLE_BASE_URL;
export const API_BASE_URL_CART = SINGLE_BASE_URL;
export const API_BASE_URL_PRODUCTS = SINGLE_BASE_URL;
export const API_BASE_URL_ORDERS = SINGLE_BASE_URL;
export const API_BASE_URL_REVIEW_AND_RATING = SINGLE_BASE_URL;
export const API_BASE_URL_PAYMENT = SINGLE_BASE_URL;

const getJwtToken = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt;
};

// Diffrent APIs for Microservice Architecture

//
export const authApi = axios.create({
  baseURL: API_BASE_URL_USERS,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
// API FOR USERS
export const userApi = axios.create({
  baseURL: API_BASE_URL_USERS,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// API FOR PRODUCTS
export const productApi = axios.create({
  baseURL: API_BASE_URL_PRODUCTS,
});
export const productApiWithToken = axios.create({
  baseURL: API_BASE_URL_PRODUCTS,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// API FOR CART
export const cartApi = axios.create({
  baseURL: API_BASE_URL_CART,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// API FOR ORDERS
export const ordersApi = axios.create({
  baseURL: API_BASE_URL_ORDERS,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// API FOR REVIEW
export const reviewApi = axios.create({
  baseURL: API_BASE_URL_REVIEW_AND_RATING,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
// API FOR REVIEW Without Token
export const reviewApiWithoutAuth = axios.create({
  baseURL: API_BASE_URL_REVIEW_AND_RATING,
  headers: { withCredentials: true },
});
// API FOR RATINGS
export const ratingsApi = axios.create({
  baseURL: API_BASE_URL_REVIEW_AND_RATING,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
// API FOR RATINGS
export const ratingsApiWithoutAuth = axios.create({
  baseURL: API_BASE_URL_REVIEW_AND_RATING,
  headers: { withCredentials: true },
});
// API FOR Payment
export const paymentsApi = axios.create({
  baseURL: API_BASE_URL_PAYMENT,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
