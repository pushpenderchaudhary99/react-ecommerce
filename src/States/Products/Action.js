import Swal from "sweetalert2";
import { productApi, productApiWithToken } from "../../configuration/ApiConfig";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  try {
    const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;
    console.log("REQUEST DATA : ", reqData);
    const { data } =
      await productApi.get(`/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}
    &category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    console.log("Product DATA : ", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};
export const searchProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  try {
    const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      query,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;
    console.log("Search REQUEST DATA : ", reqData);
    const { data } =
      await productApi.get(`/api/products/search?query=${query}&color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}
    &stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    console.log("Product Search DATA : ", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  try {
    const { productId } = reqData;
    const { data } = await productApi.get(`/api/products/id/${productId}`);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    console.log("product feched from backend : ", data);
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};
export const createProduct = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const { data } = await productApiWithToken.post(
      `/api/admin/products/`,
      reqData.data
    );
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    Swal.fire({
      title: "Success!",
      text: "Your product has been added.",
      icon: "success",
    });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProductById = async (reqData) => {
  try {
    const { productId } = reqData;
    console.log("ACTION DELETE ID:", productId);
    const { data } = await productApi.delete(
      `/api/admin/products/${productId}/delete`
    );
    if (data?.status) {
      Swal.fire({
        title: "Deleted!",
        text: "Your product has been removed.",
        icon: "success",
      });
      return true;
    }
  } catch (error) {
    console.log(
      "ERROR-Failed to remove product- deleteProductById(id) -Product-Action :",
      error.msg
    );
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Item might be associated with any order!",
    });
    return false;
  }
};
