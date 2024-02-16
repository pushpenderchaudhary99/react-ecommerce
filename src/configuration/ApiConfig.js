import axios from "axios";
export const API_BASE_URL_AUTH = "http://localhost:5454";
export const API_BASE_URL_USERS = "http://localhost:5454";
export const API_BASE_URL_CART = "http://localhost:5454";
export const API_BASE_URL_PRODUCTS = "http://localhost:5454";
export const API_BASE_URL_ORDERS = "http://localhost:5454";
export const API_BASE_URL_REVIEW_AND_RATING = "http://localhost:5454";
export const API_BASE_URL_PAYMENT = "http://localhost:5454";

const getJwtToken = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt;
};

// Diffrent APIs for Microservice Architecture

// API FOR USERS
export const userApi = axios.create({
  baseURL: API_BASE_URL_USERS,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
  },
});

// API FOR PRODUCTS
export const productApi = axios.create({
  baseURL: API_BASE_URL_PRODUCTS,
});

// API FOR CART
export const cartApi = axios.create({
  baseURL: API_BASE_URL_CART,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
  },
});

// API FOR ORDERS
export const ordersApi = axios.create({
  baseURL: API_BASE_URL_ORDERS,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
  },
});

// API FOR REVIEW
export const reviewApi = axios.create({
  baseURL: API_BASE_URL_REVIEW_AND_RATING,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
  },
});
// API FOR REVIEW Without Token
export const reviewApiWithoutAuth = axios.create({
  baseURL: API_BASE_URL_REVIEW_AND_RATING,
});
// API FOR RATINGS
export const ratingsApi = axios.create({
  baseURL: API_BASE_URL_REVIEW_AND_RATING,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
  },
});
// API FOR RATINGS
export const ratingsApiWithoutAuth = axios.create({
  baseURL: API_BASE_URL_REVIEW_AND_RATING,
});
// API FOR Payment
export const paymentsApi = axios.create({
  baseURL: API_BASE_URL_PAYMENT,
  headers: {
    Authorization: `Bearer ${getJwtToken()}`,
    "Content-Type": "application/json",
  },
});
