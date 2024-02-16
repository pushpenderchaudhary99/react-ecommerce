import { PAYMENT_RESET, PAYMENT_SUCCESS } from "./ActionType";

const initialState = {
  paymentSucess: false,
};
export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_SUCCESS:
      return { ...state, paymentSucess: true };
    case PAYMENT_RESET:
      return { ...state, paymentSucess: false };
    default:
      return state;
  }
};
