import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { Payment, Lock } from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAYMENT_SUCCESS } from "../../../States/Payment/ActionType";
import { getOrderById } from "../../../States/Orders/Action";
import { cartApi } from "../../../configuration/ApiConfig";
import { getCart, removeCartItem } from "../../../States/Cart/Action";

const PaymentPage = () => {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
  });
  const [orderAmount, setOrderAmount] = useState();
  const { order } = useSelector((state) => state);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  let paymentId = null;
  const createPaymentBackend = async () => {
    const { data } = await axios.get(
      `http://localhost:5454/payment/${order.order.id}`
    );
    console.log("RESPONSE", data);
    setOrderAmount(data?.payment_amount);
    paymentId = data?.payment_id;
  };
  useEffect(() => {
    createPaymentBackend();
    console.log("order.order=", order);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };
  const handelPayment = async () => {
    const { data } = await axios.post(
      `http://localhost:5454/payment/success?payment_id=${paymentId}&order_id=${order.order.id}`
    );
    if (data.status) {
      dispatch({ type: PAYMENT_SUCCESS });
      cart.cartItems.map((item) => {
        dispatch(removeCartItem({ id: item.id }));
      });
      dispatch(getCart());
    }
    navigate(`/account/order/${order.order.id}`);
  };
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
      <Card
        className="w-full mx-auto rounded-lg bg-white shadow-lg text-gray-700"
        style={{ maxWidth: "600px" }}
      >
        <CardContent>
          <div className="w-full pb-5 pt-20">
            <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <Payment className="text-xl" />
            </div>
          </div>
          <div className="mb-10">
            <Typography variant="subtitle1" className="text-center">
              Order Amount: &#8377;{orderAmount}{" "}
            </Typography>
          </div>
          <div className="mb-3">
            <Typography
              variant="subtitle1"
              className="font-bold text-sm mb-2 ml-1"
            >
              Name on card
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="John Smith"
              name="name"
              value={cardDetails.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <Typography
              variant="subtitle1"
              className="font-bold text-sm mb-2 ml-1"
            >
              Card number
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="0000 0000 0000 0000"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 -mx-2 flex items-end">
            <div className="px-2 w-1/2">
              <Typography
                variant="subtitle1"
                className="font-bold text-sm mb-2 ml-1"
              >
                Expiration date
              </Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                name="expirationMonth"
                value={cardDetails.expirationMonth}
                onChange={handleInputChange}
              >
                <option value="">Month</option>
                {/* Add month options */}
              </TextField>
            </div>
            <div className="px-2 w-1/2">
              <Typography
                variant="subtitle1"
                className="font-bold text-sm mb-2 ml-1"
              >
                Year
              </Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                name="expirationYear"
                value={cardDetails.expirationYear}
                onChange={handleInputChange}
              >
                <option value="">Year</option>
                {/* Add year options */}
              </TextField>
            </div>
          </div>
          <div className="mb-10">
            <Typography
              variant="subtitle1"
              className="font-bold text-sm mb-2 ml-1"
            >
              Security code
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="000"
              name="securityCode"
              value={cardDetails.securityCode}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Button
              onClick={handelPayment}
              variant="contained"
              color="primary"
              className="block w-full mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
              <Lock className="mr-1" />
              PAY NOW
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
