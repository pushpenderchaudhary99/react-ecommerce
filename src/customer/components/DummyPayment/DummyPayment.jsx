import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  Skeleton,
  MenuItem,
  Box,
  CircularProgress,
  LinearProgress,
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
    name: "DUMMY CARD CLICK PAY",
    cardNumber: "1111999911119999",
    expirationMonth: "06",
    expirationYear: "2026",
    securityCode: "***",
  });
  const [orderAmount, setOrderAmount] = useState(null);
  const { order } = useSelector((state) => state);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  let paymentId = null;
  const createPaymentBackend = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5454/payment/${order.order.id}`
      );
      console.log("RESPONSE", data);
      setOrderAmount(data?.payment_amount);
      paymentId = data?.payment_id;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
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
    setPaymentLoading(true);
    try {
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
      setPaymentLoading(false);
      navigate(`/account/order/${order.order.id}`);
    } catch (error) {
      console.log(error.message);
      setPaymentLoading(false);
    }
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
            <Typography
              variant="subtitle1"
              className="text-center items-center "
            >
              {loading ? (
                <Skeleton variant="text" width={560} />
              ) : (
                <>
                  Order Amount: &#8377; {orderAmount || "Something Went Wrong"}
                </>
              )}
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
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <MenuItem
                    key={month}
                    value={month < 10 ? `0${month}` : `${month}`}
                    className="border cursor-pointer"
                  >
                    {month < 10 ? `0${month}` : `${month}`}
                  </MenuItem>
                ))}
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
                {[2026, 2027, 2028, 2029, 2030].map((year) => (
                  <MenuItem
                    key={year}
                    value={year}
                    className="border cursor-pointer"
                  >
                    {year}
                  </MenuItem>
                ))}
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
            <Box sx={{ position: "relative" }}>
              <Button
                onClick={handelPayment}
                variant="contained"
                color="primary"
                className="block w-full h-14 mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                disabled={paymentLoading}
              >
                <Lock className="mr-1" />
                PAY NOW
              </Button>
              {paymentLoading && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                  }}
                >
                  <LinearProgress color="primary" />
                </Box>
              )}
            </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
